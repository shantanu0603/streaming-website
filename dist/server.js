"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
// CORS configuration
const corsOptions = {
    origin: frontendUrl,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};
// Enable CORS with configuration
app.use((0, cors_1.default)(corsOptions));
// Serve static files from the public directory with specific options
app.use('/static', express_1.default.static('public', {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.mp4') || filePath.endsWith('.mkv')) {
            res.set('Accept-Ranges', 'bytes');
        }
    }
}));
// Video streaming endpoint
app.get('/videos/:filename', (req, res) => {
    try {
        const filename = decodeURIComponent(req.params.filename);
        const videoPath = path_1.default.join(process.cwd(), 'public', 'videos', filename);
        console.log('Request received for video:', filename);
        console.log('Full video path:', videoPath);
        // Check if file exists
        if (!fs_1.default.existsSync(videoPath)) {
            console.error('Video file not found:', videoPath);
            return res.status(404).json({ error: 'Video not found', path: videoPath });
        }
        // Get file stats
        const stat = fs_1.default.statSync(videoPath);
        const fileSize = stat.size;
        const range = req.headers.range;
        // Determine content type based on file extension
        const ext = path_1.default.extname(filename).toLowerCase();
        const contentType = ext === '.mkv' ? 'video/x-matroska' : 'video/mp4';
        console.log('File details:', {
            size: fileSize,
            type: contentType,
            range: range || 'none'
        });
        // Handle range requests
        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = (end - start) + 1;
            console.log('Streaming range:', { start, end, chunksize });
            if (start >= fileSize) {
                res.status(416).send('Requested range not satisfiable');
                return;
            }
            const stream = fs_1.default.createReadStream(videoPath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': contentType,
            };
            res.writeHead(206, head);
            stream.on('error', (error) => {
                console.error('Stream error:', error);
                if (!res.headersSent) {
                    res.status(500).json({ error: 'Error streaming video' });
                }
                res.end();
            });
            stream.pipe(res);
        }
        else {
            // Handle non-range requests
            console.log('Streaming entire file');
            const head = {
                'Content-Length': fileSize,
                'Content-Type': contentType,
                'Accept-Ranges': 'bytes'
            };
            res.writeHead(200, head);
            const stream = fs_1.default.createReadStream(videoPath);
            stream.on('error', (error) => {
                console.error('Stream error:', error);
                if (!res.headersSent) {
                    res.status(500).json({ error: 'Error streaming video' });
                }
                res.end();
            });
            stream.pipe(res);
        }
    }
    catch (error) {
        console.error('Server error:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
        else {
            res.status(500).json({ error: 'Internal Server Error', details: 'Unknown error occurred' });
        }
    }
});
// Test endpoint
app.get('/test', (req, res) => {
    res.json({
        status: 'Server is running',
        environment: process.env.NODE_ENV,
    });
});
// List videos endpoint
app.get('/videos', (req, res) => {
    try {
        const videosPath = path_1.default.join(process.cwd(), 'public', 'videos');
        console.log('Listing videos from:', videosPath);
        if (!fs_1.default.existsSync(videosPath)) {
            console.error('Videos directory not found:', videosPath);
            return res.status(404).json({ error: 'Videos directory not found', path: videosPath });
        }
        const files = fs_1.default.readdirSync(videosPath);
        console.log('Found videos:', files);
        // Return more detailed information about each video
        const videosInfo = files.map(file => ({
            filename: file,
            path: `/videos/${encodeURIComponent(file)}`,
            size: fs_1.default.statSync(path_1.default.join(videosPath, file)).size,
            type: path_1.default.extname(file).toLowerCase() === '.mkv' ? 'video/x-matroska' : 'video/mp4'
        }));
        res.json(videosInfo);
    }
    catch (error) {
        console.error('Error listing videos:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: 'Error listing videos', details: error.message });
        }
        else {
            res.status(500).json({ error: 'Error listing videos', details: 'Unknown error occurred' });
        }
    }
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
});
// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Frontend URL:', frontendUrl);
});
