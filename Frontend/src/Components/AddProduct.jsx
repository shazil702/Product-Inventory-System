import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const navigate = useNavigate();
  const [product, setProduct] = useState({
    ProductID: "",
    ProductCode: "",
    ProductName: "",
    ProductImage: null,
  });
  const [variants, setVariants] = useState([
    { name: "", subvariants: [{ name: "", stock: 1 }] },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, ProductImage: e.target.files[0] });
  };

  const handleVariantChange = (index, name, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][name] = value;
    setVariants(updatedVariants);
  };

  const handleSubvariantChange = (variantIndex, subvariantIndex, name, value) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].subvariants[subvariantIndex][name] = value;
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { name: "", subvariants: [{ name: "", stock: 1 }] }]);
  };

  const addSubvariant = (index) => {
    const updatedVariants = [...variants];
    updatedVariants[index].subvariants.push({ name: "", stock: 1 });
    setVariants(updatedVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ProductID", product.ProductID);
    formData.append("ProductCode", product.ProductCode);
    formData.append("ProductName", product.ProductName);
    formData.append("ProductImage", product.ProductImage);
    formData.append("variants", JSON.stringify(variants));
    console.log(variants);
    
    try {
      await axios.post("http://127.0.0.1:8000/product/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Product added successfully!");
    } catch (error) {
      console.error("Submission Error:", error.response.data);
    }
    navigate('/dashboard')
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Add Product
      </h1>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-gray-100 p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Product ID</label>
          <input
            type="text"
            name="ProductID"
            value={product.ProductID}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Product Code</label>
          <input
            type="text"
            name="ProductCode"
            value={product.ProductCode}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Product Name</label>
          <input
            type="text"
            name="ProductName"
            value={product.ProductName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Product Image</label>
          <input
            type="file"
            name="ProductImage"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        {variants.map((variant, index) => (
          <div key={index} className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Variant {index + 1} Name</label>
            <input
              type="text"
              value={variant.name}
              onChange={(e) => handleVariantChange(index, "name", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
              required
            />
            {variant.subvariants.map((subvariant, subIndex) => (
              <div key={subIndex} className="mt-2">
                <label className="block text-gray-500">Subvariant {subIndex + 1} Name</label>
                <input
                  type="text"
                  value={subvariant.name}
                  onChange={(e) =>
                    handleSubvariantChange(index, subIndex, "name", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
                <label className="block text-gray-500 mt-2">Stock</label>
                <input
                  type="number"
                  value={subvariant.stock}
                  onChange={(e) =>
                    handleSubvariantChange(index, subIndex, "stock", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addSubvariant(index)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition shadow"
            >
              Add Subvariant
            </button>
          </div>
        ))}
        <div className="flex justify-end mb-6">
          <button
            type="button"
            onClick={addVariant}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow"
          >
            Add Variant
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition shadow"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
