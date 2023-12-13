import { useQuery } from "react-query";
import { getPosts } from "../../api/posts";

export const usePosts = (search: string) => {
  console.log(search);
  return useQuery(["posts", search], () => getPosts(search));
};
