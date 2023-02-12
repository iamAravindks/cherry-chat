import { useSelector } from "react-redux";
const SelectMembers = ({
  selectedMembers,
  setSelectedMembers,
  selectMembersID,
  setSelectMembersID,
}) => {
  const { members } = useSelector((state) => state.message);
  const user = useSelector((state) => state.user);

  const handleMemberSelection = (member,name) => {
    const isMemberExist = selectedMembers.filter((m) => m._id === member);
    console.log(isMemberExist);
    if (isMemberExist.length) {
      setSelectedMembers((prev) => prev.filter((m) => m._id !== member));
      setSelectMembersID((prev) => prev.filter((id) => id !== member));
    } else {
      setSelectedMembers([
        ...selectedMembers,
        { _id: member, adminAccess: false,name },
      ]);
      setSelectMembersID([...selectMembersID, member]);
    }
  };

  return (
    <div className="flex flex-col w-full m-2">
      <h2 className="text-lg font-medium mb-4 mt-2">Select Members</h2>
      <ul className="flex flex-row flex-wrap gap-4">
        {members.map((member) => {
          if (member._id !== user._id)
            return (
              <li
                key={member._id}
                className={`cursor-pointer p-2 rounded-lg  ${
                  selectMembersID.includes(member._id)
                    ? "bg-secondary"
                    : "bg-primary"
                }`}
                onClick={() => handleMemberSelection(member._id,member.name)}
              >
                {member.name}
              </li>
            );
        })}
      </ul>
    </div>
  );
};

export default SelectMembers;
