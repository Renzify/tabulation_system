import { drizzle } from "drizzle-orm/neon-serverless";
import { neon } from "@neondatabase/serverless";
import { ENV } from "./env.js";
import * as schema from "../schemas/schema.js";

const sql = neon(ENV.DATABASE_URL);
export const db = drizzle(sql, { schema });
