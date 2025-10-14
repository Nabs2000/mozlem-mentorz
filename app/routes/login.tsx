import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getFirestore();

  const accountExists = async (uid: string) => {
    const usersRef = doc(db, "clients", uid);
    const profsRef = doc(db, "professionals", uid);
    const usersDocSnap = await getDoc(usersRef);
    const profsDocSnap = await getDoc(profsRef);
    usersDocSnap.exists()
      ? console.log(usersDocSnap.data())
      : console.log(profsDocSnap.data());
    if (usersDocSnap.exists()) {
      return "Client";
    } else if (profsDocSnap.exists()) {
      return "Professional";
    } else {
      return "None";
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      // Add scope for contacts
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      // Add scope for sending emails
      provider.addScope("https://www.googleapis.com/auth/userinfo.email");
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          const user = result.user;
          console.log(user);
          // Check if account exists
          const accExists = await accountExists(user.uid);
          if (accExists === "Client") {
            navigate(`/client/${user.uid}`);
          } else if (accExists === "Professional") {
            navigate(`/professional/${user.uid}`);
          } else {
            navigate("/register");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log(errorCode, errorMessage, email, credential);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        const accExists = await accountExists(user.uid);
        if (accExists === "Client") {
          navigate(`/client/${user.uid}`);
        } else if (accExists === "Professional") {
          navigate(`/professional/${user.uid}`);
        } else {
          navigate("/register");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className={`${isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
          <Link
            to="/register"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Don't have an account?{" "}
          </Link>
        </div>
      </form>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
