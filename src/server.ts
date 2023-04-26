import * as dotenv from "dotenv";
dotenv.config();

import mqtt, { MqttClient } from "mqtt";
import { availableTopics } from "../tools/types";
import validate from "../tools/validate";
import config from "./config";

// TODO SHOW ERROR

// Adds all supported topics and their corresponding schemas
const SUPPORTED_TOPICS = availableTopics;

const hasAdditionalConfig = Object.keys(config).length > 0;

let client: MqttClient;
if (hasAdditionalConfig) {
  client = mqtt.connect(config);
} else {
  const connectConfig = process.env["MQTT_URL"];
  if (!connectConfig) {
    throw new Error(
      "You need to configure MQTT client either by .env file or populating ./src/config.ts."
    );
  }
  client = mqtt.connect(connectConfig);
}

client.on("connect", () => {
  console.log("Connected to MQTT Broker");
  console.log(
    `  Subscribing to topics: ${Object.keys(SUPPORTED_TOPICS).join(", ")}`
  );
  // Add subscription to all topics...
  for (let topic of SUPPORTED_TOPICS) {
    client.subscribe(topic, function (err) {
      if (err) {
        console.error(`Unable to subscribe to topic ${topic}: ${err.message}`);
      }
    });
  }
});

client.on("message", async function (topic, message) {
  const schema = SUPPORTED_TOPICS.find((i) => i == topic);
  if (!schema) {
    return console.warn(`[topic: ${topic}]: Unknown topic. Ignoring message`);
  }

  let structuredData;
  try {
    structuredData = JSON.parse(message.toString());
  } catch (e) {
    console.error(`[topic: ${topic}] ❌ Error: Unable to parse as JSON`);
    return;
  }

  const validationData = await validate(schema, structuredData);

  if (!validationData.error) {
    console.log(`[topic: ${topic}] ✅ Valid message`);
  } else {
    console.log(`[topic: ${topic}]: ❌ Invalid schema`);
    validationData.errorData
      ?.map((error) => `    ${error.instancePath} ${error.message}`)
      .forEach((l) => console.log(l));
  }
});
