# `@seifato/config`

A configuration manager for the `SeifatoBot` servicies.

## Structure

`@seifato/config` is structured as follows:

- `.env`: This file contains the app's environment variables.
- `env.ts`: This file exports the app's environment variables.
- `base.json`: This file contains the app's base typescript configuration.

## Usage

```ts
import { env } from '@seifato/config/env';

console.log(env.BOT_TOKEN);
```
