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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signInLocal(loginDto) {
        const { email, password } = loginDto;
        const user = await this.usersService.getUserByEmail(email);
        if (!user)
            throw new common_1.ForbiddenException('Invalid credentials');
        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid)
            throw new common_1.ForbiddenException('Invalid credentials');
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        return tokens;
    }
    async signUpLocal(createUserDto) {
        const newUser = await this.usersService.create(createUserDto);
        return newUser;
    }
    async getTokens(userId, email) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({ userId, email }, {
                expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
                secret: process.env.JWT_SECRET,
            }),
            this.jwtService.signAsync({ userId, email }, {
                expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
                secret: process.env.JWT_REFRESH_TOKEN_SECRET,
            }),
        ]);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    async logout(userId) {
        await this.updateRefreshToken(userId, null);
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.usersService.getUserById(userId);
        if (!user || !user.hashRefreshToken)
            throw new common_1.ForbiddenException('Invalid credentials');
        const refreshTokenMatch = await user.validateRefreshToken(refreshToken);
        if (!refreshTokenMatch)
            throw new common_1.ForbiddenException('Invalid credentials');
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        return tokens;
    }
    async updateRefreshToken(userId, refreshToken) {
        const user = await this.usersService.getUserById(userId);
        user.hashedRefreshToken = refreshToken;
        await this.usersService.update(user.id, user);
        return;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UsersServiceInterface')),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map