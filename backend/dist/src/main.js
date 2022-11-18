"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const express_1 = require("express");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.enableCors({
        origin: process.env.NODE_ENV === 'production'
            ? process.env.PROD_DOMAIN
            : [
                `http://${process.env.DEV_DOMAIN}:4200`,
                `http://${process.env.DEV_DOMAIN}:3000`,
            ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With,  Origin, Access-Control-Request-Method, Access-Control-Request-Headers',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Nest API')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('apidoc', app, document);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map