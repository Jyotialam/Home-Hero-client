import React, { useEffect } from 'react';

const Profile = () => {

      useEffect(() => {
        document.title = "Register | Home-hero";
      }, []);
    return (
        <div>
            Profile
        </div>
    );
};

export default Profile;