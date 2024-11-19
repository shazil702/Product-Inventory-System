import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/product/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProducts(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Our Products</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          onClick={() => navigate("/add-product")}
        >
          Add Product
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={`http://127.0.0.1:8000${product.ProductImage}`}
              alt={product.ProductName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 truncate">
                {product.ProductName}
              </h2>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-blue-600 font-bold">{product.ProductCode}</span>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  onClick={() => navigate(`/productDetail?id=${product.ProductID}`)}
                >
                  See More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
