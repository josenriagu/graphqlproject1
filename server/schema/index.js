const graphql = require('graphql');
const _ = require("lodash");
const Book = require('../models/book');
const Author = require('../models/author');
// const data = require('../dummydata');

// step 1: grab the required properties from the graphql package
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;


// step 2: define the object types
const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      author: {
         type: AuthorType,
         resolve(parent, args) {
            // return _.find(data.authors, { id: parent.authorId })
         }
      }
   })
})

const AuthorType = new GraphQLObjectType({
   name: 'Author',
   fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: {
         type: new GraphQLList(BookType),
         resolve(parent, args) {
            // return _.filter(data.books, { authorId: parent.id })
         }
      }
   })
})

// step 3: define the root query which shows how we can initially jump into the graph
const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
      book: {
         type: BookType,
         args: {
            id: { type: GraphQLID }
         },
         resolve(parent, args) {
            // return _.find(data.books, { id: args.id })
         }
      },
      author: {
         type: AuthorType,
         args: {
            id: { type: GraphQLID }
         },
         resolve(parent, args) {
            // return _.find(data.authors, { id: args.id })
         }
      },
      books: {
         type: new GraphQLList(BookType),
         resolve(parent, args) {
            // return data.books
         }
      },
      authors: {
         type: new GraphQLList(AuthorType),
         resolve(parent, args) {
            // return data.authors
         }
      }

   }
})

const Mutation = new GraphQLObjectType({
   name: 'Mutation',
   fields: {
      addAuthor: {
         type: AuthorType,
         args: {
            name: { type: GraphQLString },
            age: { type: GraphQLInt }
         },
         resolve(parent, args) {
            let author = new Author({
               name: args.name,
               age: args.age
            });
            return author.save();
         }
      }
   }
})

module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation
})

// GraphQLString lets you pass only strings as parameters unlike GraphQLID which is a little more flexible and works even if the parameter is integer or string