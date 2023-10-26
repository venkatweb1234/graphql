import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// types
import { typeDefs } from "./schema";
import _db from "./_db";
// server setup

const resolvers = {
  Query: {
    games() {
      return _db.games;
    },
    game(_: any, args: any) {
      return _db.games.find((game: any) => game.id === args.id);
    },
    reviews() {
      return _db.reviews;
    },
    authors() {
      return _db.authors;
    },
    author(_: any, args: any) {
      return _db.authors.find((author: any) => author.id === args.id);
    },
    review(_: any, args: any) {
      return _db.reviews.find((review: any) => review.id === args.id);
    },
  },
  Mutation: {
    deleteGame(_: any, args: any) {
      _db.games.filter((g: any) => g.id !== args.id);
      return _db.games;
    },
    addGame(_: any, args: any) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000),
      };
      _db.games.push(game);
      return game;
    },
    updateGame(_: any, args: any) {
      _db.games = _db.games.map((g: any) => {
        if (g.id === args.id) {
          return { ...g, ...args.edits };
        }
        return g;
      });
      return _db.games.find((g: any) => g.id === args.id);
    },
  },
  Game: {
    reviews(parent: any) {
      return _db.reviews.filter((r: any) => r.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent: any) {
      return _db.reviews.filter((r: any) => r.author_id === parent.id);
    },
  },
  Review: {
    author(parent: any) {
      return _db.authors.find((a: any) => a.id === parent.author_id);
    },
    game(parent: any) {
      return _db.games.find((g: any) => g.id === parent.game_id);
    },
  },
};

/* */
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server ready at port", 4000);
