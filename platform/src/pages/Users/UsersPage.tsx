import { usePublicUsers } from "../../hooks/user/usePublicUsers";
import { IconUsersGroup } from "@tabler/icons-react";
import { IUser } from "../../interfaces/IUser";
import { BannerImage } from "../../components/BannerImage";
import { Title } from "../../components/Title";
import { UserCard } from "../../components/user/UserCard";
import { Loading } from "../../components/Loading";
import { Skeleton } from "@mantine/core";
export const UsersPage = () => {
  const { data: users, isLoading } = usePublicUsers();

  return (
    <section className="overflow-y-auto rounded-lg bg-base dark:bg-baseDark">
      <BannerImage
        image="https://images.unsplash.com/photo-1544604860-206456f08229"
        alt="Post banner"
        styling="!object-center"
      />
      <div className="mx-auto max-w-screen-xl">
        <Title>
          <div className="flex gap-2">
            <IconUsersGroup size={40} className="dark:text-lime-600" />
            Users
          </div>
        </Title>
        {isLoading ? (
          <div className="flex flex-wrap gap-2 pb-6">
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} height={400} width={314} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 pb-6">
            {users?.map((user: IUser, index: number) => (
              <UserCard user={user} key={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
