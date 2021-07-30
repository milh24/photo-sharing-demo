import { Post } from "models/post";
import React from "react";

type PostContextType = {
  list: Post[];
  loading: boolean;
  create: (data: { caption: string; photo: File }) => Promise<void>;
  allLoaded: boolean;
  loadMore: () => Promise<void>;
};

const PostContext = React.createContext<PostContextType>({
  list: [],
  loading: false,
  create: async () => {},
  allLoaded: false,
  loadMore: async () => {},
});

export default PostContext;
