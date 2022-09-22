import { Injectable } from '@nestjs/common';
import { CreateGraphInput } from './dto/create-graph.input';
@Injectable()
export class GraphsService {
  GenerateGraph(createGraphInput: CreateGraphInput) {
    return `This action returns a #${createGraphInput} graph`;
  }
}
