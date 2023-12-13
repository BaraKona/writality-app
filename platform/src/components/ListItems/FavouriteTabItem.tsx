import { IconBookmarkPlus } from "@tabler/icons-react";
import { Skeleton } from "@mantine/core";
import { FC } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { TabListItem } from "./TabListItem";
import { useRemoveBookmark } from "../../hooks/user/useRemoveBookmark";
import { useAutoAnimate } from "@formkit/auto-animate/react";
export const FavouriteTabItems: FC<{}> = ({}) => {
  const { currentUser } = useAuthContext();
  const { mutate: removeBookmark } = useRemoveBookmark();
  const navigate = useNavigate();

  const [parent] = useAutoAnimate();

  const bookmarks = currentUser?.bookmarks;

  return (
    <div ref={parent}>
      {!currentUser ? (
        <>
          <Skeleton height={27} width={160} radius="md" mb={3} />
          <Skeleton height={27} width={160} radius="md" mb={3} />
          <Skeleton height={27} width={160} radius="md" mb={3} />
        </>
      ) : (
        <div ref={parent} className="flex flex-col gap-1">
          {bookmarks?.map((bookmark: any, index: number) => {
            return (
              <TabListItem
                key={index}
                type={bookmark.tabType}
                url={bookmark.url}
                name={bookmark.name || "Untitled"}
                onClick={() => navigate(bookmark.url)}
                removeFavourite={() => removeBookmark(bookmark.url)}
              />
            );
          })}
        </div>
      )}
      {currentUser && currentUser?.bookmarks?.length === 0 && (
        <div className="text-center text-xs font-normal text-blueTextLight">
          You have no favourites. Click on the heart icon to add a favourite.
          <IconBookmarkPlus size={16} className="mx-auto mt-2" />
        </div>
      )}
    </div>
  );
};
