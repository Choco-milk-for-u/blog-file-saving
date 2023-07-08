// you probably doesnt want your back-end app be in sync
const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");

async function saveFile(file) {
  if (!file || !Buffer.isBuffer(file)) {
    throw new Error("Invalid file");
  }
  try {
    const nameID = crypto.randomUUID();
    const type = ".txt";
    const nameFile = nameID + type;
    const toDir = path.join(__dirname, "/static");
    const filePath = path.join(toDir, nameFile);

    await fs.mkdir(toDir, { recursive: true });
    await fs.writeFile(filePath, file);

    return nameID;
  } catch (error) {
    throw new Error("Failed to save file: " + error.message);
  }
}