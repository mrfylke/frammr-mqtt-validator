---
version: 1.0.0
lastUpdated: 2023-06-01
qos: 0
---

# Specification: barcode

Passenger want to use the service and presents their barcode containing a token
referencing an account containing possible travel rights.

Barcode should be transmitted as base64 encoded URL string without padding.

- Topic: `validators/barcode`
- Direction: Publish (Inbound to client)
- JSON Schema: [barcode.schema.json](./barcode.schema.json)
- MQTT QoS: 1 (at least once)
- Trigger: Once every time a passenger presents a barcode to the barcode reader.

## Examples

```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202400004",
  "eventTimestamp": "2023-04-22T10:28:37.337Z",
  "barcode": "CtYBCtMBCtN...VDRFNBKgsIpdicoAYQ4NeUdzAB"
}
```
