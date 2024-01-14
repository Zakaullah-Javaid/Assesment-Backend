"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
require('dotenv').config();
exports.dataSource = new typeorm_1.DataSource({
    migrationsTableName: 'migrations',
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'devbatch',
    database: process.env.DB_NAME || 'test_db',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: false,
});
exports.dataSource.initialize();
//# sourceMappingURL=DataSource.js.map