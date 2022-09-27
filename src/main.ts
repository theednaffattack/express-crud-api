import zod from "zod";

import app from "./app";
import { ipAddress } from "./network-interfaces";

const envSchema = zod.object({ PORT: zod.string().min(1) });

const appConfigSchema = zod.object({
  env: envSchema,
});

const config = appConfigSchema.parse({ env: process.env });

app.listen(config.env.PORT, () => {
  /* eslint-disable no-console */
  console.log("Success our app is running");
  console.log(`Localhost: http://localhost:${config.env.PORT}`);
  console.log(`LAN:       http://${ipAddress()}:${config.env.PORT}`);
  /* eslint-enable no-console */
});
