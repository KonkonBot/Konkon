# `src/locales`

The `src/locales` folder contains all the app's locale files, which are used to localize the app's messages and commands.

## Locale File Structure

The locale file structure is as follows:

- `src/locales/en.ts`: This file contains the English locale file.
- `src/locales/es.ts`: This file contains the Spanish locale file.
- `src/locales/fr.ts`: This file contains the French locale file.
- `src/locales/de.ts`: This file contains the German locale file.
- `src/locales/it.ts`: This file contains the Italian locale file.
- `src/locales/pt.ts`: This file contains the Portuguese locale file.
- `src/locales/ru.ts`: This file contains the Russian locale file.

## Locale File Format

The locale file format is as follows:

```ts
export default {
  "en": {
    "commands": {
      "hello": (name) => `Hello ${name}!`,
    }
  }
} satisfies typeof defaultLang;
```

In this example, the `en` key is the language code, and the `commands` key is the command name. The value of each command is a function that takes a `name` parameter and returns a string.
