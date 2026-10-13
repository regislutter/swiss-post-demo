# post-banner



<!-- Auto Generated Below -->


## Overview

Persistent contextual message (info, warning, success, error) with an optional call to action
and an optional close button.

## Properties

| Property       | Attribute       | Description                                                                                                                                                                                                                                                                                                           | Type                                          | Default     |
| -------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------- |
| `announce`     | `announce`      | How assistive technology announces the banner. `status` is polite; `alert` interrupts and is reserved for urgent, unexpected changes. It is NOT derived from `variant`: a persistent validation error is usually a `status`. Live regions announce changes, so a banner already on the page at load is not announced. | `"alert" \| "status"`                         | `'status'`  |
| `closeLabel`   | `close-label`   | Accessible name of the close button. Provide the translation for the page language.                                                                                                                                                                                                                                   | `string`                                      | `'Close'`   |
| `ctaHref`      | `cta-href`      | URL of the built-in call to action. When absent the call to action is a `<button>`, otherwise an `<a>`.                                                                                                                                                                                                               | `string \| undefined`                         | `undefined` |
| `ctaLabel`     | `cta-label`     | Label of the built-in call to action. Not rendered when empty. Make it explicit ("Review your invoice", not "Click here").                                                                                                                                                                                            | `string \| undefined`                         | `undefined` |
| `ctaTarget`    | `cta-target`    | Link target of the call to action. `_blank` adds `rel="noopener noreferrer"`; say so in `ctaLabel`.                                                                                                                                                                                                                   | `"_blank" \| "_self"`                         | `'_self'`   |
| `dismissible`  | `dismissible`   | Shows a close button. Off by default so an important message cannot vanish silently.                                                                                                                                                                                                                                  | `boolean`                                     | `false`     |
| `headingLevel` | `heading-level` | Heading level rendered for the title, to fit the page outline.                                                                                                                                                                                                                                                        | `"2" \| "3" \| "4" \| "5" \| "6"`             | `'2'`       |
| `label`        | `label`         | Accessible name. Takes priority over the title; use it when the visible title alone is not enough.                                                                                                                                                                                                                    | `string \| undefined`                         | `undefined` |
| `open`         | `open`          | Whether the banner is shown. Dismissing sets it to `false`; a parent can reopen by setting it back to `true`. In markup, close with `open="false"` (a boolean attribute that defaults to `true` cannot be removed to close it).                                                                                       | `boolean`                                     | `true`      |
| `variant`      | `variant`       | Tone and semantics of the message. Unknown values fall back to `info`.                                                                                                                                                                                                                                                | `"error" \| "info" \| "success" \| "warning"` | `'info'`    |


## Events

| Event               | Description                                                                                             | Type                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `postBannerCta`     | Emitted when the built-in call to action is activated, before any navigation.                           | `CustomEvent<PostBannerCtaDetail>`     |
| `postBannerDismiss` | Emitted after the user closes the banner. Move focus here if your layout needs it: the banner does not. | `CustomEvent<PostBannerDismissDetail>` |


## Slots

| Slot        | Description                                                                          |
| ----------- | ------------------------------------------------------------------------------------ |
|             | Description or context. Accepts text and inline markup.                              |
| `"actions"` | Consumer-provided actions for advanced cases. Prefer a single primary action.        |
| `"title"`   | Short, specific heading. Recommended: it names the message for assistive technology. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
