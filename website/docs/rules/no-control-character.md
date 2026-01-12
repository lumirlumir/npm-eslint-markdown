<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

::: info

Carriage return(`\r`), line feed(`\n`) and tab(`\t`) are not reported by this rule.

:::

This rule is aimed at identifying and preventing the use of control characters in Markdown documents. Control characters are non-printing characters primarily used to control the interpretation or display of text, and they can cause issues with Markdown parsers, create inconsistencies in document formatting, and lead to potential rendering problems across different platforms.

The rule helps ensure that no unexpected control characters are present in your Markdown documents, which improves document consistency and prevents potential parsing problems. Control characters can be accidentally introduced when copying content from different sources or through certain keyboard shortcuts and can be difficult to detect visually.

This rule disallows the following control characters except where the options allow:

```txt
\u0000 - Null - <NUL>
\u0001 - Start of Heading - <SOH>
\u0002 - Start of Text - <STX>
\u0003 - End of Text - <ETX>
\u0004 - End of Transmission - <EOT>
\u0005 - Enquiry - <ENQ>
\u0006 - Acknowledge - <ACK>
\u0007 - Bell - <BEL>
\u0008 - Backspace - <BS>
\u000B - Line Tabulation (\v) - <VT>
\u000C - Form Feed (\f) - <FF>
\u000E - Shift Out - <SO>
\u000F - Shift In - <SI>
\u0010 - Data Link Escape - <DLE>
\u0011 - Device Control One - <DC1>
\u0012 - Device Control Two - <DC2>
\u0013 - Device Control Three - <DC3>
\u0014 - Device Control Four - <DC4>
\u0015 - Negative Acknowledge - <NAK>
\u0016 - Synchronous Idle - <SYN>
\u0017 - End of Transmission Block - <ETB>
\u0018 - Cancel - <CAN>
\u0019 - End of Medium - <EM>
\u001A - Substitute - <SUB>
\u001B - Escape - <ESC>
\u001C - Information Separator Four - <FS>
\u001D - Information Separator Three - <GS>
\u001E - Information Separator Two - <RS>
\u001F - Information Separator One - <US>
\u007F - Delete - <DEL>
\u0080 - Padding Character - <PAD>
\u0081 - High Octet Preset - <HOP>
\u0082 - Break Permitted Here - <BPH>
\u0083 - No Break Here - <NBH>
\u0084 - Index - <IND>
\u0085 - Next Line - <NEL>
\u0086 - Start of Selected Area - <SSA>
\u0087 - End of Selected Area - <ESA>
\u0088 - Character Tabulation Set - <HTS>
\u0089 - Character Tabulation with Justification - <HTJ>
\u008A - Line Tabulation Set - <VTS>
\u008B - Partial Line Forward - <PLD>
\u008C - Partial Line Backward - <PLU>
\u008D - Reverse Line Feed - <RI>
\u008E - Single Shift Two - <SS2>
\u008F - Single Shift Three - <SS3>
\u0090 - Device Control String - <DCS>
\u0091 - Private Use One - <PU1>
\u0092 - Private Use Two - <PU2>
\u0093 - Set Transmit State - <STS>
\u0094 - Cancel Character - <CCH>
\u0095 - Message Waiting - <MW>
\u0096 - Start of Guarded Area - <SPA>
\u0097 - End of Guarded Area - <EPA>
\u0098 - Start of String - <SOS>
\u0099 - Single Graphic Character Introducer - <SGCI>
\u009A - Single Character Introducer - <SCI>
\u009B - Control Sequence Introducer - <CSI>
\u009C - String Terminator - <ST>
\u009D - Operating System Command - <OSC>
\u009E - Privacy Message - <PM>
\u009F - Application Program Command - <APC>
\u202C - Pop Directional Formatting - <POPDF>
\u202D - Left-to-Right Override - <LRO>
\u202E - Right-to-Left Override - <RLO>
```

## Examples

### :x: Incorrect

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-control-character: 'error' -->

\u0002 - Start of Text - <STX>  <= Here
\u0003 - End of Text - <ETX>  <= Here
\u0004 - End of Transmission - <EOT>  <= Here
\u0005 - Enquiry - <ENQ>  <= Here
\u0006 - Acknowledge - <ACK>  <= Here
\u0007 - Bell - <BEL>  <= Here
\u0008 - Backspace - <BS>  <= Here
\u000B - Line Tabulation (\v) - <VT>  <= Here
\u000E - Shift Out - <SO>  <= Here
\u000F - Shift In - <SI>  <= Here
\u0010 - Data Link Escape - <DLE>  <= Here
\u0011 - Device Control One - <DC1>  <= Here
\u0012 - Device Control Two - <DC2>  <= Here
\u0013 - Device Control Three - <DC3>  <= Here
\u0014 - Device Control Four - <DC4>  <= Here
\u0015 - Negative Acknowledge - <NAK>  <= Here
\u0016 - Synchronous Idle - <SYN>  <= Here
\u0017 - End of Transmission Block - <ETB>  <= Here
\u0018 - Cancel - <CAN>  <= Here
\u0019 - End of Medium - <EM>  <= Here
\u001A - Substitute - <SUB>  <= Here
\u001B - Escape - <ESC>  <= Here
\u001C - Information Separator Four - <FS>  <= Here
\u001D - Information Separator Three - <GS>  <= Here
\u001E - Information Separator Two - <RS>  <= Here
\u001F - Information Separator One - <US>  <= Here
\u007F - Delete - <DEL>  <= Here
\u0080 - Padding Character - <PAD>  <= Here
\u0081 - High Octet Preset - <HOP>  <= Here
\u0082 - Break Permitted Here - <BPH>  <= Here
\u0083 - No Break Here - <NBH>  <= Here
\u0084 - Index - <IND>  <= Here
\u0085 - Next Line - <NEL>  <= Here
```

#### With `{ skipCode: false }` Option

`````md eslint-check
<!-- eslint md/no-control-character: ['error', { skipCode: false }] -->

```md
\u0002 - Start of Text - <STX>  <= Here
\u0003 - End of Text - <ETX>  <= Here
```

````md
\u0004 - End of Transmission - <EOT>  <= Here
\u0005 - Enquiry - <ENQ>  <= Here
````

~~~txt
\u0006 - Acknowledge - <ACK>  <= Here
\u0007 - Bell - <BEL>  <= Here
~~~

    \u0008 - Backspace - <BS>  <= Here
    \u000B - Line Tabulation (\v) - <VT>  <= Here
`````

#### With `{ skipInlineCode: false }` Option

```md eslint-check
<!-- eslint md/no-control-character: ['error', { skipInlineCode: false }] -->

\u0002 - Start of Text - <STX> `` <= Here
\u0003 - End of Text - <ETX> `` <= Here
```

### :white_check_mark: Correct

Examples of **correct** code for this rule:

#### Default

<!-- markdownlint-disable no-hard-tabs -->

```md eslint-check
<!-- eslint md/no-control-character: 'error' -->

\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
\u0020 - Space - <SP>   <= Here
```

<!-- markdownlint-enable no-hard-tabs -->

#### With `{ allow: ['\u0002', '\u0003'] }` Option

```md eslint-check
<!-- eslint md/no-control-character: ['error', { allow: ['\u0002', '\u0003'] }] -->

\u0002 - Start of Text - <STX>  <= Here
\u0003 - End of Text - <ETX>  <= Here
```

#### With `{ skipCode: true }` Option

`````md eslint-check
<!-- eslint md/no-control-character: ['error', { skipCode: true }] -->

```md
\u0002 - Start of Text - <STX>  <= Here
\u0003 - End of Text - <ETX>  <= Here
```

````md
\u0004 - End of Transmission - <EOT>  <= Here
\u0005 - Enquiry - <ENQ>  <= Here
````

~~~txt
\u0006 - Acknowledge - <ACK>  <= Here
\u0007 - Bell - <BEL>  <= Here
~~~

    \u0008 - Backspace - <BS>  <= Here
    \u000B - Line Tabulation (\v) - <VT>  <= Here
`````

#### With `{ skipInlineCode: true }` Option

```md eslint-check
<!-- eslint md/no-control-character: ['error', { skipInlineCode: true }] -->

\u0002 - Start of Text - <STX> `` <= Here
\u0003 - End of Text - <ETX> `` <= Here
```

## Options

```js
'md/no-control-character': ['error', {
  allow: [],
  skipCode: true,
  skipInlineCode: true,
}]
```

### `allow`

> Type: `string[]` / Default: `[]`

When specified, specific control characters are allowed if they match one of the characters in this array. This is useful for ignoring certain control characters that are intentionally used in the document.

### `skipCode`

> Type: `boolean` / Default: `true`

`true` allows control characters in all code blocks.

### `skipInlineCode`

> Type: `boolean` / Default: `true`

`true` allows control characters in all inline code.

## When Not To Use It

You might want to disable this rule if you're working with documents that intentionally contain control characters for specific purposes, such as demonstrating control character behavior or working with specialized text formats.

## Prior Art

- [`textlint-rule-no-invalid-control-character`](https://github.com/textlint-rule/textlint-rule-no-invalid-control-character)
- [`no-control-regex`](https://eslint.org/docs/latest/rules/no-control-regex)
