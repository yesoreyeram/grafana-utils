<p align="center">
    <a href="https://yesoreyeram.github.io/grafana-utils"><img src="https://user-images.githubusercontent.com/153843/91980457-30664800-ed1f-11ea-859c-6337d8f22334.png"/></a>
</p>
<p align="center">
    <a href="https://github.com/yesoreyeram/grafana-utils/actions?query=workflow%3ACI" target="_blank"><img src="https://github.com/yesoreyeram/grafana-utils/workflows/CI/badge.svg"/></a>
    <a href="https://github.com/yesoreyeram/grafana-utils/issues" target="_blank"><img src="https://img.shields.io/github/issues/yesoreyeram/grafana-utils"/></a>
    <a href="https://github.com/yesoreyeram/grafana-utils/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/github/license/yesoreyeram/grafana-utils" alt="Grafana utils license" /></a>
    <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs are welcome" /></a>
    <a href="https://GitHub.com/yesoreyeram/grafana-utils/graphs/commit-activity"><img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" alt="Grafana Utils is maintained" /></a>
    <a href="https://codeclimate.com/github/yesoreyeram/grafana-utils/maintainability"><img src="https://api.codeclimate.com/v1/badges/66ea317daf48cccd6f35/maintainability" /></a>
</p>

Simple HTTP API backend server for Grafana based on Deno. Supported by [Grafana Simple JSON Datasource](https://grafana.com/grafana/plugins/grafana-simple-json-datasource). This will be useful for prototyping dashboards, demo dashboards and while building plugins.

## Table of Contents

- [How to use](#how-to-use)
- [Features](#features)
- [Custom TimeSeries patterns](#custom-timeseries-patterns)
- [Custom Table Data](#custom-table-data)
- [CSV Datasource](#csv-datasource)
- [Local Installation](#local-installation)
- [Notes](#notes)
- [License](#license)

## How to use

The backend server is hosted in the following url

<p align="center">
    <h2 align="center">
        <a href="https://grafana-utils.vercel.app" target="_blank">https://grafana-utils.vercel.app</a>
    </h2> 
</p>

Above backend needs to be connected with [Grafana Simple JSON Datasource](https://grafana.com/grafana/plugins/grafana-simple-json-datasource). Example shown [here](https://github.com/yesoreyeram/grafana-utils/issues/1#issuecomment-685401416). Once datasource configured, you can start writing queries directly.

_Note: Instead the hosted version, you can also use your own instance for production purposes_

## Features

* Custom timeseries patterns
* CSV Datasource
* Ad-hoc table data
* LCD text

For more details about the use cases, refer the screenshots [here](https://github.com/yesoreyeram/grafana-utils/issues/1).


## Custom TimeSeries patterns

| Series Name                                  | Result                                                                                                                                                                                                                                                                                    |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| foo                                          | Single random walk series called foo                                                                                                                                                                                                                                                      |
| bar                                          | Single random walk series called bar                                                                                                                                                                                                                                                      |
| RandomWalk()                                 | Single random walk series with random name                                                                                                                                                                                                                                                |
| RandomWalk(10)                               | 10 random walk series with random names                                                                                                                                                                                                                                                   |
| RandomWalk(3,Server)                         | 3 random walk series with the name 'Server 1', 'Server 2' and 'Server 3'                                                                                                                                                                                                                  |
| FlatLine()                                   | Flat series with constant 0 as value over the period with random series name                                                                                                                                                                                                              |
| FlatLine(16)                                 | Flat series with constant 16 as value over the period with random series name                                                                                                                                                                                                             |
| FlatLine(7,Rainbow)                          | Flat series with constant 7 as value over the period with 'Rainbow' as series name                                                                                                                                                                                                        |
| Step()                                       | Random series starting from 0 and increment by 1 for each data point                                                                                                                                                                                                                      |
| Step(10)                                     | Random series starting from 10 and increment by 1 for each data point                                                                                                                                                                                                                     |
| Step(10,Speed)                               | Series called 'Speed' starting from 10 and increment by 1 for each data point                                                                                                                                                                                                             |
| Step(10,Speed,5)                             | Series called 'Speed' starting from 10 and increment by 5 for each data point                                                                                                                                                                                                             |
| Step(10,,5)                                  | Random series starting from 10 and increment by 5 for each data point                                                                                                                                                                                                                     |
| Pattern(HeartBeat,0,0,0,-3,-2,4,0,0)         | Repeat the pattern 0,0,0,-3,-2,4,0,0 as series 'Heartbeat' over the time range                                                                                                                                                                                                            |
| Pattern(,0,1,2,1)                            | Repeat the pattern 0,1,2,1 as random series over the time range                                                                                                                                                                                                                           |
| Patterns([Foo,4,3,2,1,2,3][Bar,1,2,3,2])     | Repeat both the patterns over the time range                                                                                                                                                                                                                                              |
| Maths(Foo,1+(2*$i))                          | Return series called Foo using the math series `1+(2*$i)` where $i is the index.                                                                                                                                                                                                          |
| Maths(Bar,sin($i deg) * pow($i,3))           | Return series called Bar using the math series `sin($i deg) * pow($i,3)` where $i is the index.                                                                                                                                                                                           |
| Expression(Foo,multiply:0.1,cos,abs,max:0.3) | Series foo which is equivalent of max(abs(cos(x\*0.1)),0.3) where x is the index of the datapoint starting from 0.<br/>Multiple expressions can be added. <br/>Valid expressions are random, add, minus, multiply, divide, abs, pow, sqrt, max, min, sin, cos, tan, ceil, floor and round.|
| Matrix(Foo,10,20,[6,7,1,2,3,4,5][1,2,0,4,5]) | Create a series call Foo after the fist 10 timestamps. shifted by 20 points down. Rest of the series within square brackets are datapoints for each timestamp. Given example will have 2 timestamp points.                                                                                |
| LCD(GRAFANA,10)                              | Create series of datapoints representing word GRAFNA in LCD format.Spaces and alphabets are accepted. If you need space before/after the word prefix/suffix with *. Second parameter is y offset. In the example entire text is shifted by 10 points in y axis                            | 

#### Special functions in expression

| Function | Sample Query | Description |
|--------------|--------------|---------|
| start-after | Expression(Foo,sin,start-after:2) | Series foo will start after 2 null values |
| stop-after  | Expression(Foo,sin,stop-after:2) | Series foo will stop after values and produce null for remaining series |

## Custom Table Data

For custom table data, follow the below syntax

`Custom(columnCount,...columns,...rows)`

Examples given below

| Format | Description |
|--------|-------------|
| `Custom(1,countries,india,china,england,united kingdom)` | 1 column table with column name as countries. Contains india, china, england, united kingdom as rows |
| `Custom(2,countries,city,india,chennai,england,london)` | 2 columns table with Countries and City as column names. Remaining items will spread as row items respectively. |
| `Custom(3,countries,rank:number,capital,india,1,delhi,england,3,london)` | 3 column table where second column in number format |

## CSV datasource

You can call any csv url and the api server will return the data to grafana.

| Format | Sample Query | Description |
|--------|--------------|-------------|
| CSV(`YOUR_CSV_URL`) | CSV(https://gist.githubusercontent.com/yesoreyeram/64a46b02f0bf87cb527d6270dd84ea47/raw/f4d021529650be41f594cda73e41a6242fb2ea27/sample.csv) | Read the sample.csv and returns to grafana |
| CSV(`YOUR_CSV_URL`, headers:column1:column2) | CSV(https://gist.githubusercontent.com/yesoreyeram/64a46b02f0bf87cb527d6270dd84ea47/raw/85bfe906d5eda20611496854e22ecc57a901bf4c/sample-without-header.csv, headers:Country Name:city Name) | If the csv file doesn't contain headers, provide the headers as option. You can specify n number of columns with `:` separated. |

##### Example : 

![image](https://user-images.githubusercontent.com/153843/91738169-ffafd280-eba7-11ea-809d-07e7466fd5a6.png)

More examples can be found [here](https://github.com/yesoreyeram/grafana-utils/issues/1#issuecomment-683855660)

## Local Installation

### Pre-Requisites

- Deno 1.x or higher

### Running the server

There are couple of ways you can start the server

1. Running directly from url

```
deno run --allow-net https://raw.githubusercontent.com/yesoreyeram/grafana-utils/master/mod.ts --port 8080
```

2. Running from local

```
git clone https://github.com/yesoreyeram/grafana-utils.git
cd grafana-utils
deno run --allow-net mod.ts --port 8080
```

### Configuration

There are few command line flags you can pass while starting the server to customize the server.

| Param         | Description                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------- |
| `--allow-net` | This is security flag required by deno. Otherwise, server will not able to access the port. |
| `--port`      | HTTP port to start the server. If not provided, server will try to start at port 8080       |


## Notes

Timeseries data are set for auto granularity to stop abuse of the platform.

- More than 13 months range -> 1 week granularity;
- Less than 13 months range -> 1 day granularity;
- Less than 40 days range -> 1 hour granularity;
- Less than 2 days range -> 1 minute granularity;

## License

Grafana utils is licensed under the [Apache 2.0 License](./LICENSE).