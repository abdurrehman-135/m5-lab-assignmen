import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PRODUCTS from "./Components/products";
import ShopNavbar from "./Components/navbar";
import DisplayProducts from "./Components/displayProducts";
import Cart from "./Components/cart";
import SignIn from "./Components/signIn";
import Checkout from "./Components/checkout";

function App() {
  const [quantities, setQuantities] = useState(() =>
    PRODUCTS.reduce((acc, product) => ({ ...acc, [product.id]: 0 }), {}),
  );
  const [signedInUser, setSignedInUser] = useState(null);

  const itemCount = useMemo(
    () =>
      Object.values(quantities).reduce(
        (total, amount) => total + Number(amount || 0),
        0,
      ),
    [quantities],
  );

  useEffect(() => {
    if (itemCount === 0) {
      setSignedInUser(null);
    }
  }, [itemCount]);

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

  const handleSignIn = (user) => {
    setSignedInUser(user);
  };

  return (
    <BrowserRouter>
      <main className="min-vh-100 shop-app">
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
              element={
                <Cart
                  products={PRODUCTS}
                  quantities={quantities}
                  itemCount={itemCount}
                />
              }
            />
            <Route
              path="/signin"
              element={
                itemCount > 0 ? (
                  <SignIn onSignIn={handleSignIn} />
                ) : (
                  <Navigate to="/cart" replace />
                )
              }
            />
            <Route
              path="/checkout"
              element={
                itemCount > 0 ? (
                  signedInUser ? (
                    <Checkout user={signedInUser} />
                  ) : (
                    <Navigate to="/signin" replace />
                  )
                ) : (
                  <Navigate to="/cart" replace />
                )
              }
            />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
