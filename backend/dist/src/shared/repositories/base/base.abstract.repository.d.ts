import { BaseInterfaceRepository } from './base.interface.repository';
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
interface HasId {
    id: number | string;
}
export declare abstract class BaseAbstractRepository<T extends HasId> implements BaseInterfaceRepository<T> {
    private entity;
    protected constructor(entity: Repository<T>);
    save(data: T): Promise<T>;
    saveMany(data: T[]): Promise<T[]>;
    create(data: DeepPartial<T>): T;
    createMany(data: DeepPartial<T>[]): T[];
    findOneById(id: any): Promise<T>;
    findByCondition(filterCondition: FindOneOptions<T>): Promise<T>;
    findWithRelations(relations: FindManyOptions<T>): Promise<T[]>;
    findAll(options?: FindManyOptions<T>): Promise<T[]>;
    remove(data: T): Promise<T>;
    preload(entityLike: DeepPartial<T>): Promise<T>;
}
export {};
