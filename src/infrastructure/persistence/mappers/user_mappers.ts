import { UserDTO } from "../../../application/dtos/user_dto";
import { User } from "../../../domain/entities/user";

export class UserMappers {
    static toDomain(userDTO: UserDTO): User {
        return new User(userDTO.id, userDTO.name);
    }

    static toDTO(user: User): UserDTO {
        return {
            id: user.getId(),
            name: user.getName()
        };
    }
}