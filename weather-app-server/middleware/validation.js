// middleware/validation.js
export const validateCity = (req, res, next) => {
    const { city } = req.params;
    
    if (!city || city.trim().length < 2) {
        return res.status(400).json({ error: "Invalid city" });
    }
    
    if (!/^[a-zA-Z\s\-]+$/.test(city)) {
        return res.status(400).json({ error: "City name contains invalid characters" });
    }
    
    // Trim whitespace and set the city parameter
    req.params.city = city.trim();
    
    next(); 
};

export const requestLogger = (req, res, next) => {
    const timestamp = new Date().toLocaleString('he-IL');
    const city = req.params.city || 'unknown';
    console.log(`🌤️  [${timestamp}] Weather request for: ${city}`);
    next();
};



