# 🌤️ weather app - server

A Node.js Express server that provides weather information for cities using WeatherAPI. The server returns current weather data along with temperatures for 5 relevant hours.

## ✨ Features

- **Real-time weather data**
- **Smart hour selection** - 3 hours before current time + current hour + 1 hour after
- **Edge case handling** - Fetches data from previous/next day when needed
- **Advanced input validation**
- **Request logging**

## 🚀 Installation

1. **Clone the project**
   ```bash
   git clone <repository-url>
   cd weather-server
   ```

2. **Install packages**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file:
   ```env
   API_KEY=your_weatherapi_key_here
   PORT=8080
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## 📡 API

### Get weather by city

```http
GET /weather/:city
```

**Example:**
```bash
curl http://localhost:8080/weather/London
```

**Response:**
```json
{
  "data": {
    "location": {
      "name": "London",
      "localtime": "2025-06-15 14:30"
    },
    "current": {
      "temp_c": 18.5,
      "condition": {
        "text": "Partly cloudy"
      }
    }
  },
  "times": [
    {
      "time": "11:00",
      "temp": 16.2
    },
    {
      "time": "12:00", 
      "temp": 17.1
    },
    {
      "time": "13:00",
      "temp": 17.8
    },
    {
      "time": "14:00",
      "temp": 18.5
    },
    {
      "time": "15:00",
      "temp": 19.2
    }
  ]
}
```

## 🏗️ Project Structure

```
weather-server/
├── config/api.js          # API configuration and functions
├── controllers/           # Route controllers
├── middleware/           # Validation and logging
├── routes/               # API routes
├── server.js             # Main server file
└── .env                  # Environment variables
```

## 🔧 Configuration

**Environment Variables:**
- `API_KEY` - WeatherAPI key (required)
- `PORT` - Server port (default: 8080)

**Validation Rules:**
- City name minimum 2 characters
- Only letters, spaces, and hyphens allowed
- No special characters

## 🕐 Time Logic

The server intelligently handles time selection:
- Detects current hour from local location time
- Returns 5 hours: 3 before + current + 1 after
- **Edge cases:**
  - Hours 00:00-02:59: Fetches from previous day
  - Hour 23:00: Fetches from next day

## 🛠️ Testing

```bash
# Test valid city
curl http://localhost:8080/weather/London

# Test invalid city
curl http://localhost:8080/weather/123
```

---
