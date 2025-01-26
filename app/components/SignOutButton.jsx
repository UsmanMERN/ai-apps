// components/SignOutButton.jsx
"use client";

import { auth } from "../lib/firebase";

export const SignOutButton = () => {
    return (
        <button
            onClick={() => auth.signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
        >
            Sign Out
        </button>
    );
};