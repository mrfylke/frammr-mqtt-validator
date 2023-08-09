---
version: 1.0.0
lastUpdated: 2023-05-03
qos: 0
direction: pub
---

# Specification: Location

Provides periodic GPS location data specified in decimal format by latitude and
longitude. Should be send once every second. No need for a MQTT QoS guarantee as
package loss is acceptable.

- Topic: `/sensors/location`
- Direction: Publish (Inbound to client)
- JSON Schema: [location.schema.json](./location.schema.json)
- MQTT QoS: 0 (Default)
- Interval: Atleast once per second

#### Description

Provided periodic location data.

#### Examples

```json
{
  "traceId": "48b12d1f-6b96-4f70-94f9-f785cef96812",
  "eventTimestamp": "2023-09-01T23:45:52Z",
  "latitudeDegree": 62.734393,
  "longitudeDegree": 7.150033,
  "altitude": 124,
  "messageNumber": 12345,
  "speedOverGround": 15.3,
  "trackDegreeTrue": 324,
  "signalQuality": 1,
  "numberOfSatellites": 12,
  "hdop": 2.4
}
```

---

## Notice:

Specification based on and should be compatible with Ruter specification. As
such it it is licensed under Apache License 2.0 and originally
[created by Ruter AS](https://github.com/RuterNo/adt-doc/tree/3.x/asyncapi/json-schemas/sensors/location).
