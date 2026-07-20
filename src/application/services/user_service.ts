import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user_repository";
import { CreateUserDTO } from "../dtos/create_user_dto";
import { v4 as uuid } from "uuid";
import { UserDTO } from "../dtos/user_dto";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async findUserById(id: string): Promise<UserDTO | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return null;
    }
    return { id: user.getId(), name: user.getName() };
  }
  async createUser(user: CreateUserDTO): Promise<void> {
    
    const userEntity = new User(uuid(),user.name);
   
    await this.userRepository.save(userEntity);
  }
}