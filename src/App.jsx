import { useMemo, useState } from "react";
import cologneImage from "../products/cologne.jpg";
import iwatchImage from "../products/iwatch.jpg";
import mugImage from "../products/mug.jpg";
import walletImage from "../products/wallet.jpg";

const PRODUCTS = [
  { id: "cologne", name: "Unisex Cologne", image: cologneImage },
  { id: "iwatch", name: "Apple iWatch", image: iwatchImage },
  { id: "mug", name: "Unique Mug", image: mugImage },
  { id: "wallet", name: "Mens Wallet", image: walletImage },
];

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

  const handleQuantityChange = (productId, value) => {
    const cleanValue = Math.max(0, Number.parseInt(value || "0", 10) || 0);
    setQuantities((current) => ({ ...current, [productId]: cleanValue }));
  };

  return (
    <main className="min-vh-100 bg-white">
      <div className="container">
        <header className="shop-header d-flex align-items-center justify-content-between px-3 px-md-4 py-3 py-md-4">
          <h1 className="mb-0 fw-normal shop-title">Shop to React</h1>

          <div
            className="d-inline-flex align-items-center gap-2 shop-cart"
            aria-label={`${itemCount} items in cart`}
          >
            <svg
              className="cart-icon flex-shrink-0"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
            >
              <path
                d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6.2 14.8c.2.7.9 1.2 1.6 1.2h9.9c.7 0 1.3-.4 1.6-1l3.1-7.3c.1-.2.1-.3.1-.5 0-.7-.6-1.2-1.2-1.2H6.5L5.8 3H2v2h2.4l2.6 10.8c-.5.3-.9.9-.9 1.6 0 1.1.9 2 2 2h12v-2H8.1l.1-.2z"
                fill="currentColor"
              />
            </svg>
            <span className="text-nowrap">{itemCount} items</span>
          </div>
        </header>

        <section aria-label="Product list">
          {PRODUCTS.map((product, index) => (
            <article
              className={`bg-body-secondary px-3 px-md-4 py-3 py-md-4 ${
                index > 0 ? "border-top" : ""
              }`}
              key={product.id}
            >
              <h2 className="mb-2 fw-normal shop-product-title">
                {product.name}
              </h2>

              <div className="d-flex align-items-center gap-3 gap-md-5">
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.name}
                />

                <div className="d-flex align-items-center gap-2">
                  <input
                    className="form-control rounded-0 text-center qty-input"
                    id={`qty-${product.id}`}
                    type="number"
                    min="0"
                    inputMode="numeric"
                    value={quantities[product.id]}
                    onChange={(event) =>
                      handleQuantityChange(product.id, event.target.value)
                    }
                    aria-label={`${product.name} quantity`}
                  />

                  <label
                    className="mb-0 text-secondary shop-qty-label"
                    htmlFor={`qty-${product.id}`}
                  >
                    quantity
                  </label>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default App;
