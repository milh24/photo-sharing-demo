import { StorageKey } from "constants/storageKey";
import { User } from "models/user";
import { auth } from "services/firebase";
import Service from "services/service";

class UserService extends Service {
  get = async (id: string): Promise<User> => {
    const response = await this.api.get<User>(`/v1/user/${id}`);
    return response.data;
  };

  register = async (data: {
    name: string;
    password: string;
  }): Promise<User> => {
    const response = await this.api.post<User>("/v1/register", data);
    await auth.signInWithEmailAndPassword(
      `${data.name}@photo-sharing.demo`,
      data.password
    );
    localStorage.setItem(StorageKey.USER_NAME, data.name);
    return response.data;
  };

  login = async (params: { name: string; password: string }): Promise<User> => {
    const fbUser = await auth.signInWithEmailAndPassword(
      `${params.name}@photo-sharing.demo`,
      params.password
    );
    if (!fbUser || !fbUser.user) {
      throw Error("Login failed");
    }
    localStorage.setItem(StorageKey.USER_NAME, params.name);
    return await userService.get(fbUser.user.uid);
  };
}

const userService = new UserService();
export default userService;
