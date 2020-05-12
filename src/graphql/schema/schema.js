import { buildSchema } from "graphql";

export default buildSchema(`
     type Routes{
       id: ID!
       direction: String!
       duration: String!
       vehicle: String!
       cost: Float!
     }
      
     type Bookings{
        id: ID!
        user_id: ID!
        trip: String!
        completed:Boolean!
     }

     type Users{
       id: ID!
       name: String!
       email: String!
       password: String!
       
     }

     type authData{
       userId: ID!
       email: String!
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
      completedTrips(completed:Boolean): [Bookings!]!
      login(email: String, password: String): authData!
   }
   
   type RootMutation{
      createUser(userInput: UserInput): Users
      bookTrip(routeId: ID!):Bookings!
      editTrip(bookingId: ID!,completed:Boolean): Bookings!
      deleteTrip(bookingId:ID!): Bookings!
   }

   schema{
     query: RootQuery
     mutation: RootMutation
   }
`);
