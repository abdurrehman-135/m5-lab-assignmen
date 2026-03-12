import { useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PRODUCTS from "./Components/products";
import ShopNavbar from "./Components/navbar";
import DisplayProducts from "./Components/displayProducts";
import Cart from "./Components/cart";

function App() {
  const [quantities, setQuantities] = useState(() =>
    PRODUCTS.reduce((acc, product) => ({ ...acc, [product.id]: 0 }), {}),
  );

  const itemCount = useMemo(
    () =>
      Object.values(quantities).reduce(
        (total, amount) => total + Number(amount || 0),
        0,
      ),
    [quantities],
  );

  const handleAdd = (productId) => {
    setQuantities((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + 1,
    }));
  };

  const handleSubtract = (productId) => {
    setQuantities((current) => ({
      ...current,
      [productId]: Math.max(0, (current[productId] ?? 0) - 1),
    }));
  };

  return (
    <BrowserRouter>
      <main className="min-vh-100 bg-white">
        <ShopNavbar itemCount={itemCount} />
        <div className="container py-4">
          <Routes>
            <Route
              path="/"
              element={
                <DisplayProducts
                  products={PRODUCTS}
                  quantities={quantities}
                  onAdd={handleAdd}
                  onSubtract={handleSubtract}
                />
              }
            />
            <Route
              path="/cart"
              element={<Cart products={PRODUCTS} quantities={quantities} />}
            />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
