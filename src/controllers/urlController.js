const urlService = require('../services/urlService');

exports.createShortUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;
        
        if (!longUrl) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const shortCode = await urlService.shortenUrl(longUrl);
        const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

        res.status(201).json({
            success: true,
            shortCode,
            shortUrl
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.redirectUrl = async (req, res) => {
    try {
        const { code } = req.params;
        const result = await urlService.getOriginalUrl(code);

        if (!result) {
            return res.status(404).json({ error: 'URL not found' });
        }

        // Loglama: Verinin nereden geldiğini konsola bas (Redis vs DB farkını görmek için)
        console.log(`[Redirect] Code: ${code} | Source: ${result.source.toUpperCase()}`);

        return res.redirect(result.url);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};