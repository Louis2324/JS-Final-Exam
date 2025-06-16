const parser = (req, res, next) => {
    let rawData = '';
    req.on('data', chunk => rawData += chunk);
    req.on('end', () => {
        try {
            req.body = JSON.parse(rawData);
            next();
        } catch (err) {
            res.status(400).json({ error: "Invalid JSON data" });
        }
    });
};
module.exports = {parser};