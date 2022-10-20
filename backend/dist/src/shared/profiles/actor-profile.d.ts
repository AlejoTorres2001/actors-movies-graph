import { Mapper } from '@automapper/core';
import { AutomapperProfile } from '@automapper/nestjs';
export declare class ActorProfile extends AutomapperProfile {
    constructor(mapper: Mapper);
    get profile(): (mapper: any) => void;
}
