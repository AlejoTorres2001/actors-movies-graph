import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GraphsService } from './graphs.service';
import { CreateGraphInput } from './dto/create-graph.input';
import { UpdateGraphInput } from './dto/update-graph.input';
import { Graph } from './entities/graph.entity';

@Resolver((of) => Graph)
export class GraphsResolver {
  constructor(private readonly graphsService: GraphsService) {}

  @Query((returns) => Graph)
  findOne(@Args('id') id: number) {
    return this.graphsService.findOne(id);
  }
}
