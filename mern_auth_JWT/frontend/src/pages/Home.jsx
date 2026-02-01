import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [loggedUser, setLoggedUser] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedUser(localStorage.getItem("user"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    handleSuccess("User Logged Out");
    setTimeout(() => navigate("/login"), 1000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        handleError(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <h1 className="text-xl font-semibold">
          Hello, <span className="text-blue-600">{loggedUser}</span>
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Log Out
        </button>
      </div>

      {/* Products */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-medium">{item.name}</h2>
            <p className="text-gray-600">₹ {item.price}</p>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
