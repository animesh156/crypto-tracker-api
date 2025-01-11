
# Crypto Data Tracker API

This is a backend service built with Node.js, Express.js, and MongoDB. It fetches cryptocurrency data (price, market cap, 24-hour change) for Bitcoin, Ethereum, and Matic from the CoinGecko API. The data is stored in a MongoDB database and provides endpoints for retrieving the latest data and calculating standard deviations for the last 100 records.

## Features

- **Background job** that fetches cryptocurrency data every 2 hours.

- **API endpoints** to retrieve the latest stats for a coin and calculate the standard deviation of the price over the last 100 records.


- **Rate limiting** implemented to prevent abuse of the API.




                                                  
## Tech Stack


- **Node.js**: JavaScript runtime for the server.

- **Express.js**: Web framework for building the API.

- **MongoDB**: Database to store cryptocurrency data.

- **Node-Cron**: To schedule background job

- **express-rate-limit**: For rate limiting API requests.

- **Axios**: For making HTTP requests to external APIs (CoinGecko).









## Demo

https://calendar-iota-nine.vercel.app/


## Installation


**Prerequisites**

Make sure you have the following installed:

- **Node.js** (version 14 or above)
- **MongoDB** or a MongoDB cluster URI
- **Postman** (or any API testing tool)


**Steps**

Clone the repository:

```bash
git clone https://github.com/animesh156/crypto-tracker-api.git

```

Navigate to the project directory:

```bash
cd crypto-tracker

```

Install the dependencies:

```bash 
npm Install
```

Create a .env file in the root of the project and add the following variables:

```bash

PORT=3000
MONGO_URI=your_mongo_connection_uri


```

Start the server:

``` 

npm run server

```


    
## API Endpoints

  **1. /stats**

Retrieves the latest data for a specified cryptocurrency

- **Request:**
GET /stats?coin=bitcoin

- **Response**

```bash

{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}

```

- **Query Parameters**:
coin (Required): One of bitcoin, matic-network, ethereum.


 **2. /deviation**

Calculates the standard deviation of the price for the last 100 records of a specified cryptocurrency.

- **Request:**
GET /deviation?coin=bitcoin

- **Response**

```bash


 {
  "Deviation": "4082.48"
}



```

- **Query Parameters**:
coin (Required): One of bitcoin, matic-network, ethereum.
## Testing

You can test the API endpoints using Postman or any HTTP client.

- **Example requests:**

1. Get stats for Bitcoin:

- **GET:** http://localhost:3000/stats?coin=bitcoin

2. Get the standard deviation of Bitcoin price:

- **GET:** http://localhost:3000/deviation?coin=bitcoin