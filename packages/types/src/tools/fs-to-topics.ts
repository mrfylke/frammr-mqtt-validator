import { fdir } from "fdir";
import { dirname, join } from "path";

export default async function listSpecifications(): Promise<
  Record<string, string>
> {
  const crawler = new fdir().withRelativePaths().glob("./**/*.schema.json");
  const folder = join(__dirname, "../../..", "specifications");
  const data = await crawler.crawl(folder).withPromise();

  const obj: Record<string, string> = {};
  for (let schema of data) {
    obj[dirname(schema)] = schema;
  }
  return obj;
}
