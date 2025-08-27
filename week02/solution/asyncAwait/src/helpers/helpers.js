import { promises as fs } from "fs";

const getData = async (path) => {
  try {
    const fileData = await fs.readFile(path, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    throw new Error(`Failed to read or parse file ${path}: ${error.message}`);
  }
};

export { getData };
