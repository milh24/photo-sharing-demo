import { act, renderHook } from "@testing-library/react-hooks";
import postService from "services/postService";
import { usePost } from "./post";

const data = {
  id: "postId",
  authorId: "authorId",
  authorName: "authorName",
  photoUrl: "photoUrl",
  caption: "caption",
  createdAt: new Date().toISOString(),
};

test("should create post", async () => {
  const { result } = renderHook(() => usePost());
  let mockFiles = Object.create({
    type: "image/jpg",
  });
  postService.create = jest.fn().mockResolvedValue(data);
  await act(async () => {
    return result.current
      .create({ caption: data.caption, photo: mockFiles })
      .then(() => expect(result.current.list.length).toBe(1));
  });
});

test("should load more post", async () => {
  const { result } = renderHook(() => usePost());
  postService.getAll = jest.fn().mockResolvedValue([data, data]);
  await act(async () => {
    return result.current
      .loadMore()
      .then(() => expect(result.current.list.length).toBe(2));
  });
  await act(async () => {
    return result.current
      .loadMore()
      .then(() => expect(result.current.list.length).toBe(4));
  });
});
