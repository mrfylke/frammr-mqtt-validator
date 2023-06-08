
export type TopicName = 'sensors/location' | 'validators/barcode';
export const availableTopics = ["sensors/location","validators/barcode"] as readonly TopicName[];
export const topicSet = {"sensors/location":"sensors/location/location.schema.json","validators/barcode":"validators/barcode/barcode.schema.json"} satisfies Record<TopicName, string>;
