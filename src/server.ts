import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();

const PORT = parseInt(process.env.PORT as string, 10) || 8888;

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
