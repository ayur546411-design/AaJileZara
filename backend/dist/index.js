"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_js_1 = require("./middleware/auth.js");
const auth_routes_js_1 = __importDefault(require("./routes/auth.routes.js"));
const categories_routes_js_1 = __importDefault(require("./routes/categories.routes.js"));
const packages_routes_js_1 = __importDefault(require("./routes/packages.routes.js"));
const advisors_routes_js_1 = __importDefault(require("./routes/advisors.routes.js"));
const bookings_routes_js_1 = __importDefault(require("./routes/bookings.routes.js"));
const advisoryRequests_routes_js_1 = __importDefault(require("./routes/advisoryRequests.routes.js"));
const daily_routes_js_1 = __importDefault(require("./routes/daily.routes.js"));
const recordings_routes_js_1 = __importDefault(require("./routes/recordings.routes.js"));
const costs_routes_js_1 = __importDefault(require("./routes/costs.routes.js"));
const intakeForms_routes_js_1 = __importDefault(require("./routes/intakeForms.routes.js"));
const admin_routes_js_1 = __importDefault(require("./routes/admin.routes.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Security & Middlewares
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
}));
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Global Authentication parser
app.use(auth_js_1.authMiddleware);
// Health check endpoint
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'Ji Le Zara Backend API',
        brand: 'Ji Le Zara — Soch se Shanti Tak',
        founder: 'Dr. Nilambari Dave, PhD',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        azureConfig: {
            storageReady: true,
            dailyVideoReady: true,
            database: 'Azure PostgreSQL / SQLite local',
        },
    });
});
// Mount Routes
app.use('/api/auth', auth_routes_js_1.default);
app.use('/api/categories', categories_routes_js_1.default);
app.use('/api/packages', packages_routes_js_1.default);
app.use('/api/advisors', advisors_routes_js_1.default);
app.use('/api/bookings', bookings_routes_js_1.default);
app.use('/api/advisory-requests', advisoryRequests_routes_js_1.default);
app.use('/api/daily', daily_routes_js_1.default);
app.use('/api/recordings', recordings_routes_js_1.default);
app.use('/api/costs', costs_routes_js_1.default);
app.use('/api/intake-forms', intakeForms_routes_js_1.default);
app.use('/api/admin', admin_routes_js_1.default);
// Error handling middleware
app.use((err, _req, res, _next) => {
    console.error('Unhandled API Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🌸 Ji Le Zara Social Guidance API running on port ${PORT}`);
    console.log(`🌸 Tagline: "Pause · Reflect · Realign · Live Fully"`);
    console.log(`🌸 Philosophy: "Soch se Shanti Tak"`);
    console.log(`=======================================================`);
});
exports.default = app;
