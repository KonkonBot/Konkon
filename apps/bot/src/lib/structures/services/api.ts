import { treaty } from "@elysiajs/eden";
import { apiApp } from "api";

export const elysiaApp = apiApp();

export const api = treaty<typeof elysiaApp>("localhost:3080");
