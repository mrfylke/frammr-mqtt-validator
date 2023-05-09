
export type TopicName = 'sensors/location';
export const availableTopics = ["sensors/location"] as readonly TopicName[];
export const topicSet = {"sensors/location":"sensors/location/location.schema.json"} satisfies Record<TopicName, string>;
