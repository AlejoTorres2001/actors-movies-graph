"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../shared/decorators");
const guards_1 = require("../shared/guards");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const tokens_dto_1 = require("./dto/tokens.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUpLocal(createUserDto) {
        try {
            return await this.authService.signUpLocal(createUserDto);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('Username already exists');
            }
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async signInLocal(loginDTO, res) {
        try {
            const tokens = await this.authService.signInLocal(loginDTO);
            res.cookie('refresh_token', tokens.refresh_token, {
                httpOnly: true,
                sameSite: 'strict',
                secure: true,
                domain: process.env.NODE_ENV === 'production'
                    ? process.env.PROD_DOMAIN
                    : process.env.DEV_DOMAIN,
                maxAge: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION),
            });
            return { access_token: tokens.access_token };
        }
        catch (error) {
            throw error;
        }
    }
    async logout(userId, res) {
        try {
            await this.authService.logout(userId);
            res.clearCookie('refresh_token', { httpOnly: true });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async refreshTokens(userId, refreshToken, res) {
        try {
            const tokens = await this.authService.refreshTokens(userId, refreshToken);
            res.cookie('refresh_token', tokens.refresh_token, {
                httpOnly: true,
                sameSite: 'strict',
                secure: true,
                domain: process.env.NODE_ENV === 'production'
                    ? process.env.PROD_DOMAIN
                    : process.env.DEV_DOMAIN,
                maxAge: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION),
            });
            return { access_token: tokens.access_token };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('local/signup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUpLocal", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('local/signin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signInLocal", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            description: 'Bearer access_token',
        },
    ]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_1.GetCurrentUser)('id')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.UseGuards)(guards_1.RefreshTokenGuard),
    (0, common_1.Post)('refresh'),
    (0, swagger_1.ApiOkResponse)({ type: tokens_dto_1.Tokens }),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            description: 'Bearer refresh_token',
        },
    ]),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_1.GetCurrentUser)('id')),
    __param(1, (0, decorators_1.GetCurrentUser)('refreshToken')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokens", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map