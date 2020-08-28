<p align="center">
    <img width="240" height="200" src="https://user-images.githubusercontent.com/153843/91555527-1399d100-e929-11ea-8ab3-31742977f317.png"/>
</p>
<p align="center">
    <h1 align="center">Grafana Deno JSON backend</h1> 
</p>
<p align="center">
    Deno based simple backend server for Grafana JSON Datasource.
</p>
<p align="center">
    <a><img src="https://github.com/yesoreyeram/grafana-simple-deno-api-backend/workflows/CI/badge.svg"/></a>
    <a><img src="https://img.shields.io/github/issues/yesoreyeram/grafana-simple-deno-api-backend"/></a>
</p>

## Features

Simple HTTP API backend server for Grafana based on Deno. Supported by [Grafana Simple JSON Datasource](https://grafana.com/grafana/plugins/grafana-simple-json-datasource).

This Deno based grafana api server exposes the following endpoints

- `/search`
- `/query`
- `/annotations`
- `/tag-keys`
- `/tag-values`

For more details about using this repo, refer the screenshots [here](https://github.com/yesoreyeram/grafana-simple-deno-api-backend/issues/1).

## Installation

### Pre-Requisites

* Deno 1.x or higher

### Running the server

There are couple of ways you can start the server

1. Running directly from url

```
deno run --allow-net https://raw.githubusercontent.com/yesoreyeram/grafana-simple-deno-api-backend/master/mod.ts --port 8080
```

2. Running from local

```
git clone https://github.com/yesoreyeram/grafana-simple-deno-api-backend.git
cd grafana-simple-deno-api-backend
deno run --allow-net mod.ts --port 8080
```
### Configuration

There are few command line flags you can pass while starting the server to customize the server.


| Param | Description| 
|-------|------------|
| `--allow-net` | This is security flag required by deno. Otherwise, server will not able to access the port. |
| `--port` | HTTP port to start the server. If not provided, server will try to start at port 8080 |
