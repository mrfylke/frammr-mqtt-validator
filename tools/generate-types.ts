import { readdir, writeFile } from "fs/promises";
import { basename, join } from "path";

generate().then(() => {
  console.log("Generated types");
});

async function getAllFiles() {
  const files = await readdir(join(__dirname, "..", "specifications"));

  return files
    .filter((fn) => fn.endsWith(".json"))
    .map((filename) => ({
      fullPath: join(__dirname, filename),
      basename: basename(filename, ".json"),
      filename,
    }));
}

async function generate() {
  const files = await getAllFiles();

  const basenames = files.map((i) => i.basename);
  const schemaNames = files.map((i) => `'${i.basename}'`).join(" | ");

  const types = `
export type SchemaNames = ${schemaNames};
export const schemas = ${JSON.stringify(basenames)} as SchemaNames[];
`;

  await writeFile(join(__dirname, "types.ts"), types);
}
