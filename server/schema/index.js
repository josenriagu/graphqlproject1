const graphql = require('graphql');
const books = require('../dummydata');

// step 1: grab the required properties from the graphql package
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;


// step 2: define the object types
const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () => ({
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
   })
})

// step 3: define the root query which shows how we can initially jump into the graph
const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
      book: {
         type: BookType,
         args: { id: { type: GraphQLString } },
         resolve(parent, args) {
            // code to get data from db / other source
         }
      }
   }
})

module.exports = new GraphQLSchema({
   query: RootQuery
})