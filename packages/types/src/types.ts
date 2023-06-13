
export type TopicName = 'sensors/location' | 'validators/barcode' | 'validators/nfc' | 'validators/[deviceId]/response' | 'validators/nfc/apdu/receive';
export const availableTopics = ["sensors/location","validators/barcode","validators/nfc","validators/[deviceId]/response","validators/nfc/apdu/receive"] as readonly TopicName[];
export const topicSet = {"sensors/location":"sensors/location/location.schema.json","validators/barcode":"validators/barcode/barcode.schema.json","validators/nfc":"validators/nfc/nfc.schema.json","validators/[deviceId]/response":"validators/[deviceId]/response/response.schema.json","validators/nfc/apdu/receive":"validators/nfc/apdu/receive/receive.schema.json"} satisfies Record<TopicName, string>;
