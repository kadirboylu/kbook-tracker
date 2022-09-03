import React from "react";
import { useSelector } from "react-redux";

const User = () => {
  const user = useSelector((store) => store.auth.user);

  return (
    <div className="md:ml-0 md:mb-0 mb-4 ml-4 flex items-center">
      {user?.photoURL && (
        <img className="max-h-[50px] rounded-full" src={user.photoURL} />
      )}
      <p className="md:ml-2  md:mr-2 ml-4 text-lg">{user.displayName}</p>
    </div>
  );
};

export default User;
