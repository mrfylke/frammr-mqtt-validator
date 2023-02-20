# MT Buss MQTT Validator

This repo contains a test validation client for MQTT communication for hardware
devices intended for busses in Møre og Romsdal by FRAM. You can use the code and
specification files here to test implementations on hardware or software. See
details on running the project as a JSON validator or a MQTT client below.

## CLI tooling

Given that you have installed Node.js on your system, you can use this package
as a CLI for validationg local JSON-files. See documentation on usage

### Usage

```
Usage: npx @frammr/mqtt-validator -s [position] -f [file]

Options:
      --version  Show version number                                   [boolean]
  -f, --file      file to validate                                      [required]
  -s, --schema   choose a schema                [required] [choices: "position"]
  -h, --help     Show help                                             [boolean]

Examples:
  npx @frammr/mqtt-validator -s position -f foo.json  Validate foo.json with position specification
```

## MQTT Client

Running the validator and test client as a service connecting to a MQTT Broker
(e.g. a hub or gateway in a bus test rig).

### Requirements

- Node.js 18

### Getting started

```shell
# 1. Get repo
git clone https://github.com/mrfylke/frammr-mqtt-validator.git

# 2. Install dependencies
yarn install

# 3. Copy .env.example and configure
cp .env.example .env

# 4. Start MQTT client
yarn start
```

This will add a subscriber to the Broker as specified in `.env`.

## Hardware and Communications

This shows an example component overview as it could be connected in a bus. All
protocols here are MQTT, with the option of multiple Barcode and NFC devices.

```mermaid
---
title: Component connections w/protocols
---

graph TB

    subgraph terminal
    A(MT Buss)
    end
    A(MT Buss) <--MQTT--> B(Gateway)

    subgraph READERS
        D(Barcode/NFC)
        E(Barcode/NFC)
        F(Barcode/NFC)
    end

    B <--MQTT--> READERS
    B<--MQTT-->G(GPS)

    B<-.MQTT.->C(APC)

    style C opacity:0.7,stroke-dasharray: 4

```

The Gateway in this example is the MQTT broker and components and the terminal
are producers/consumers.

---

## Communication

The following is a pseudo-example of how the communication will go with message
passing using MQTT. All payload will be expected to be JSON. See example models
further down in this document.

```mermaid
---
title: Example communication flow
---
sequenceDiagram
    participant MT Buss
    participant Gateway

    Gateway->>Barcode: connect()
    Barcode-->>Gateway: ack

    MT Buss->>Gateway: connect()
    Gateway-->>MT Buss: ack

    MT Buss->>Gateway: subscribe(/barcode/validation/request)
    activate Gateway

    Barcode->>Gateway: publish(/barcode/validation/request)
    Gateway-->>MT Buss: :validation-request
    deactivate Gateway

    activate Gateway
    MT Buss->>Gateway: publish(/barcode/validation/confirm)
    Gateway-->>Barcode: :validation-confirm

    deactivate Gateway
```

### Example topics and payloads

The following are examples of what topics and layloads might look like. This
will be under continuous change and will be updated as development progresses.
For the final source of truth check out the [specifications](./specifications).

#### Topic `/gps/position/`

```json
{
  "atDateTime": "2023-02-06T12:45:50+01:00",
  "position": {
    "latitude": 0,
    "longitude": 0
  }
}
```

#### Topic `/barcode/validation/request/`

```json
{
  "type": "aztec",
  "deviceId": "<id>",
  "code": "<base64-encoded-code>"
}
```
