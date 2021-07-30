import { Post } from "models/post";
import { auth, storage } from "services/firebase";
import Service from "services/service";
import { v4 as uuidv4 } from "uuid";

class PostSerivce extends Service {
  getAll = async (params?: { page?: number }): Promise<Post[]> => {
    const response = await this.api.get<Post[]>("/v1/post", {
      params: params,
    });
    return response.data;
  };

  create = async (data: { caption: string; photo: File }): Promise<Post> => {
    const { caption, photo } = data;
    const imageRef = storage.ref(
      `/user/${auth.currentUser?.uid}/image/${uuidv4()}.${photo.type.replace(
        "image/",
        ""
      )}`
    );
    await imageRef.put(photo);
    const photoUrl = await imageRef.getDownloadURL();
    const response = await this.api.post<Post>("/v1/post", {
      caption: caption,
      photoUrl: photoUrl,
    });
    return response.data;
  };
}

const postService = new PostSerivce();
export default postService;
