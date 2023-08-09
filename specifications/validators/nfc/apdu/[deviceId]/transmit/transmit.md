---
version: 1.0.0
lastUpdated: 2023-06-13
qos: 1
direction: sub
---

# Specification: APDU Transmit

Transmit series of APDU commands in hexadecimals. Each command with an specified
ID. Commands will generate response passed from device to client on topic
`validators/apdu/receive` with corresponding `commandId`.

APDU commands can be used to read or write specific values from travel cards or
other NFC based devices.

`transceiveId` can be used to link `transmit` and `receive` events.
`eventTimestamp` is the time the command transmit request is generated.

- Topic: `validators/nfc/apdu/[deviceId]/transmit`
- Direction: Consume (Outbound from client)
- JSON Schema: [transmit.schema.json](./transmit.transmit.json)
- MQTT QoS: 1 (at least once)
- Trigger: Result from transmitted commands.

## Hex and expected status

All commands should be represented as hex, starting with 0x. See examples.
Expected status is optional. If result of executing command does not match
expected status prefix, result is ommited in the receive event.

### `0xAF` and continuation

Continuation on `0xAF` is handled implicitly if `expStatus` is set as `0x00`,
depending on apdu type. See description below.

#### desfire (native)

- If `expStatus=0x00` or empty and first bytes in response indicates more data
  (`0xAF`) the device should fetch all data until end and give result as
  concatinated byte array.
- If `expStatus=0xAF` is transmitted it is not handled automatically by the
  device.

## Related

See related transmit topic: [`validators/nfc/apdu/receive`](../receive).

## Examples

```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202400004",
  "eventTimestamp": "2023-04-22T10:28:37.337Z",
  "transceiveId": "c28f206d-8016-4d22-b21b-70d8d6d2fea4",
  "apduType": "desfire",
  "command": [
    { "commandId": 1, "frame": "0x0080", "expStatus": "0x00" },
    { "commandId": 2, "frame": "0x000000100000", "expStatus": "0x00" },
    { "commandId": 3, "frame": "0x0180", "expStatus": "0x00" },
    { "commandId": 4, "frame": "0x07", "expStatus": "0x00" }
  ]
}
```

## Additional information

Link to APDU-documentation.
