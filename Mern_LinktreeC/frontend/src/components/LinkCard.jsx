export default function LinkCard({ link }) {
  return (
    <div className="border p-3 mb-2 rounded flex justify-between">
      <div>
        <h2 className="font-semibold">{link.title}</h2>
        <p className="text-sm text-gray-500">{link.url}</p>
      </div>
    </div>
  );
}
