/**
 * @fileoverview `@codecov/vite-plugin`
 * @see https://npmx.dev/package-code/@codecov/vite-plugin/v/2.0.1/dist%2Findex.mjs
 * `@codecov/vite-plugin@2.0.1` does not support Vite 7 and 8, so we copied and adapted the code to add support for them.
 */

/*
 * MIT License
 *
 * Copyright (c) 2023-2024 Codecov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import path from 'node:path';
import {
  red,
  createRollupAsset,
  checkNodeVersion,
  normalizeOptions,
  handleErrors,
  createSentryInstance,
  Output,
  telemetryPlugin,
} from '@codecov/bundler-plugin-core';
import { createVitePlugin } from 'unplugin';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const PLUGIN_NAME = '@codecov/vite-plugin';
const PLUGIN_VERSION = '2.0.1';

const viteBundleAnalysisPlugin = ({ output, pluginName, pluginVersion }) => ({
  version: output.version,
  name: pluginName,
  pluginVersion,
  buildStart: () => {
    output.start();
    output.setPlugin(pluginName, pluginVersion);
  },
  buildEnd: () => {
    output.end();
  },
  writeBundle: async () => {
    await output.write();
  },
  vite: {
    async generateBundle(options, bundle) {
      if (!output.bundleName || output.bundleName === '') {
        red('Bundle name is not present or empty. Skipping upload.');
        return;
      }
      output.setBundleName(output.originalBundleName);
      if (options.name && options.name !== '') {
        output.setBundleName(`${output.bundleName}-${options.name}`);
      }
      const format = options.format === 'es' ? 'esm' : options.format;
      output.setBundleName(`${output.bundleName}-${format}`);
      const cwd = process.cwd();
      const assets = [];
      const chunks = [];
      const moduleByFileName = /* @__PURE__ */ new Map();
      const items = Object.values(bundle);
      const customOptions = {
        moduleOriginalSize: false,
        ...options,
      };
      let assetFormatString = '';
      if (typeof customOptions.assetFileNames === 'string') {
        assetFormatString = customOptions.assetFileNames;
      }
      let chunkFormatString = '';
      if (typeof customOptions.chunkFileNames === 'string') {
        chunkFormatString = customOptions.chunkFileNames;
      }
      let counter = 0;
      await Promise.all(
        items.map(async item => {
          if (item?.type === 'asset') {
            const fileName = item?.fileName ?? '';
            if (path.extname(fileName) === '.map') {
              return;
            }
            const asset = await createRollupAsset({
              fileName,
              source: item.source,
              formatString: assetFormatString,
              metaFramework: output.metaFramework,
            });
            assets.push(asset);
          } else if (item?.type === 'chunk') {
            const fileName = item?.fileName ?? '';
            if (path.extname(fileName) === '.map') {
              return;
            }
            const asset = await createRollupAsset({
              fileName,
              source: item.code,
              formatString: chunkFormatString,
              metaFramework: output.metaFramework,
            });
            assets.push(asset);
            const chunkId = item?.name ?? '';
            const uniqueId = `${counter}-${chunkId}`;
            chunks.push({
              id: chunkId,
              uniqueId,
              entry: item?.isEntry,
              initial: item?.isDynamicEntry,
              files: [fileName],
              names: [item?.name],
              dynamicImports: item?.dynamicImports ?? [],
            });
            const moduleEntries = Object.entries(item?.modules ?? {});
            for (const [modulePath, moduleInfo] of moduleEntries) {
              const normalizedModulePath = modulePath.replace('\0', '');
              const relativeModulePath = path.relative(cwd, normalizedModulePath);
              const relativeModulePathWithPrefix = relativeModulePath.match(/^\.\./)
                ? relativeModulePath
                : `.${path.sep}${relativeModulePath}`;
              const moduleEntry = moduleByFileName.get(relativeModulePathWithPrefix);
              if (moduleEntry) {
                moduleEntry.chunkUniqueIds.push(uniqueId);
              } else {
                const size = customOptions.moduleOriginalSize
                  ? moduleInfo.originalLength
                  : moduleInfo.renderedLength;
                const module = {
                  name: relativeModulePathWithPrefix,
                  size,
                  chunkUniqueIds: [uniqueId],
                };
                moduleByFileName.set(relativeModulePathWithPrefix, module);
              }
            }
            counter += 1;
          }
        }),
      );
      const modules = Array.from(moduleByFileName.values());
      output.bundler = {
        name: 'rollup',
        version: this.meta.rollupVersion,
      };
      output.assets = assets;
      output.chunks = chunks;
      output.modules = modules;
      output.outputPath = options.dir ?? '';
      if (output.dryRun) {
        this.emitFile({
          type: 'asset',
          fileName: `${output.bundleName}-stats.json`,
          source: output.bundleStatsToJson(),
        });
      }
    },
  },
});

const codecovVitePlugin = createVitePlugin((userOptions, unpluginMetaContext) => {
  if (checkNodeVersion(unpluginMetaContext)) {
    return [];
  }
  const normalizedOptions = normalizeOptions(userOptions);
  if (!normalizedOptions.success) {
    const { shouldExit } = handleErrors(normalizedOptions);
    if (shouldExit) {
      process.exit(1);
    }
    return [];
  }
  const plugins = [];
  const { options } = normalizedOptions;
  const sentryConfig = createSentryInstance({
    telemetry: options.telemetry,
    isDryRun: options.dryRun,
    pluginName: PLUGIN_NAME,
    pluginVersion: PLUGIN_VERSION,
    options,
    bundler: unpluginMetaContext.framework,
  });
  const output = new Output(
    options,
    { metaFramework: unpluginMetaContext.framework },
    sentryConfig,
  );
  if (options.enableBundleAnalysis) {
    plugins.push(
      telemetryPlugin({
        sentryClient: sentryConfig.sentryClient,
        sentryScope: sentryConfig.sentryScope,
        telemetry: options.telemetry,
      }),
      viteBundleAnalysisPlugin({
        output,
        pluginName: PLUGIN_NAME,
        pluginVersion: PLUGIN_VERSION,
      }),
    );
  }
  return plugins;
});

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default codecovVitePlugin;
