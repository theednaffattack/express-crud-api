import app from "./app";
import { config } from "./config/app-config";
import { ipAddress } from "./network-interfaces";

app.listen(config.env.PORT, () => {
  /* eslint-disable no-console */
  console.log("Success our app is running");
  console.log(`Localhost: http://localhost:${config.env.PORT}`);
  console.log(`LAN:       http://${ipAddress()}:${config.env.PORT}`);
  /* eslint-enable no-console */
});
