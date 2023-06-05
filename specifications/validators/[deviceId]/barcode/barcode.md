---
version: 1.0.0
lastUpdated: 2023-06-01
---

# Specification: barcode

Passenger want to use the service and presents his barcode containing a token
referencing an account containing possible travel rights.

Barcode should be transmitted as base64 encoded URL string without padding.

- Topic: `validators/[deviceId]/barcode`
- Direction: Publish (Inbound to client)
- JSON Schema: [barcode.schema.json](./barcode.schema.json.json)
- MQTT QoS: 1 (at least once)
- Trigger: Once every time a passenger presents a barcode to the barcode reader.

## Examples

```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202400004",
  "eventTimestamp": "2023-04-22T10:28:37.337Z",
  "barcode": "CtYBCtMBCtABCiQxNzgzZTk5Ny03YmI0LTRiNDEtYTA5OS03NTk1NTc5Nzg5YWISCwil2JygBhDg15R3GpcBCgQFAwoOEgkIAhIFMS4xLjcSHwgBEhtuby52b3QudHJhdmVsYXNzaXN0YW50LmRlbW8SCwgJEgcyLjE1Ni4xEg0IDBIJMjYwMjE1NjAxEgsIBRIHc2Ftc3VuZxIMCAYSCFNNLUc5ODZCEhQIBxIQYjg2NGMxMWM5OTczNTg3MhIGCAQSAjEzEgYIAxICMzMSBggIEgIyOSIBBBJsCkcwRQIgRkQ0on4VH6WlqnFQa9dQLtfTPanPty4iGg8UALS2mrMCIQD7sajo4AVpurnCcEGbrkFBU7q4dxugiiQtqFijsty85hoBTiIPU0hBMjU2d2l0aEVDRFNBKgsIpdicoAYQ4NeUdzAB"
}
```
