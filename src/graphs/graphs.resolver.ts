import { Resolver, Query, Args } from '@nestjs/graphql';
import { GraphsService } from './graphs.service';
import { Graph } from './entities/graph.entity';

@Resolver((of) => Graph)
export class GraphsResolver {
  constructor(private readonly graphsService: GraphsService) {}

  @Query((returns) => Graph)
  async GenerateGraph(
    @Args('actorNameFrom') actorNameFrom: string,
    @Args('actorNameTo') actorNameTo: string,
  ) {
    try {
      return await this.graphsService.GenerateGraph({
        actorNameFrom,
        actorNameTo,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
