import { UserMappers } from "./user_mappers";
import { User } from "../../../domain/entities/user";

describe("Testes para user mappers",()=>{
    it("deve converter UserDTO em domain user",()=>{
        const userDTO = { id: "1", name: "John Doe" };
        const user = UserMappers.toDomain(userDTO);
        expect(user.getId()).toBe("1");
        expect(user.getName()).toBe("John Doe");
    });

    it("deve converter domain user em UserDTO",()=>{
        const user = new User("1", "John Doe");
        const userDTO = UserMappers.toDTO(user);
        expect(userDTO.id).toBe("1");
        expect(userDTO.name).toBe("John Doe");
    });
});