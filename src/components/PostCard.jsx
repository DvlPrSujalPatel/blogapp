import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import PropTypes from 'prop-types';

const PostCard = ({ $id, title, featuredImage }) => {
  // Fallback image URL for when the featured image fails to load
  const fallbackImage = "path/to/fallback/image.jpg"; // Replace with your fallback image URL

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 transition-transform transform hover:scale-105">
        <div className="w-full flex justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title || "Post image"}
            onError={(e) => { e.target.src = fallbackImage }} // Handle image load error
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

// Prop Types for better type-checking
PostCard.propTypes = {
  $id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  featuredImage: PropTypes.string.isRequired,
};

export default PostCard;
