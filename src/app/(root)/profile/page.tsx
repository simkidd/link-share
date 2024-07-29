import PageHeader from "@/components/PageHeader";
import React from "react";
import ProfileDetails from "../components/ProfileDetails";

const ProfilePage = () => {
  return (
    <div className="w-full py-10">
      <div className="w-full lg:px-10 md:px-6 px-4">
        <PageHeader
          title="Profile Details"
          desc="Add your details to create a personal touch to your profile."
        />
      </div>
      <ProfileDetails />
    </div>
  );
};

export default ProfilePage;
