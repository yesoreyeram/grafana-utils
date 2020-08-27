# Grafana Simple Deno HTTP API backend

Simple HTTP API backend server for Grafana based on Deno. This Deno based grafana api server exposes the following endpoints

* search
* query
* annotations

For more details about using this repo, refer the screenshots [here](https://github.com/yesoreyeram/grafana-simple-deno-api-backend/issues/1).

## Starting the server

Running directly from url
```
deno run --allow-net https://raw.githubusercontent.com/yesoreyeram/grafana-simple-deno-api-backend/master/index.ts --port 8080
```

Running from local
```
git clone https://github.com/yesoreyeram/grafana-simple-deno-api-backend.git
cd grafana-simple-deno-api-backend
deno run --allow-net index.ts --port 8080
```

**Note:** If the port argument is not provided, by default server will be running on port 8080.
