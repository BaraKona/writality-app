import { FC } from "react";
export const CollaboratorsList: FC<{ collaborators: any }> = ({
  collaborators,
}) => {
  console.log(collaborators);
  const collaboratorsExist = () => {
    if (collaborators) {
      return collaborators.map((collaborator: any) => {
        return <p>{collaborator.collaborator}</p>;
      });
    } else {
      return <div>No collaborators</div>;
    }
  };
  return (
    <div>
      <h2 className="font-bold"> Project Collaborators: </h2>
      <div className="my-2">{collaboratorsExist()}</div>
      <hr className="border-stone-700 mb-6" />
    </div>
  );
};
