import Ajv from "ajv";
import type { ValidateFunction } from "ajv/dist/core";
import { readFile } from "fs/promises";
import { join } from "path";

import addFormats from "ajv-formats";
import type { SchemaNames } from "./types";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// console.log(spec);
const validate = await readSpecification("position");
const isValid = validate({
  atDateTime: "2023-02-06T12:45:50+01:00",
  position: {
    latitude: "dsa",
    longitude: 0,
  },
});

if (isValid) {
  console.log("✅ Valid JSON Document");
  process.exit(0);
} else {
  validate.errors
    ?.map((error) => `❌ Error: ${error.instancePath} ${error.message}`)
    .forEach((l) => console.log(l));
  process.exit(1);
}

async function readSpecification(
  filename: SchemaNames
): Promise<ValidateFunction> {
  const dirname = new URL(".", import.meta.url).pathname;
  const spec = await readFile(
    join(dirname, "..", "specifications", `${filename}.json`)
  );
  try {
    return ajv.compile(JSON.parse(spec.toString()));
  } catch (err) {
    console.log("dsadsa");
    console.error(`error: ${err}`);
    process.exit(2);
  }
}
