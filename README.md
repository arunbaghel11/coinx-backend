# README.md

# Cryptocurrency Price Tracker

This project is a cryptocurrency tracker that fetches and stores cryptocurrency data using the CoinGecko API. It provides endpoints to retrieve the latest cryptocurrency statistics and calculate the standard deviation of price changes.

## Project Structure

```
crypto_price_tracker
├── models
│   └── crypto.js          # Mongoose schema for cryptocurrency data
├── routes
│   ├── stats.js          # Route for fetching cryptocurrency stats
│   └── deviation.js      # Route for calculating price deviation
├── app.js                # Main entry point of the application
├── package.json          # Project metadata and dependencies
├── .env                  # Environment variables
├── .gitignore            # Files to be ignored by Git
└── README.md             # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd crypto_price_tracker
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```
   MONGO_URI=your_mongodb_connection_string_here
   PORT=3000
   ```

4. **Start the application:**
   ```
   npm start
   ```

## Usage

- **Fetch Cryptocurrency Stats:**
  - Endpoint: `GET /api/stats?coin=<coin_name>`
  - Example: `GET /api/stats?coin=bitcoin`
  - Returns the latest price, market cap, and 24-hour change for the specified coin.

- **Calculate Price Deviation:**
  - Endpoint: `GET /api/deviation?coin=<coin_name>`
  - Example: `GET /api/deviation?coin=bitcoin`
  - Returns the standard deviation of the last 100 price records for the specified coin.

## Cron Job

The application includes a cron job that runs every two hours to fetch the latest cryptocurrency data from the CoinGecko API and store it in the MongoDB database.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.