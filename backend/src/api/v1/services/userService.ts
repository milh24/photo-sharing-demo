import { User } from "../../../models/user";
import UserRepository from "../repositories/userRepository";

export default class UserService {
  static async get(attributes: { id: string }): Promise<User> {
    const { id } = attributes;
    return UserRepository.get({ id: id });
  }

  static async register(attributes: {
    name: string;
    password: string;
  }): Promise<User> {
    return UserRepository.create(attributes);
  }
}
