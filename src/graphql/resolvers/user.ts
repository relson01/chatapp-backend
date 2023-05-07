import { Prisma } from "@prisma/client";
import {
  CreateConversationResponse,
  GraphQLContext,
  UserResponse,
} from "../../types";

const resolvers = {
  Query: {
    // searchUser: async (_: any, args, context: GraphQLContext) => {
    //   const { username, password } = args;
    //   const user = await context.prisma.user.findFirst({
    //     where: {
    //       username: username,
    //       password: password,
    //     },
    //   });
    //   if (user === null) {
    //     return {
    //       success: false,
    //       errorMsg: "Username or Password does not match",
    //     };
    //   }
    //   return { user, success: true, errorMsg: null };
    // },

    findUser: async (
      _: any,
      args,
      context: GraphQLContext
    ): Promise<UserResponse> => {
      const { name } = args;

      try {
        const users = await context.prisma.user.findMany({
          where: {
            name: {
              contains: name,
            },
          },
        });
        return { user: users, success: true, errorMsg: "" };
      } catch (error) {
        console.log("Error ", error);
        // return { error: "Something went wrong" };
      }
    },
  },

  Mutation: {
    createNewConversation: async (
      _: any,
      args,
      context: GraphQLContext
    ): Promise<CreateConversationResponse> => {
      const { firstUserId, secondUserId } = args;

      try {
        const createConversation = await context.prisma.converation.create({
          data: {
            conversationParticipant: {
              createMany: {
                data: [{ userId: firstUserId }, { userId: secondUserId }],
              },
            },
          },
        });
        return {
          success: true,
          errorMsg: "Created conversation successfully",
        };
      } catch (error) {
        console.log("Error occurred while creating new conversation ", error);
        return { success: false, errorMsg: "Failed to create chat" };
      }
    },
  },
  // Subscription: {},
};

export default resolvers;
