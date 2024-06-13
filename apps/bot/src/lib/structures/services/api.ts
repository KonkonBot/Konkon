import { treaty } from "@elysiajs/eden";
import type { apiApp } from "api";

export const api = treaty<typeof apiApp>("localhost:3080");
