import { User } from "../entities/User";
export interface CreateUserDto {
  name: string;
  username: string;
  email: string;
}
export interface UserService {
  create(data: CreateUserDto): Promise<User>;
}
