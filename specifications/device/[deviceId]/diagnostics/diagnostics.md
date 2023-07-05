---
version: 1.0.0
lastUpdated: 2023-06-13
---

# Specification: Diagnostics

Allows client to subscribe to diagnostics from specific device.

Sends diagnostics information for device to sales clients. Could be used by
sales clients to show alerts, debug and keep general status of connection
information of different devices.

- Topic: `/device/[deviceId]/diagnostics`
- Direction: Publish (Inbound to client)
- JSON Schema: [diagnostics.schema.json](./diagnostics.schema.json)
- MQTT QoS: 0 (Default)
- Interval: On device startup and on request

## Description

Devices should respond with diagnostics in two cases: on initial startup and as
a response to a diagnostics check. See related topics in next section.

This topic is available for sales clients to subscribe to diagnostics data on
specific devices.

## Related topics

- See same topic for all devices: `/device/diagnostics`
- See related topic for requesting `/device/diagnostics/request` and
  `/device/[deviceId]/diagnostics/request`

## Examples

```json
{
  "manufacturer": "Acme",
  "model": "NFC2000b",
  "serial": "F0A222100004",
  "firmwareVersion": "0.9.6.0",
  "standardVersion": "1.0.0",
  "ipAddress": "192.168.99.11",
  "label": "front",
  "functionality": ["nfc", "barcode"],
  "status": "OK",
  "statusText": "no errors"
}
```

```json
{
  "manufacturer": "Acme",
  "model": "LocOmotive2",
  "serial": "LL0A222100004",
  "firmwareVersion": "0.9.0.0",
  "standardVersion": "1.1.0",
  "ipAddress": "192.168.99.12",
  "label": "",
  "functionality": ["location"],
  "status": "OK",
  "statusText": "no errors"
}
```
