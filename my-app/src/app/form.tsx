import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

export default function Form() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddToCart = (product) => {
    const itemExists = cartItems.find((item) => item.id === product.id);
    if (itemExists) {
      const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = [...cartItems, product];
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  const handleRemoveFromCart = (product) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>

        <div className="mt-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mt-6 grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6" style={{ gap: "1rem" }}>
          {filteredProducts.map((product) => (
            <div key={product.id} className="flex flex-col relative border border-black/20 justify-between">
              {/* Product Image */}
              <div className="aspect-h-1 aspect-w-1 w-1/2 overflow-hidden rounded-md bg-gray-200 lg:aspect-none flex-hover:opacity-75 lg:h-1/2">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover object-center"
                  style={{ width: "10rem", height: "13rem" }}
                />
              </div>
              {/* Product Details */}
              <div className="mt-4 flex justify-between">
                <div>
                  {/* Product Title */}
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="flex absolute inset-0" />
                      {product.title}
                    </a>
                  </h3>
                  {/* Product Price */}
                  <p className="flex mt-1 text-sm text-gray-500">{product.price}</p>
                </div>
                <div className="">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="relative z-50 w-5 h-5 p-5 border border-green-700"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(product)}
                    className="w-5 h-5 p-5 border border-red-700"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
