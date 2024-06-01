# Konkon API

This is the API for the Konkon bot.

## Routes

### Guilds

- `/guilds`
  - `/guilds/:guildId` **GET**
  - `/guilds/:guildId/settings` **POST**

### Porter

- `/porter`
  - `/porter/translate` **POST**

## Usage

```ts
import { KonkonClient } from './client';
import { konkonRoutes } from 'api';
import { Elysia } from 'elysia';

export const konkonAPI = new Elysia()
  .use(konkonRoutes)
  .listen(3080);

const client = new KonkonClient(konkonAPI);

client.start();
```
