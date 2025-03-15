import newFetchModel from "../models/newetchWithPppoe.js";
import { newFetchTomodat } from "../scripts/fetchApiTomodat.js";
import db from "../config/dbConnect.js";

db.on("error", console.log.bind(console, "erro de conexão"));
db.once("open", () => {
  let now = new Date().toLocaleString("PT-br");
  console.log(`conexão com o banco em: ${now}`);
});

async function updateFetch() {
  try {
    const now = new Date().toLocaleString("PT-br");
    const data = await newFetchTomodat();

    await Promise.all(
      data.map(async element => {
        const id = element.id;
        await newFetchModel.findOneAndUpdate({ id }, element, { upsert: true }); // Update or insert if not found
      })
    );

    console.log(`Fetch successfully updated to Db at: ${new Date().toLocaleString("PT-br")}`);
  } catch (err) {
    console.error(`Error updating data: ${err.message}`);
  }
}

async function mainLoop() {
  try {
    while (true) {
      await updateFetch();
      console.log(
        `Waiting for ${3 * 60 * 1000} milliseconds before next update...`
      );
      await new Promise(resolve => setTimeout(resolve, 3 * 60 * 1000)); // Wait 3 minutes
    }
  } catch (err) {
    console.error(`Error in main loop: ${err.message}`);
  }
}

mainLoop();
