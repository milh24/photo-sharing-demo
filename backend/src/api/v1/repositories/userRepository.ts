import * as admin from "firebase-admin";
import { ErrorCode } from "../../../constants/errorCode";
import HttpException from "../../../exceptions/httpException";
import { User } from "../../../models/user";

export default class UserRepository {
  static collection = "user";

  static async get(attributes: { id: string }): Promise<User> {
    const { id } = attributes;
    const data = await admin
      .firestore()
      .collection(this.collection)
      .doc(id)
      .get();
    if (!data.exists) {
      throw new HttpException(400, ErrorCode.U0000);
    }
    return {
      id: data.ref.id,
      ...data.data(),
    } as User;
  }

  static async create(attributes: {
    name: string;
    password: string;
  }): Promise<User> {
    const { name, password } = attributes;
    const data = await admin.auth().createUser({
      email: `${name}@photo-sharing.demo`,
      password: password,
    });
    await admin.firestore().collection(this.collection).doc(data.uid).set({
      name: name,
    });
    return {
      id: data.uid,
      name: name,
    };
  }
}
