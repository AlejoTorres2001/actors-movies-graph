import { CreateGraphInput } from './create-graph.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateGraphInput extends PartialType(CreateGraphInput) {
  id: number;
}
