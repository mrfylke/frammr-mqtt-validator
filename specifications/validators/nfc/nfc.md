---
version: 1.0.1
lastUpdated: 2023-07-04
qos: 0
direction: pub
---

# Specification: nfc

When a passenger intends to use the service, they present their travel card,
which may have a token referencing an account with corresponding travel rights.
In cases where there is no token present, the serial number of the travel card
will be used. If there is a customer account associated with that serial number,
a potential token will be generated and written back to the travel card. See
diagram for total flow.

Token should be transmitted as base64 encoded URL string without padding.

- Topic: `validators/nfc`
- Direction: Publish (Inbound to client)
- JSON Schema: [nfc.schema.json](./nfc.schema.json.json)
- MQTT QoS: 0 (at most once)
- Trigger: Once every time a passenger presents a travel card to the barcode
  reader.

## Card content dump

If the device is configured accordingly, the complete content of the card can be
transferred from the device, as depicted in the flow chart. This simplifies the
client's perspective as it enables direct access to the card's content. Please
refer to the `validators/configure` topic for the configuration flag that
determines whether `cardContent` is set. Below are examples demonstrating the
scenarios when `cardContent` is enabled.

This concept is applicable in situations where the smart card holds various
types of travel rights and there is a requirement to prioritize among them.
Examples of such types include NOD (Nasjonal OrdreDatabase), account-based, and
others.

Only supported type for now is `nsd` and that needs to be set as `type`, for
future proofing when new types are added.

## Examples

```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202400004",
  "eventTimestamp": "2023-04-22T10:28:37.337Z",
  "travelCardNumber": "323116753",
  "token": "CtYBCtMBCtN...VDRFNBKgsIpdicoAYQ4NeUdzAB"
}
```

### Example with card content

```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202400004",
  "eventTimestamp": "2023-04-22T10:28:37.337Z",
  "travelCardNumber": "323116753",
  "cardContent": [
    {
      "appId": "<ID>",
      "type": "nsd",
      "files": [{ "fileNumber": "<FileNumber>", "content": "0x0032" }]
    }
  ]
}
```

## Flow

```mermaid
flowchart TD
    A[Customer shows card] --> B(NFC device\nreads card)

    B --> B1{Is supported card?}
    B1 -->|no| ResponseInvalid_0[Built in response:\n Not valid]


    B1 -->|Yes| C{Device contains\naccess keys}

    C -->|Yes| AC1_Dump{Is dump card content\nconfig active?}
    AC1_Dump -->|Yes| AC1_Dump_1(Read entire\ncard content)

    AC1_Dump_1 -->|/validators/nfc|AC4

    AC1_Dump -->|No| AC1(Read card,\nfetch NSD serial number and\npotential token)
    AC1 --> AC2{Is token\non card?}
    AC2 -->|Yes| AC3(Read token)

    AC3 -->|/validators/nfc| AC4{Does token\nexists at Provider?}
    AC4 -->|Yes| AC5(Validate Token)
    AC5 -->|"/validators/[deviceId]/response"| AC6[Show response\nto customer]
    AC4 -->|Blocked/removed| AC7(APDU Subprocess\nRemove token from card)
    AC7 -->|"/validators/[deviceId]/response"| ResponseInvalid


    C -->|No| NAC1(Fetch NSD serial number)
    NAC1 -->|/validators/nfc| NAC2(APDU Subprocess\nFetch token)
    NAC2 --> NAC3{Is token\non card?}


    AC2 -->|No| AC2_Get(Send only serial number)
    AC2_Get -->|/validators/nfc| NoToken(Get token from\nserial number)

    NAC3 -->|No| NoToken
    NAC3 -->|Yes| NACToken1{Does token\nexists at Provider?}

    NACToken1 -->|Blocked/removed| NACToken1No(APDU Subprocess\nRemove token from card)
    NACToken1No  -->|"/validators/[deviceId]/response"| NACToken1NoResponse[Show response\nto customer]

    NoToken --> FetchTokenStatus{Does token\nexists at Provider?}
    FetchTokenStatus-->|Blocked/removed| FetchTokenInvalid(No valid travel right)
    FetchTokenStatus-->|Not found| FetchTokenInvalid
    FetchTokenInvalid -->|"/validators/[deviceId]/response"| ResponseInvalid[Show response:\n Not valid]

    FetchTokenStatus-->|Found| FetchTokenFound(APDU Subprocess:\nWrite token to card)

    FetchTokenFound -->|Yes| FetchTokenFoundValidate(Validate Token)
    FetchTokenFoundValidate -->|"/validators/[deviceId]/response"| FetchTokenResponse[Show response\nto customer]

    NACToken1 -->|Found| FetchTokenFoundValidate

```

- The APDU sub-processes are custom command transceive processes that utilize
  the [`apdu`](./apdu/) topics for communication and data exchange.
- In the flow chart, the "Provider" refers to the Account Based Ticketing (ABT)
  provider. This provider handles tasks such as customer data management and
  ticket purchases within the ABT system.
