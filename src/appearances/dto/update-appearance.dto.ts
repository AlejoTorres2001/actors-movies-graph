import { PartialType } from '@nestjs/swagger';
import { CreateAppearanceDto } from './create-appearance.dto';

export class UpdateAppearanceDto extends PartialType(CreateAppearanceDto) {}
