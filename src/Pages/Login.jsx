import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Loader from "../components/Loader";

const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password).then();
      navigate("/");
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(errorMessage,errorCode);  
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Talk</span>
        <span className="title">Login </span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button disabled={loading}>
            {loading ? (
              <div className="fetching">
                <Loader />
                <span>Loading...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
          {error && <span> Something went wrong</span>}
          <p>You don't have an account? <Link to="/register"  style={{ textDecoration: 'none', color: 'blue' }}>Register</Link>  </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
