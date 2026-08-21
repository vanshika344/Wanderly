import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCollection } from "../lib/api";

export default function CollectionViewer() {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCollection(id);
        setCollection(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return <div className="p-8">Loading story...</div>;
  }

  if (!collection) {
    return <div className="p-8">Story not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8F4EF] p-8">
      <h1 className="text-5xl font-serif text-[#5D4A66]">
        {collection.title}
      </h1>

      <p className="mt-3 text-gray-600">
        {collection.place} · {collection.trip_date}
      </p>

      <div className="mt-10 grid gap-6 max-w-3xl">
        {collection.ai_pages?.map((page, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-8 shadow"
          >
            {page.type === "cover" && (
              <h2 className="text-4xl font-serif">
                {page.title}
              </h2>
            )}

            {page.type === "text" && (
              <p className="text-lg leading-8">
                {page.content}
              </p>
            )}

            {page.type === "photo_caption" && (
              <p className="italic text-gray-600">
                {page.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      {collection.format === "polaroid" && (
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {collection.photo_urls?.map((url, index) => (
            <div key={index} className="bg-white p-4 shadow">
              <img
                src={url}
                alt=""
                className="w-full aspect-square object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}