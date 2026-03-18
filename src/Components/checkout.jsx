import { useEffect } from "react";
import Card from "react-bootstrap/Card";

const Checkout = ({ user }) => {
  useEffect(() => {
    document.title = "Check Out";
  }, []);

  return (
    <section aria-label="Checkout" className="flow-shell">
      <Card className="flow-card">
        <Card.Header as="h2" className="flow-card-header">
          Check Out
        </Card.Header>
        <Card.Body className="flow-card-body checkout-body">
          <div className="checkout-welcome">
            <div className="checkout-icon" aria-hidden="true">
              <i className="fa-solid fa-user-check" />
            </div>
            <p className="checkout-heading">Welcome Back {user.name}!</p>
          </div>

          <p className="checkout-copy">Time to check out?</p>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Checkout;
