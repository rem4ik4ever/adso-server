import { graphql, GraphQLSchema } from "graphql";
import { createSchema } from "../utils/createSchema";
import Maybe from "graphql/tsutils/Maybe";

interface Options {
  source: string;
  variableValues?: Maybe<{ [key: string]: any }>;
  accessToken?: string;
  customHeaders?: Maybe<{ [key: string]: any }>;
  cookies?: Maybe<{ [key: string]: any }>;
}

let schema: GraphQLSchema;

export const gCall = async ({
  source,
  variableValues,
  accessToken,
  customHeaders,
  cookies
}: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  let headers: any = {};
  if (accessToken) {
    headers.authorization = `Bearer ${accessToken}`;
  }
  if (customHeaders) {
    headers = customHeaders;
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        headers,
        cookies
      },
      res: {
        clearCookie: jest.fn()
      }
    }
  });
};
