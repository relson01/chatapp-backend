import { PrismaClient } from "@prisma/client";

export interface GraphQLContext {
  prisma: PrismaClient;
}

type User = {
  id: String;
  name: String;
  username: String;
  email: String;
  image: String;
};
export type UserResponse = {
  user: User[];
  success: Boolean;
  errorMsg: String;
};

//Conversation Type
export type CreateConversationResponse = {
  success: Boolean;
  errorMsg: String;
};
