import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./config/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_91viLdgjGoRy@ep-hidden-sound-a5ge0p2k-pooler.us-east-2.aws.neon.tech/learning-platform?sslmode=require",
  },
});
