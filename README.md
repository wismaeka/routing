# Round Robin

## Purpose

As the domain of fraud feature store

## Prerequisite

- NodeJS version >= v20

Install the following dependencies

```
npm install
```

## Routing Folder

The routing folder is responsible for managing the routing logic of the server.

### Run

To run the application, execute the following command

```
npm run dev
```

### Endpoints

- POST /api/v1
  This endpoint is responsible for routing the request to selected server instances.

Request example:

```json
http://localhost:4000/api/v1

{
    "game" : "minecraft",
    "gamerID" : "XXX12344",
    "points" : 20,
    "device" : "ipad"
}

```

Response example:

```json
http://localhost:4000/api/v1

{
    "game" : "minecraft",
    "gamerID" : "XXX12344",
    "points" : 20,
    "device" : "ipad"
}

```

## Server

The server is act server instances. Runs in multiple ports

### Run

To run the application, execute the following command

```
npm run dev-api
```

### Endpoints

- POST /game
  This endpoint is responsible for returning JSON response for any valid JSON Request.

Request example:

```json
http://localhost:3002/game

{
    "game" : "minecraft",
    "gamerID" : "XXX12344",
    "points" : 20,
    "device" : "ipad"
}

```

Response example:

```json
http://localhost:3002/game

{
    "game" : "minecraft",
    "gamerID" : "XXX12344",
    "points" : 20,
    "device" : "ipad"
}

```

## Server-Delayed Response

The server is a duplicate of the main server, the purpose is to support delayed responses. This means that it can simulate a delay before sending a response back to the client. This feature is useful for testing scenarios where the server's response time is critical.
