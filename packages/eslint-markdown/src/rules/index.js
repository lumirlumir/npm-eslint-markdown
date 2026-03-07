/* eslint sort-imports: 'error', sort-keys: 'error' */

// TODO: Re-enable the commented-out rules once they stabilize.

// import allowHeading from './allow-heading.js';
import allowImageUrl from './allow-image-url.js';
import allowLinkUrl from './allow-link-url.js';
import codeLangShorthand from './code-lang-shorthand.js';
import consistentCodeStyle from './consistent-code-style.js';
import consistentDeleteStyle from './consistent-delete-style.js';
import consistentEmphasisStyle from './consistent-emphasis-style.js';
import consistentStrongStyle from './consistent-strong-style.js';
import consistentThematicBreakStyle from './consistent-thematic-break-style.js';
import consistentUnorderedListStyle from './consistent-unordered-list-style.js';
// import enCapitalization from './en-capitalization.js';
// import noBoldParagraph from './no-bold-paragraph.js';
import noControlCharacter from './no-control-character.js';
import noCurlyQuote from './no-curly-quote.js';
import noDoubleSpace from './no-double-space.js';
import noEmoji from './no-emoji.js';
import noGitConflictMarker from './no-git-conflict-marker.js';
import noIrregularDash from './no-irregular-dash.js';
import noIrregularWhitespace from './no-irregular-whitespace.js';
import noTab from './no-tab.js';
import noUrlTrailingSlash from './no-url-trailing-slash.js';
import requireHeadingId from './require-heading-id.js';
import requireImageTitle from './require-image-title.js';
import requireLinkTitle from './require-link-title.js';

export default {
  // 'allow-heading': allowHeading,
  'allow-image-url': allowImageUrl,
  'allow-link-url': allowLinkUrl,
  'code-lang-shorthand': codeLangShorthand,
  'consistent-code-style': consistentCodeStyle,
  'consistent-delete-style': consistentDeleteStyle,
  'consistent-emphasis-style': consistentEmphasisStyle,
  'consistent-strong-style': consistentStrongStyle,
  'consistent-thematic-break-style': consistentThematicBreakStyle,
  'consistent-unordered-list-style': consistentUnorderedListStyle,
  // 'en-capitalization': enCapitalization,
  // 'no-bold-paragraph': noBoldParagraph,
  'no-control-character': noControlCharacter,
  'no-curly-quote': noCurlyQuote,
  'no-double-space': noDoubleSpace,
  'no-emoji': noEmoji,
  'no-git-conflict-marker': noGitConflictMarker,
  'no-irregular-dash': noIrregularDash,
  'no-irregular-whitespace': noIrregularWhitespace,
  'no-tab': noTab,
  'no-url-trailing-slash': noUrlTrailingSlash,
  'require-heading-id': requireHeadingId,
  'require-image-title': requireImageTitle,
  'require-link-title': requireLinkTitle,
};
