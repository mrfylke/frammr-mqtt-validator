
export type TopicName = 'sensors/location' | 'validators/barcode' | 'validators/nfc' | 'validators/[deviceId]/response';
export const availableTopics = ["sensors/location","validators/barcode","validators/nfc","validators/[deviceId]/response"] as readonly TopicName[];
export const topicSet = {"sensors/location":"sensors/location/location.schema.json","validators/barcode":"validators/barcode/barcode.schema.json","validators/nfc":"validators/nfc/nfc.schema.json","validators/[deviceId]/response":"validators/[deviceId]/response/response.schema.json"} satisfies Record<TopicName, string>;
