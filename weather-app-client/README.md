
# 🌤️ weather app - client 

A modern, responsive weather application built with React, featuring a clean and professional design.

## 📸 Preview

### Desktop View
- Two-column layout with search on the left and weather display on the right
- Subtle animations and interactive hover effects

### Mobile View  
- Fully responsive design adapting to all screen sizes
- Optimized user interface for mobile and tablet

## ✨ Key Features

- 🔍 **Fast Search** – City search with Enter key support  
- 🌡️ **Detailed Information** – Temperature, humidity, wind, precipitation  
- ⏰ **Hourly Forecast** – Temperatures for the upcoming hours  
- 📍 **Accurate Location** – Geographic coordinates  
- 📱 **Responsive** – Perfectly functional on all devices  
- 🎨 **Modern Design** – Clean and elegant interface  

## 🛠️ Technologies

- **React** – Advanced JavaScript library  
- **Axios** – For HTTP requests  
- **CSS3** – Advanced responsive styling  
- **Heebo Font** – Professional Hebrew font  

## 📁 Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx      # Main search component  
│   └── WeatherCard.jsx    # Weather information display  
├── api/
│   └── weatherService.js  # API service for weather requests  
├── styles/
│   ├── searchBar.css      # Search component styling  
│   ├── weatherCard.css    # Weather card styling  
│   └── App.css            # General styles  
├── App.jsx                # Main component  
└── main.jsx               # App entry point  
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)  
- npm or yarn  

### Installation
```bash
# Clone the repo
git clone [repository-url]
cd weather-app-client

# Install dependencies
npm install

# Run local dev server
npm run dev
```

### Server Setup
Make sure the server is running at `http://localhost:8080`

## 📱 Responsive Support

### Breakpoints:
- **Desktop**: above 768px – two-column layout  
- **Tablet**: 470px to 768px – tablet-adapted view  
- **Mobile**: below 470px – full vertical layout  

## 🎨 Design Guide

### Main Colors:
- **Primary**: `#046B3B` (dark green)  
- **Secondary**: `#27737D` (teal blue)  
- **Background**: `#F1F1F1` (light gray)  
- **Text**: `#707070` (dark gray)  

### Font:
- **Heebo** – clean and professional Hebrew font  

## 📋 Usage

1. **Enter a city name** in the search field  
2. **Click "Check"** or press Enter  
3. **View detailed weather information**  
4. **Check hourly forecast** at the bottom  

## 🔧 Advanced Features

### Error Handling
- Clear and helpful error messages  
- User input validation  
- Network error handling  

### User Experience
- Smooth animations  
- Immediate visual feedback  
- Intuitive design  

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📦 Production Build

```bash
# Build for production
npm run build

# Preview build
npm run preview
```

## 🎓 About the Project

This project was developed as part of a practicum course, demonstrating skills in:  
- **React Development** – building components and state management  
- **Responsive Design** – adapting layouts for all devices  
- **API Integration** – connecting to weather services  
- **Modern CSS** – advanced styling techniques  
- **User Experience** – intuitive UI  

## 🚀 Project Goals

- Showcase full-stack development skills  
- Implement modern UX/UI principles  
- Write clean, maintainable code  
- Develop a fully responsive application  

---

💡 **Note:** This project is for educational purposes and technical demonstration only.
