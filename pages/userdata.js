// GetDataPage.js

import { useEffect, useState } from "react";

const UserDataPage = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedUserDetails = window.localStorage.getItem("userDetails");
    const parsedUserDetails = storedUserDetails
      ? JSON.parse(storedUserDetails)
      : null;
    setUserDetails(parsedUserDetails);
  }, []);

  return (
    <div>
      <h1>User Data Page</h1>
      <div>User Details:</div>
      {userDetails ? (
        <>
          <ul>
            <li>First Name: {userDetails.user.firstName}</li>
            <li>Last Name: {userDetails.user.lastName}</li>
            <li>Email: {userDetails.user.email}</li>

            {/* Other user details */}
          </ul>
          <img src={userDetails.user.profilePicture} />
        </>
      ) : (
        <div>No user details found.</div>
      )}
    </div>
  );
};

export default UserDataPage;
