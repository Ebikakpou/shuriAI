const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    // 1. Snatch the token from the request header metadata block
    const authHeader = req.header("Authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No security token provided. Authorization denied." });
    }

    try {
        // 2. Extract token characters directly following the "Bearer " keyword phrase
        const token = authHeader.split(" ")[1];
        
        // 3. Authenticate cryptographic matching keys
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Bind the unpacked database user identification tag straight to the core request body
        req.user = decodedPayload;
        
        next(); // Exit code block interceptors smoothly into the route pipeline
    } catch (error) {
        res.status(401).json({ msg: "Token validation signature has failed verification keys." });
    }
};