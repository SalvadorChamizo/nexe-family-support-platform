import {
  registerController,
  emailChanger,
  userGetterByEmail,
  getCurrentUserController,
  userGetterById,
  passwordControl,
  passwordChanger,
  removeUser,
  passwordChangerController,
} from "../controllers/usersController";

export default async (fastify: FastifyInstance) => {
    fastify.post("/register", registerController );
    fastify.get("/me", getCurrentUserController);
    fastify.post("/changeEmail", emailChanger);
    fastify.post("/checkPassword", passwordControl);
    fastify.post("/changePassword", passwordChanger);
    fastify.post("/changePasswordBackend", passwordChangerController);
    fastify.post("/getUserById", userGetterById);
    fastify.post("/getUserByEmail", userGetterByEmail);
    fastify.delete("/removeUsers", removeUser);
};