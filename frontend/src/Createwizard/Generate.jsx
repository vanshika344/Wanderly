import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadPhoto } from "../lib/uploadphoto";
import { createCollection } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function Generate({ files, details, style }) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  async function generate() {
    setLoading(true);

    try {
      const photoUrls = [];

      for (const file of files) {
        const url = await uploadPhoto(file, user.id);
        photoUrls.push(url);
      }

      const collection = await createCollection({
        photoUrls,
        ...details,
        ...style,
      });

      navigate(`/collection/${collection.id}`);
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-serif">Ready to Create?</h1>

      <button
        onClick={generate}
        disabled={loading}
        className="mt-8 bg-[#B68EA9] text-white px-8 py-3 rounded-full"
      >
        {loading ? "Creating your story..." : "Create My Story"}
      </button>
    </div>
  );
}