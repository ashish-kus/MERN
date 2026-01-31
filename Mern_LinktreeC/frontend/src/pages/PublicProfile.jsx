import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PublicProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get(`/public/${username}`).then((res) => setProfile(res.data));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4">@{profile.username}</h1>

        {profile.links.map((link) => (
          <a
            key={link._id}
            href={link.url}
            target="_blank"
            className="block bg-white p-3 rounded mb-3 shadow"
          >
            {link.title}
          </a>
        ))}
      </div>
    </div>
  );
}
