const parser = (req, res, next) => {
    if (!["POST", "PUT", "PATCH"].includes(req.method)) {
        return next();
    }

    let rawData = '';

    req.on('data', chunk => {
        rawData += chunk;
    });

    req.on('end', () => {
        if (!rawData) {
            req.body = {};
            return next();
        }

        try {
            req.body = JSON.parse(rawData);
            next();
        } catch (err) {
            res.status(400).json({ error: "Invalid JSON data" });
        }
    });

    req.on('error', (err) => {
        console.error("Request error:", err);
        res.status(400).json({ error: "Error reading request body" });
    });
};

module.exports = { parser };
