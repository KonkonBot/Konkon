# Seifato API

This is the API for the Seifato bot.

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
import { SeifatoClient } from './client';
import { seifatoRoutes } from 'api';
import { Elysia } from 'elysia';

export const seifatoAPI = new Elysia()
  .use(seifatoRoutes)
  .listen(3080);

const client = new SeifatoClient(seifatoAPI);

client.start();
```
