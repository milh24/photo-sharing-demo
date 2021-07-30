import { Post } from "../../../models/post";
import PostRepository from "../repositories/postRepository";

export default class PostService {
  static async getAll(attributes: {
    authorId?: string;
    page?: number;
  }): Promise<Post[]> {
    return PostRepository.getAll(attributes);
  }

  static async create(attributes: {
    photoUrl: string;
    caption: string;
    authorId: string;
    authorName: string;
  }): Promise<Post> {
    return PostRepository.create(attributes);
  }
}
