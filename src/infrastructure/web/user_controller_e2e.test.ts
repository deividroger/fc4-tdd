import express from "express";
import request from "supertest";
import { DataSource } from "typeorm";

import { TypeORMUserRepository } from "../repositories/typeorm_user_repository";
import { UserService } from "../../application/services/user_service";
import { UserEntity } from "../persistence/entities/user_entity";
import { UserController } from "./user_controller";
const app = express();
app.use(express.json());

let dataSource: DataSource;
let userRepository: TypeORMUserRepository;

let userController: UserController;

beforeAll(async () => {
  dataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [UserEntity],
    synchronize: true,
    logging: false,
  });

  await dataSource.initialize();

  userRepository = new TypeORMUserRepository(
    dataSource.getRepository(UserEntity)
  );

  const userService = new UserService(userRepository);

  userController = new UserController(userService);

  app.post("/users", (req, res, next) => {
    userController.createUser(req, res).catch((err) => next(err));
  });

});

afterAll(async () => {
  await dataSource.destroy();
});

describe("UserController E2E", () => {
    it("deve criar um usuário com sucesso", async () => {
        const response = await request(app)
            .post("/users")
            .send({ name: "Test User" });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: "User created successfully" });
    });

    it("deve retornar erro ao criar um usuário sem nome", async () => {
        const response = await request(app)
            .post("/users")
            .send({ name: "" });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: "O nome é obrigatório" });
    });

});
 