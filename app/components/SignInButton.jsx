// components/SignInButton.jsx
"use client";

import { auth, googleProvider, db } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export const SignInButton = () => {
    const router = useRouter();

    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Store user details in Firestore
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt: new Date().toISOString(),
            });

            // Navigate to the /dashboard route
            router.push("/dashboard");
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };

    return (
        <button
            onClick={handleSignIn}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-all"
        >
            Get Started
        </button>
    );
};