# `src/locales`

The `src/locales` folder contains all the app's locale files, which are used to localize the app's messages and commands.

## Locale File Structure

The locale file structure is as follows:

- `src/locales/en.ts`: This file contains the English locale file.
- `src/locales/es.ts`: This file contains the Spanish locale file.

## Locale File Example

Here is an example of a locale file:

```ts
export default {
  "commands": {
    "hello": (name) => `Hello ${name}!`,
    "test": {
      "description": "This is a test command.",
      "errors": {
        "notFound": (name) => `The user ${name} was not found.`,
      },
    },
  },
};
```

In this example, we have a locale file named `en.ts` that contains the English locale file.

## Locale File Usage

To use a locale file, you need to import it in your code and use the `t` function to access the messages and commands.

```ts
const t = ctx.t.commands.hello.get(await ctx.locale());

const name = "John";
const message = t.commands.hello(name);
```

## Locale File Syntax

### Messages

Messages are defined using the `t` function and the locale file key.

```ts
const message = t.commands.hello(name);
```

### Commands

```ts
const command = t.commands.test.description;
```

### Errors

```ts
if (!user)
  return t.errors.notFound(name);
```

### Embeds

```ts
const embed = new Embed()
  .setTitle(t.embed.title)
  .setDescription(t.embed.description);
```

### Locale File Keys

Locale file keys are defined using the `commands`, `errors`, and `embed` keys.

- `commands`: This key is used to define the commands in the locale file.
- `errors`: This key is used to define the errors in the locale file.
- `embed`: This key is used to define the embeds in the locale file.
