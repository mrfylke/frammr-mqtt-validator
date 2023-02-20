import validate from "./validate";

const validationData = await validate("position", {
  atDateTime: "2023-02-06T12:45:50+01:00",
  position: {
    latitude: "dsa",
    longitude: 0,
  },
});

if (!validationData.error) {
  console.log("✅ Valid JSON Document");
  process.exit(0);
} else {
  validationData.errorData
    ?.map((error) => `❌ Error: ${error.instancePath} ${error.message}`)
    .forEach((l) => console.log(l));
  process.exit(1);
}
