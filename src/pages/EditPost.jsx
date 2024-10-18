import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";
import Container from "../components/container/Container";
import PostForm from "../components/post-form/PostForm";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      setLoading(true);
      appwriteService.getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
          } else {
            navigate("/");
          }
          setLoading(false);
        })
        .catch((err) => {
          setError("Error fetching post");
          setLoading(false);
        });
    }
  }, [slug, navigate]);

  return (
    <div className="py-6">
      <Container>
        {loading && <p>Loading post...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {post && <PostForm post={post} />}
      </Container>
    </div>
  );
}

export default EditPost;
