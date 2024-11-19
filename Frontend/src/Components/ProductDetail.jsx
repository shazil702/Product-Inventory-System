import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedStocks, setUpdatedStocks] = useState({});
  const [newVariantName, setNewVariantName] = useState("");
  const [newSubvariantName, setNewSubvariantName] = useState({});

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/product/product-detail/${id}/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleStockChange = (subvariantId, change) => {
    const currentStock = updatedStocks[subvariantId] 
    
    
      ?? product?.variants
        ?.flatMap(variant => variant.subvariants)
        ?.find(sub => sub.id === subvariantId)
        ?.stock?.reduce((sum, s) => sum + s.quantity, 0);
        console.log(currentStock);
  
    setUpdatedStocks(prevState => ({
      ...prevState,
      [subvariantId]: Math.max(0, currentStock + change),
    }));
  };
  

  const handleSaveStock = async (subvariantId) => {
    try {
      await axios.put(`http://127.0.0.1:8000/product/update-stock/${subvariantId}/`, {
        quantity: updatedStocks[subvariantId]
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUpdatedStocks({});
      const response = await axios.get(`http://127.0.0.1:8000/product/product-detail/${id}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setProduct(response.data);
    } catch (err) {
      console.error("Error saving stock:", err);
    }
  };

  const handleRemoveStock = async (subvariantId) => {
    if (window.confirm("Are you sure you want to remove this stock?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/product/remove-stock/${subvariantId}/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const response = await axios.get(`http://127.0.0.1:8000/product/product-detail/${id}/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(response.data);
        
        setProduct(response.data);
      } catch (err) {
        console.error("Error removing stock:", err);
      }
    }
  };
  const handleAddVariant = async () => {
    if (!newVariantName.trim()) {
      alert("Variant name cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/product/add-variant/${id}/`,
        { name: newVariantName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProduct(response.data);
      setNewVariantName("");
    } catch (err) {
      console.error("Error adding variant:", err);
    }
  };

  const handleAddSubvariant = async (variantId) => {
    if (!newSubvariantName[variantId]?.trim()) {
      alert("Subvariant name cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/product/add-subvariant/${variantId}/`,
        { name: newSubvariantName[variantId] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProduct(response.data);
      setNewSubvariantName((prev) => ({ ...prev, [variantId]: "" }));
    } catch (err) {
      console.error("Error adding subvariant:", err);
    }
  };

  

  if (loading) {
    return <div className="text-center text-blue-600 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 text-xl">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row">
          <img
            src={`http://127.0.0.1:8000${product.ProductImage}`}
            alt={product.ProductName}
            className="w-full md:w-1/3 rounded-lg object-cover"
          />
          <div className="md:ml-6 flex-1">
            <h1 className="text-3xl font-bold text-gray-800">{product.ProductName}</h1>
            <p className="text-gray-600 mt-2"><strong>Product Code:</strong> {product.ProductCode}</p>
            <p className="text-gray-600"><strong>Product ID:</strong> {product.ProductID}</p>
            <p className="text-gray-600"><strong>HSN Code:</strong> {product.HSNCode || "N/A"}</p>
            <p className="text-gray-600"><strong>Total Stock:</strong> {product.TotalStock}</p>
            <p className="text-gray-600"><strong>Favourite:</strong> {product.IsFavourite ? "Yes" : "No"}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Variants</h2>
          <div className="mt-4 space-y-4">
            {product?.variants?.map((variant, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-lg font-bold text-blue-600">{variant.name}</h3>
                <ul className="mt-2 space-y-1 text-gray-600">
                {variant.subvariants.map((subvariant, idx) => {
  const currentStock = updatedStocks[subvariant.id] 
    ?? subvariant.stock.reduce((sum, s) => sum + s.quantity, 0);

  return (
    <li key={idx} className="list-disc list-inside">
      {subvariant.name} - Stock: {currentStock}
      <div className="flex space-x-2 mt-2">
        <button
          onClick={() => handleStockChange(subvariant.id, 1)}
          className="text-green-600"
        >
          +
        </button>
        <button
          onClick={() => handleStockChange(subvariant.id, -1)}
          className="text-red-600"
        >
          -
        </button>
        <button
          onClick={() => handleRemoveStock(subvariant.id)}
          className="text-red-600"
        >
          Remove
        </button>
      </div>
      {updatedStocks[subvariant.id] !== undefined && (
        <button
          onClick={() => handleSaveStock(subvariant.id)}
          className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
        >
          Save
        </button>
      )}
    </li>
  );
})}

                </ul>
              </div>
            ))}
            <Link to={'/dashboard'}>
        <button className="mt-8 bg-blue-500 text-white py-2 px-4 rounded">
          Home
        </button>
        </Link>
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default ProductDetail;
