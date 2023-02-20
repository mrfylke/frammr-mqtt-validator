import Ajv from "ajv";
import type { ValidateFunction } from "ajv/dist/core";
import { readFile } from "fs/promises";
import { join } from "path";

import addFormats from "ajv-formats";
import type { SchemaNames } from "./types";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

type ValidationOutput =
  | {
      error: false;
    }
  | {
      error: true;
      errorData: ValidateFunction["errors"];
    };
export default async function validate(
  schema: SchemaNames,
  json: any
): Promise<ValidationOutput> {
  const doValidate = await readSpecification(schema);
  const isValid = doValidate(json);
  if (isValid) {
    return {
      error: false,
    };
  } else {
    return {
      error: true,
      errorData: doValidate.errors,
    };
  }
}

async function readSpecification(
  filename: SchemaNames
): Promise<ValidateFunction> {
  const spec = await readFile(
    join(__dirname, "..", "specifications", `${filename}.json`)
  );
  try {
    const parsed = JSON.parse(spec.toString());
    const previous = ajv.getSchema(parsed["$id"]);
    if (previous) {
      return previous;
    } else {
      return ajv.compile(parsed);
    }
  } catch (err) {
    throw new Error(`Unable to load or parse ${err}`);
  }
}
