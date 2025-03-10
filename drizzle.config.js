/** @type {import("drizzle-kit").Config} */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',  // Ensure this matches the database you're using
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_d8qRzABc0DtP@ep-snowy-butterfly-a851v29z-pooler.eastus2.azure.neon.tech/mock-interview?sslmode=require'
  }
};
