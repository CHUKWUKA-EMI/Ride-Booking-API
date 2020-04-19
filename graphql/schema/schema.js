import { buildSchema } from "graphql";

export default buildSchema(`
     type Routes{
       id: ID!
       direction: String!
       duration: Int!
       vehicles: String!
       cost: Float!
     }
      
     type Bookings{
        id: ID!
        user_id: ID!
     }

     type Users{
       id: ID!
       name: String!
       email: String!
       password: String!
       bookings: [Bookings!]!
       
     }

     type authData{
       user_id: ID!
       token: String!
       tokenExpiration: Int!
     }
     
     input UserInput{
       name: String!
       email: String!
       password: String!
     }

   type RootQuery{
      routes: [Routes!]!
      bookings: [Bookings!]!
      login(email: String, password: String): authData!
   }
   
   type RootMutation{
      createUser(userInput: UserInput): Users
      bookTrip(routeId: ID!):Bookings!
      editBooking(bookingId: ID!): Bookings!
      deleteBooking(bookingId:ID!): Routes!
   }

   schema{
     query: RootQuery
     mutation: RootMutation
   }
`);
