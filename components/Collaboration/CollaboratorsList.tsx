import { FC } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
export const CollaboratorsList: FC<{ collaborators: any }> = ({
  collaborators,
}) => {
  const { users } = useAuthContext();

  console.log(collaborators, users);
  const collaboratorsExist = () => {
    // if collaborators exist map through users using collaborator.collaborator as user id
    if (collaborators) {
      return collaborators.map((collaborator: any) => {
        const user = users?.find(
          (user: any) => user.uid === collaborator.collaborator
        );
        return <p> O {user?.displayName}</p>;
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
