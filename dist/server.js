"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const addressRoutes_1 = __importDefault(require("./routes/addressRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const express_2 = __importDefault(require("./config/express"));
// Load environment variables
dotenv_1.default.config();
// Initialize Express application
const app = (0, express_2.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API Routes
app.use('/users', userRoutes_1.default);
app.use('/addresses', addressRoutes_1.default);
app.use('/posts', postRoutes_1.default);
// Error Handling Middleware
app.use((err, req, res, next) => {
    (0, errorHandler_1.errorHandler)(err, req, res, next);
});
// Graceful Shutdown
process.on('SIGINT', () => {
    console.log('Server shutting down...');
    process.exit();
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    process.exit(1);
});
// Run Database Migrations
if (process.env.NODE_ENV !== 'test') {
    database_1.default.migrate.latest()
        .then(() => console.log("✅ Migrations Applied Successfully"))
        .catch((err) => console.error("Migration Failed:", err));
    // Server Setup
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
    });
}
;
exports.default = app;
