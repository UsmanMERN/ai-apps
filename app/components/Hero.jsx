"use client"; // Ensures this component is only rendered on the client side

import { motion } from "framer-motion";
import { SignInButton } from "./SignInButton";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase"; // Adjust the import path as needed

export default function Hero() {
  const [user, loading] = useAuthState(auth); // Track user authentication state

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center py-20"
    >
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        AI-Powered Education Network
      </h1>
      <p className="text-xl mb-8 text-gray-800">
        Connecting underserved schools to the power of AI and the internet
      </p>

      {loading ? ( // Show a loading state while checking auth status
        <div className="animate-pulse bg-gray-200 h-10 w-32 mx-auto rounded-md"></div>
      ) : user ? ( // If user is logged in, show the "AI Tutor" button
        <Link href="/chatbot">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-all">
            AI Tutor
          </button>
        </Link>
      ) : ( // If user is not logged in, show the SignInButton
        <SignInButton />
      )}
    </motion.div>
  );
}