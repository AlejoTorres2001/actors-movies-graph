"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAbstractRepository = void 0;
class BaseAbstractRepository {
    constructor(entity) {
        this.entity = entity;
    }
    async save(data) {
        return await this.entity.save(data);
    }
    async saveMany(data) {
        return await this.entity.save(data);
    }
    create(data) {
        return this.entity.create(data);
    }
    createMany(data) {
        return this.entity.create(data);
    }
    async findOneById(id) {
        const options = {
            id: id,
        };
        return await this.entity.findOneBy(options);
    }
    async findByCondition(filterCondition) {
        return await this.entity.findOne(filterCondition);
    }
    async findWithRelations(relations) {
        return await this.entity.find(relations);
    }
    async findAll(options) {
        return await this.entity.find(options);
    }
    async remove(data) {
        return await this.entity.remove(data);
    }
    async preload(entityLike) {
        return await this.entity.preload(entityLike);
    }
}
exports.BaseAbstractRepository = BaseAbstractRepository;
//# sourceMappingURL=base.abstract.repository.js.map