---
version: 1.0.0
lastUpdated: 2023-06-13
---

# Specification: APDU Receive

Recieve result from commands passed through transmit topic. Will contain list of
results corresponding to the results transmitted, with the same specified
`commandId`s.

`transmitId` can be used to link `transmit` and `receive` events.
`eventTimestamp` is the time the first command result is generated.

- Topic: `validators/nfc/apdu/receive`
- Direction: Publish (Inbound to client)
- JSON Schema: [receive.schema.json](./receive.schema.json)
- MQTT QoS: 1 (at least once)
- Trigger: Result from transmitted commands.

## Related

See related transmit topic:
[`validators/nfc/apdu/[deviceId]/transmit`](../[deviceId]/transmit).

## Examples

```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202400004",
  "eventTimestamp": "2023-04-22T10:28:37.337Z",
  "transmitId": "c28f206d-8016-4d22-b21b-70d8d6d2fea4",
  "result": [
    { "commandId": 1, "frame": "AA==" },
    { "commandId": 2, "frame": "AJCAAAIpM6UjpXwAKAACgEA=" },
    { "commandId": 3, "frame": "AA==" },
    { "commandId": 4, "frame": "r///////////" }
  ]
}
```

## Additional information

Link to APDU-documentation.
