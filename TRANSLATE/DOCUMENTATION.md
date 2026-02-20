# Iikrhian Translation & Localization Documentation 🈯

This document describes the structured localization system used for Iikrhian language pages.

## Core System - `skakefani` 🗄️

The localization system relies on a JavaScript object named `skakefani` embedded in each HTML file. This object contains language keys (`aih` for Iikrhian, `en` for English) mapping specific text keys to their localized values.

### Localization Attribute - `data-oskakefani` 🏷️

HTML elements should use the `data-oskakefani` attribute to reference keys in the `skakefani` object.
```html
<p data-oskakefani="ſɭc̗ᴜ ʃɔ"></p>
```
The script `ſɭɔ j͑ʃ'ɔ }ʃꞇ.js` automatically populates the text content of these elements based on the `lang` query parameter in the URL.

## Key Naming Conventions 🪪

To maintain consistency, translation keys follow a specific pattern.

### 1. Section Headers 📌

Header keys should be the name of the section in Iikrhian.
- Example - `}ʃᴜ }ʃꞇ` ( Pronouns )

### 2. Line Items ( Header + Number ) 🔢

For content lines within a section, keys follow the `Header + Number` format.
- Numbers use the sequence - `ɔ ı ɿ ц э ꞟ ɩ ƨ` ( Octal 0-7 ).
- Example - `}ʃᴜ }ʃꞇ ı`, `}ʃᴜ }ʃꞇ ɿ`

## Content Formatting 📝

### 1. Tripartite Examples 🔤

Sentence examples in the English ( `en` ) localization must follow the tripartite format separated by pipes. This is only for the text examples in Iikrhian language.
`Iikrhian Text | Literal Translation | English Meaning`
- Example - `ſɭɹ j͑ʃᴜ ŋᷠꞇ ⺓ ɭʃп́ᴜ | love SUBCL 1s.twa | I love`

### 2. Translatable Charts & Pronouns 🔤

- **Phonology** - English translations should include IPA values after a pipe.
  - `en`: `ᶅſ п́ ｡ ſן ɘ | /ⱱ̥/ ｡ /p/`
- **Pronouns** - Individual pronoun entries should include the script and the description.
  - `en`: `ɭʃп́ᴜ | 1st ( Alone )`

### 3. No Translation 🚫

If a section or line item does not have a translation, it should use `( ſɭɜc̗ ꞁȷ̀ɔⅎ j͐ʃэ j͑ʃƽᴜƽ ꞁȷ̀ᴜꞇ )` as a placeholder.
- Example - `en`: `( ſɭɜc̗ ꞁȷ̀ɔⅎ j͐ʃэ j͑ʃƽᴜƽ ꞁȷ̀ᴜꞇ )`

## Usage 🌐

Add `?lang=en` or `?lang=aih` to the URL to switch the display language.
- Defaults to `aih` if no parameter is provided.

## Examples 🈴

- [ꞁȷ̀ꞇ j͑ʃᴜ ᶅſᴜƽ](<../ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ֭ſɭᴜ ı],ɹ/ı],ɹ ŋᷠɔ ſɭᴜꞇ }ʃɔ/ꞁȷ̀ꞇ j͑ʃᴜ ᶅſᴜƽ.html>)
- [ꞁȷ̀ɜ ı\],ɹ ſןɔ ᶅſᴜ](<../ſ͔ɭᴜ ᶅſɔ/ſɭc̗ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ.html>)