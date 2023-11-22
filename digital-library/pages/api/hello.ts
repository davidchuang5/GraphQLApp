import { ApolloServer } from 'apollo-server-micro';
import 'reflect-metadata';
import type { NextApiRequest, NextApiResponse } from 'next';
import { buildSchema, Resolver, Query, Arg, ObjectType } from 'type-graphql';

const server = new ApolloServer({});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await startServer;
  await server.createHandler({ path: '/api/graphql' })(req, res);
}
