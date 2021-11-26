# Labforward - Home Assignment - Task 2

API to find the optimal Date and weather conditions given a Date-Range and a set of locations.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

`NODE_ENV`

`HOST`

`PORT`

`GOOGLE_API_KEY`

Your Google API account needs to have geocoding activated

## Run Locally

Clone the project

```bash
  git clone https://github.com/Shisuki/labforward-task-2
```

Go to the project directory

```bash
  cd labforward-task-2
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Usage/Examples

```curl
curl --location -g --request GET 'localhost:3000/party_plan?from=2021-06-05T14:48:00.000Z&to=2021-06-06T14:48:00.000Z&locations[]=Berlin, Germany&locations[]=Frankfurt, Germany'
```

## API Reference

#### Get party plan

```http
  GET /party_plan
```

_Request_
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `from` | `string` | **Required**. ISO 8601 compatible date |
| `to` | `string` | ISO 8601 compatible date |
| `locations` | `string[]` | **Required**. array of human readable strings of the desired locations, e.g. “Treptower Park, Berlin” |

_Response_
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `date` | `string` | ISO 8601 compatible date, which signify the chosen optimal date, must be between the range of “from” and “to” |
| `location` | `string` | the chosen optimal location |
