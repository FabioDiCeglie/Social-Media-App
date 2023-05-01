import { ApolloServer } from "@apollo/server";
import assert from "assert";
import bcrypt from "bcrypt";
import gql from "graphql-tag";
import { User } from "models/User";
import { resolvers } from "..";
import { typeDefs } from "../../typeDefs";
import { IUser } from "lib/types";

describe("login", () => {
  let server: ApolloServer;

  beforeAll(() => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
      cache: {
        get: async () => undefined,
        set: async () => {},
        delete: async () => {},
      },
    });
  });

  test("should return the current user when user is logged in", async () => {
    jest.spyOn(User, "findOne").mockReturnValueOnce({
      id: "test-id",
      firstName: "test-name",
      password: "test-password",
    } as unknown as any);

    jest
      .spyOn(bcrypt, "compare")
      .mockImplementation(() => Promise.resolve(true));

    const login = gql`
      query {
        login(email: "fabio@gmail.com", password: "test-password") {
          id
          firstName
        }
      }
    `;

    const res = await server.executeOperation(
      { query: login },
      { contextValue: () => {} }
    );

    assert(res.body.kind === "single");
    expect(res.body.singleResult.data).toEqual({
      login: {
        id: "test-id",
        firstName: "test-name",
      },
    });
  });
});
