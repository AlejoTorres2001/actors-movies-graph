"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const configuration_1 = require("../config/configuration");
exports.dataSourceOptions = Object.assign(Object.assign({ type: 'postgres' }, (0, configuration_1.default)()), { entities: [__dirname + '/../**/*.entity.{js,ts}'], migrations: ['dist/db/migrations/**.js'], ssl: true, extra: {
        max: 2,
    } });
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map