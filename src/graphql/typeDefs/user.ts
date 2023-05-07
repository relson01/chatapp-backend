const typeDef = `#graphql
  type User {
    id: String
    name: String
    username: String
    email: String
    image: String
  }

   type UserResponse{
    user: [User] 
    success: Boolean
    errorMsg: String
  }

  type CreateConversationResponse{
    success: Boolean
    errorMsg: String
  }

  type Query {
    findUser(name: String): UserResponse
  }
  type Mutation {
    createNewConversation(firstUserId: String, secondUserId: String): CreateConversationResponse
  }


`;

export default typeDef;
