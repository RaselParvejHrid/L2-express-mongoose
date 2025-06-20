import app from "./app";
import { connectDB } from "./config/db";

const PORT = 8888;

async function main() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error to run the server!");
    console.log(error);
  }
}

main();
