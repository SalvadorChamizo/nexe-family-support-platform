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

import { 
  registerSchema,
  usernameChangerSchema,
  emailChangerSchema,
  passwordChangerControllerSchema,
  passwordChangerSchema,
  getAllUsersSchema,
  userGetterByIdSchema,
  userGetterByEmailSchema,
  removeUserSchema,
  getCurrentUserSchema,
  passwordControlSchema
} from "../schemas/userSchemas";

export default async (fastify: FastifyInstance) => {
    fastify.post("/register", { schema: registerSchema, handler: registerController });
    fastify.get("/me", {schema: getCurrentUserSchema, handler: getCurrentUserController});
    fastify.post("/changeEmail", {schema: emailChangerSchema, handler: emailChanger});
    fastify.post("/checkPassword", {schema: passwordControlSchema, handler: passwordControl});
    fastify.post("/changePassword", {schema: passwordChangerSchema, handler: passwordChanger});
    fastify.post("/changePasswordBackend", {schema: passwordChangerControllerSchema, handler: passwordChangerController});
    fastify.post("/getUserById", {schema: userGetterByIdSchema, handler: userGetterById});
    fastify.post("/getUserByEmail", {schema: userGetterByEmailSchema, handler: userGetterByEmail});
    fastify.delete("/removeUsers", {schema: removeUserSchema, handler: removeUser});
};