# `@konkon/config`

A configuration manager for the `KonkonBot` servicies.

## Structure

`@konkon/config` is structured as follows:

- `.env`: This file contains the app's environment variables.
- `env.ts`: This file exports the app's environment variables.
- `base.json`: This file contains the app's base typescript configuration.

## Usage

```ts
import { env } from '@konkon/config/env';

console.log(env.BOT_TOKEN);
```
