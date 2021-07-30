import * as admin from "firebase-admin";
import { Post } from "../../../models/post";

export default class PostRepository {
  static pageSize = 2;
  static collection = "post";

  static async getAll(attributes: {
    page?: number;
    authorId?: string;
  }): Promise<Post[]> {
    const { page = 0, authorId } = attributes;
    const query = authorId
      ? admin
          .firestore()
          .collection(this.collection)
          .where("authorId", "==", authorId)
      : admin.firestore().collection(this.collection);
    const data = await query
      .offset(page * this.pageSize)
      .orderBy("createdAt", "desc")
      .limit(this.pageSize)
      .get();
    return data.docs.map((e) => {
      return { id: e.ref.id, ...e.data() } as Post;
    });
  }

  static async create(attributes: {
    photoUrl: string;
    caption: string;
    authorId: string;
    authorName: string;
  }): Promise<Post> {
    const { photoUrl, caption, authorId, authorName } = attributes;
    const data = await admin.firestore().collection(this.collection).add({
      photoUrl: photoUrl,
      caption: caption,
      authorId: authorId,
      authorName: authorName,
      createdAt: new Date().toISOString(),
    });
    return { id: data.id, ...(await data.get()).data() } as Post;
  }
}
