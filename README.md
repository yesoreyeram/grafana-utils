# Grafana Simple Deno HTTP API backend

![ci](https://github.com/yesoreyeram/grafana-simple-deno-api-backend/workflows/ci/badge.svg)

Simple HTTP API backend server for Grafana based on Deno. Supported by [Grafana Simple JSON Datasource](https://grafana.com/grafana/plugins/grafana-simple-json-datasource).

![image](https://user-images.githubusercontent.com/153843/91518006-1b388600-e8e7-11ea-8f40-c9cba2b02bf9.png)

This Deno based grafana api server exposes the following endpoints

* search
* query
* annotations
* tag-keys
* tag-values

For more details about using this repo, refer the screenshots [here](https://github.com/yesoreyeram/grafana-simple-deno-api-backend/issues/1).

## Starting the server

Running directly from url
```
deno run --allow-net https://raw.githubusercontent.com/yesoreyeram/grafana-simple-deno-api-backend/master/mod.ts --port 8080
```

Running from local
```
git clone https://github.com/yesoreyeram/grafana-simple-deno-api-backend.git
cd grafana-simple-deno-api-backend
deno run --allow-net mod.ts --port 8080
```

**Note:** If the port argument is not provided, by default server will be running on port 8080.
