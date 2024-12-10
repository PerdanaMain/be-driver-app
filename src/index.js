import app from "./app.js";
import config from "./config/index.js";

const port = config.port;

async function main() {
  try {
    app.listen(port, () => {
      console.log(`
        ################################################
        🛡️  Server listening on port: ${port} 🛡️
        ################################################
        `);
    });
  } catch (error) {
    console.error("Error starting server", error);
    process.exit(1);
  }
}

main();
