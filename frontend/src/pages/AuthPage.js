import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        alert(`Signup successful! Welcome ${result.user.email}`);
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        alert(`Login successful! Welcome ${result.user.email}`);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      alert(`Welcome ${result.user.displayName}`);
    } catch (error) {
      console.error("❌ Google Login failed:", error);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ccc", borderRadius: 10 }}>
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleFormSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%" }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Password:</label><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%" }} />
        </div>
        <button type="submit" style={{ width: "100%", padding: 10 }}>
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <p style={{ marginTop: 10 }}>
        {isSignup ? "Already have an account?" : "Don't have an account?"}
        <button onClick={() => setIsSignup(!isSignup)} style={{ marginLeft: 5 }}>
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>

      <hr />
      <button onClick={handleGoogleSignIn} style={{ width: "100%", padding: 10, backgroundColor: "#4285F4", color: "white", border: "none", marginTop: 10 }}>
        Sign in with Google
      </button>
    </div>
  );
};

export default AuthPage;