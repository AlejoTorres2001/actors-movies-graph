import { Module } from '@nestjs/common';
import { GraphsService } from './graphs.service';
import { GraphsResolver } from './graphs.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), './src/graphs/schema.gql'),
      sortSchema: true,
    }),
  ],
  providers: [GraphsResolver, GraphsService],
})
export class GraphsModule {}
