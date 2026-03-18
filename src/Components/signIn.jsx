import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const FACEBOOK_USER = {
  name: "Rich West",
  email: "richwest@facebook.com",
  provider: "facebook",
};

const facebookPopupMarkup = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Facebook Login</title>
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f0f2f5;
          color: #1c1e21;
        }

        .fb-shell {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 32px 16px;
        }

        .fb-card {
          width: min(360px, 100%);
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.18);
          padding: 24px;
        }

        .fb-brand {
          color: #1877f2;
          font-size: 2.2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 20px;
        }

        .fb-card h1 {
          font-size: 1.35rem;
          margin: 0 0 10px;
          text-align: center;
        }

        .fb-card p {
          margin: 0 0 18px;
          text-align: center;
          color: #606770;
          font-size: 0.95rem;
        }

        label {
          display: block;
          font-size: 0.85rem;
          margin-bottom: 6px;
        }

        input {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #ccd0d5;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 14px;
          font-size: 0.95rem;
        }

        .fb-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          margin-top: 10px;
        }

        button {
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          font-size: 0.95rem;
          cursor: pointer;
        }

        .fb-cancel {
          background: #e4e6eb;
          color: #050505;
        }

        .fb-login {
          background: #1877f2;
          color: #ffffff;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="fb-shell">
        <div class="fb-card">
          <div class="fb-brand">facebook</div>
          <h1>Log in to Facebook</h1>
          <p>Sign in to continue to Shop 2 React.</p>
          <label for="fb-email">Email or phone</label>
          <input id="fb-email" value="richwest@facebook.com" />
          <label for="fb-password">Password</label>
          <input id="fb-password" type="password" value="password123" />
          <div class="fb-actions">
            <button id="fb-cancel" class="fb-cancel" type="button">Cancel</button>
            <button id="fb-login" class="fb-login" type="button">Log In</button>
          </div>
        </div>
      </div>
    </body>
  </html>
`;

const openFacebookLoginPopup = () =>
  new Promise((resolve, reject) => {
    const popup = window.open(
      "",
      "facebook-login",
      "width=520,height=640,left=200,top=120",
    );

    if (!popup) {
      reject(new Error("Allow popups to continue with Facebook login."));
      return;
    }

    let isSettled = false;
    let closedWatcher = null;

    const settle = (callback) => {
      if (isSettled) {
        return;
      }

      isSettled = true;

      if (closedWatcher) {
        window.clearInterval(closedWatcher);
      }

      callback();
    };

    popup.document.write(facebookPopupMarkup);
    popup.document.close();
    popup.focus();

    const emailField = popup.document.getElementById("fb-email");
    const loginButton = popup.document.getElementById("fb-login");
    const cancelButton = popup.document.getElementById("fb-cancel");

    loginButton?.addEventListener("click", () => {
      const enteredEmail = emailField?.value.trim() || FACEBOOK_USER.email;

      settle(() => {
        popup.close();
        resolve({ ...FACEBOOK_USER, email: enteredEmail });
      });
    });

    cancelButton?.addEventListener("click", () => {
      settle(() => {
        popup.close();
        reject(new Error("Facebook sign in was canceled."));
      });
    });

    closedWatcher = window.setInterval(() => {
      if (popup.closed) {
        settle(() => {
          reject(new Error("Facebook sign in was canceled."));
        });
      }
    }, 250);
  });

const SignIn = ({ onSignIn }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    document.title = "Sign In";
  }, []);

  const handleManualLogin = (event) => {
    event.preventDefault();

    const trimmedName = name.trim() || "Guest Shopper";
    const trimmedEmail =
      email.trim() ||
      `${trimmedName.toLowerCase().replace(/\s+/g, ".")}@shop2react.com`;

    onSignIn({
      name: trimmedName,
      email: trimmedEmail,
      provider: "manual",
    });

    navigate("/checkout");
  };

  const handleFacebookLogin = async () => {
    setFeedback("");

    try {
      const user = await openFacebookLoginPopup();
      onSignIn(user);
      navigate("/checkout");
    } catch (error) {
      setFeedback(error.message);
    }
  };

  return (
    <section aria-label="Sign in" className="flow-shell">
      <Card className="flow-card">
        <Card.Header as="h2" className="flow-card-header">
          Sign In
        </Card.Header>
        <Card.Body className="flow-card-body">
          <p className="flow-copy">Please login using one of the following:</p>

          <div className="signin-form-wrap">
            <Form onSubmit={handleManualLogin} className="signin-form">
              <Form.Group className="mb-3" controlId="signin-name">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Your name"
                  onChange={(event) => setName(event.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="signin-email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Your Email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>

              <Button type="submit" className="shop-small-btn login-btn">
                Login
              </Button>
            </Form>
          </div>

          <Button
            type="button"
            className="shop-small-btn facebook-btn"
            onClick={handleFacebookLogin}
          >
            <i className="fa-brands fa-facebook-f" aria-hidden="true" />
            <span>LOGIN WITH FACEBOOK</span>
          </Button>

          {feedback ? <p className="signin-feedback">{feedback}</p> : null}
        </Card.Body>
      </Card>
    </section>
  );
};

export default SignIn;
