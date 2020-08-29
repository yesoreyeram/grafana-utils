<p align="center">
    <a href="https://yesoreyeram.github.io/grafana-simple-deno-api-backend"><img width="240" height="200" src="https://user-images.githubusercontent.com/153843/91555527-1399d100-e929-11ea-8ab3-31742977f317.png"/></a>
</p>
<p align="center">
    <h1 align="center">Grafana Deno JSON backend</h1> 
</p>
<p align="center">
    Deno based simple backend server for Grafana JSON Datasource.
</p>
<p align="center">
    <a href="https://github.com/yesoreyeram/grafana-simple-deno-api-backend/actions?query=workflow%3ACI" target="_blank"><img src="https://github.com/yesoreyeram/grafana-simple-deno-api-backend/workflows/CI/badge.svg"/></a>
    <a href="https://github.com/yesoreyeram/grafana-simple-deno-api-backend/issues" target="_blank"><img src="https://img.shields.io/github/issues/yesoreyeram/grafana-simple-deno-api-backend"/></a>
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

## Custom TimeSeries data

| Series Name | Result |
|-------------|--------|
| foo         | Single random walk series called foo | 
| bar         | Single random walk series called bar | 
| RandomWalk() | Single random walk series with random name |
| RandomWalk(10) | 10 random walk series with random names |
| RandomWalk(3,Server) | 3 random walk series with the name 'Server 1', 'Server 2' and 'Server 3' |

## Hosted Server

For demo purposes, this backend server is hosted in vercel. Latest version is hosted in the following URL.

[https://grafana-simple-deno-api-backend.vercel.app/](https://grafana-simple-deno-api-backend.vercel.app/)

## Local Installation

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
