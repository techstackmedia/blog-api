"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const post_1 = __importDefault(require("./routes/post"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/posts', post_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/users', user_1.default);
const uri = process.env.MONGODB_URI;
mongoose_1.default
    .connect(uri)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((error) => console.error('Error connecting to MongoDB:', error.message));
