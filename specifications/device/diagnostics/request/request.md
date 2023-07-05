---
version: 1.0.0
lastUpdated: 2023-06-13
---

# Specification: Requets Diagnostics

Request diagnostics from all connected devices. Can be called periodically by
polling from sales client. A request will cause a diagnostics event to be passed
from all devices.

- Topic: `/device/diagnostics/request`
- Direction: Consume (Outbound from client)
- JSON Schema: [request.schema.json](./request.schema.json)
- MQTT QoS: 0 (Default)

## Description

Request diagnostics check from device. See related topics in next section.

## Related topics

- Subscribing to topic on device level: `/device/[deviceId]/diagnostics`
- Subscribing to all diagnostics: `/device/diagnostics`
- See related topic for requesting on specific device
  `/device/[deviceId]/diagnostics/request`

## Examples

```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "eventTimestamp": "2023-04-22T10:28:37.337Z"
}
```
