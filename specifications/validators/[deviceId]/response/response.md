---
version: 1.0.0
lastUpdated: 2023-06-09
---

# Specification: Validation Response

Response sent after finished validation on client. Response can be both success,
fail and error. In the current specification the response method is limited to a
variant type/enum, and it's up to the device to handle the proper response in
form of icon, color and sound.

Device should optionally recieve title and description if supported by the
device.

- Topic: `validators/[deviceId]/response`
- Direction: Consume (Outbound from client)
- JSON Schema: [response.schema.json](./response.schema.json)
- MQTT QoS: 1 (at least once)
- Trigger: After validation result on client

## Examples

```json
{
  "traceId": "48b12d1f-6b96-4f70-94f9-f785cef96812",
  "eventTimestamp": "2023-09-01T23:45:52Z",
  "result": {
    "title": "Godkjent",
    "description": "Validert 22/04/2020 13:19 Enkeltbillett 1 Voksen ",
    "validity": "VALID"
  }
}
```
