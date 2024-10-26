// src/components/Profile/Profile.jsx

import React, { useState } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import "./Profile.css";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  onUpdateProfile,
  onCardLike,
  onLogout,
}) {
  // State to manage the visibility of the EditProfileModal
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Handlers to open and close the EditProfileModal
  const openEditProfileModal = () => setIsEditProfileOpen(true);
  const closeEditProfileModal = () => setIsEditProfileOpen(false);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
        {/* Edit Profile Button */}
        <button
          type="button"
          className="profile__edit-button"
          onClick={openEditProfileModal}
        >
          Change profile data
        </button>
        <button
          type="button"
          className="profile__signout-button"
          onClick={onLogout}
        >
          Log out
        </button>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>

      {/* EditProfileModal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={closeEditProfileModal}
        onUpdateProfile={onUpdateProfile}
      />
    </div>
  );
}

export default Profile;
