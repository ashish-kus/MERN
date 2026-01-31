import { useEffect, useState } from "react";
import api from "../api/axios";
import LinkCard from "../components/LinkCard";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    api.get("/links").then((res) => setLinks(res.data));
  }, []);

  const addLink = async () => {
    const res = await api.post("/links", { title, url });
    setLinks([...links, res.data]);
    setTitle("");
    setUrl("");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Links</h1>

      <div className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 flex-1"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
          className="border p-2 flex-1"
        />
        <button onClick={addLink} className="bg-black text-white px-4">
          Add
        </button>
      </div>

      {links.map((link) => (
        <LinkCard key={link._id} link={link} />
      ))}
    </div>
  );
}
