import { Post } from "models/post";
import { User } from "models/user";
import { useEffect, useState } from "react";
import postService from "services/postService";

export const usePost = (user?: User) => {
  const [list, setList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (user) {
      postService.getAll({ page: 0 }).then((e) => {
        setList(e);
        setAllLoaded(e.length !== 2);
      });
    } else {
      setList([]);
      setAllLoaded(false);
      setPage(0);
    }
  }, [user]);

  const create = (data: { caption: string; photo: File }) => {
    setLoading(true);
    return postService
      .create(data)
      .then((e) => setList([e, ...list]))
      .finally(() => setLoading(false));
  };

  const loadMore = () => {
    if (!loading) {
      setLoading(true);
      return postService
        .getAll({ page: page + 1 })
        .then((e) => {
          setList([...list, ...e]);
          setPage(page + 1);
          setAllLoaded(e.length !== 2);
        })
        .finally(() => setLoading(false));
    } else {
      return Promise.resolve();
    }
  };

  return {
    list,
    create,
    loading,
    loadMore,
    allLoaded,
  } as const;
};
