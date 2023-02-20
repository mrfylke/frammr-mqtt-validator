import { readdir, writeFile } from "fs/promises";
import { basename, join } from "path";

const dirname = new URL(".", import.meta.url).pathname;
async function getAllFiles() {
  const files = await readdir(join(dirname, "..", "specifications"));

  return files
    .filter((fn) => fn.endsWith(".json"))
    .map((filename) => ({
      fullPath: join(dirname, filename),
      basename: basename(filename, ".json"),
      filename,
    }));
}

const files = await getAllFiles();

const basenames = files.map((i) => i.basename);
const schemaNames = files.map((i) => `'${i.basename}'`).join(" | ");

const types = `
export const schemas = ${JSON.stringify(basenames)};
export type SchemaNames = ${schemaNames};
`;

await writeFile(join(dirname, "types.ts"), types);
