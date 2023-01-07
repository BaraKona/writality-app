import { FC } from "react";
import { Loading } from "../../Loading";
import { useAuthContext } from "../../../contexts/AuthContext";
import { getUser } from "../../../api/user";

export const CollaboratorsList: FC<{ collaborators: any }> = ({
  collaborators,
}) => {
  const { users } = useAuthContext();
  const collaboratorsExist = () => {
    if (collaborators) {
      return collaborators.map((collaborator: any) => {
        const user = users?.find((user: any) => user.uid === collaborator.user);
        return <p> O {user?.name}</p>;
      });
    } else {
      return <div>No collaborators</div>;
    }
  };
  return (
    <div>
      <h2 className="font-bold"> Project Collaborators: </h2>
      <div className=" text-purple-300 my-2">{collaboratorsExist()}</div>
      <hr className="border-stone-700 mb-6" />
    </div>
  );
};
