import { Resolver, Query, Args } from '@nestjs/graphql';
import { AdjacencyList, Graph, Neighbor } from './entities';
import { GraphsService } from './graphs.service';
@Resolver((of) => Graph)
export class GraphsResolver {
  constructor(private readonly graphsService: GraphsService) {}

  @Query((returns) => Graph)
  async FindPaths(
    @Args('actorNameFrom') actorNameFrom: string,
    @Args('actorNameTo') actorNameTo: string,
  ) {
    try {
      return await this.graphsService.FindPaths({
        actorNameFrom,
        actorNameTo,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  @Query((returns) => [AdjacencyList])
  async GenerateGraph() {
    try {
      return await this.graphsService.GenerateGraph();
    } catch (error) {
      throw new Error(error);
    }
  }
}
