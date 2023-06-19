---
version: 1.0.0
lastUpdated: 2023-06-13
---

# Specification: APDU Transmit

Transmit series of APDU commands encoded as base64. Each command with an
specified ID. Commands will generate response passed from device to client on
topic `validators/apdu/receive` with corresponding `commandId`.

APDU commands can be used to read or write specific values from travel cards or
other NFC based devices.

`transmitId` can be used to link `transmit` and `receive` events.
`eventTimestamp` is the time the command transmit request is generated.

- Topic: `validators/nfc/apdu/[deviceId]/transmit`
- Direction: Consume (Outbound from client)
- JSON Schema: [transmit.schema.json](./transmit.transmit.json)
- MQTT QoS: 1 (at least once)
- Trigger: Result from transmitted commands.

## Related

See related transmit topic: [`validators/nfc/apdu/receive`](../receive).

## Examples

```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202400004",
  "eventTimestamp": "2023-04-22T10:28:37.337Z",
  "transmitId": "c28f206d-8016-4d22-b21b-70d8d6d2fea4",
  "apduType": "desfire",
  "command": [
    { "commandId": 1, "frame": "WgCAVw==", "expStatus": "0x00" },
    { "commandId": 2, "frame": "vQwAAAAQAAA=", "expStatus": "0x00" },
    { "commandId": 3, "frame": "WgGAVw==", "expStatus": "0x00" },
    { "commandId": 4, "frame": "Cgc=", "expStatus": "0x00" }
  ]
}
```

## Additional information

Link to APDU-documentation.
