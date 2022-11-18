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
exports.UsersService = void 0;
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const read_user_dto_1 = require("./dto/read-user.dto");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(usersRepository, classMapper) {
        this.usersRepository = usersRepository;
        this.classMapper = classMapper;
    }
    async create(createUserDto) {
        const newUser = this.usersRepository.create(createUserDto);
        return this.classMapper.map(await this.usersRepository.save(newUser), user_entity_1.User, read_user_dto_1.ReadUserDto);
    }
    async findAll({ limit, offset, username, }) {
        const foundUser = username
            ? await this.usersRepository.findAll({
                where: { username: (0, typeorm_1.Like)(`%${username}%`) },
                skip: offset,
                take: limit,
                order: {
                    id: 'ASC',
                },
            })
            : await this.usersRepository.findAll({
                skip: offset,
                take: limit,
            });
        return this.classMapper.mapArray(foundUser, user_entity_1.User, read_user_dto_1.ReadUserDto);
    }
    async findOne(id) {
        const foundUser = await this.usersRepository.findOneById(id);
        return this.classMapper.map(foundUser, user_entity_1.User, read_user_dto_1.ReadUserDto);
    }
    async update(id, updateActorDto) {
        const updatedUser = await this.usersRepository.preload(Object.assign({ id: id }, updateActorDto));
        if (!updatedUser) {
            return undefined;
        }
        return this.classMapper.map(await this.usersRepository.save(updatedUser), user_entity_1.User, read_user_dto_1.ReadUserDto);
    }
    async remove(id) {
        const foundUser = await this.usersRepository.findOneById(id);
        if (!foundUser) {
            return undefined;
        }
        return this.classMapper.map(await this.usersRepository.remove(foundUser), user_entity_1.User, read_user_dto_1.ReadUserDto);
    }
    async createMany(users) {
        const newUsers = this.usersRepository.createMany(users);
        return this.classMapper.mapArray(await this.usersRepository.saveMany(newUsers), user_entity_1.User, read_user_dto_1.ReadUserDto);
    }
    async getUserByUserName(username) {
        const foundUser = await this.usersRepository.findByCondition({
            where: { username },
        });
        return foundUser;
    }
    async getUserByEmail(email) {
        const foundUser = await this.usersRepository.findByCondition({
            where: { email },
        });
        return foundUser;
    }
    async getUserById(userId) {
        const foundUser = await this.usersRepository.findOneById(userId);
        return foundUser;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UsersRepositoryInterface')),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object, Object])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map