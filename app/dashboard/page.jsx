// app/dashboard/page.jsx
"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/"); // Redirect to home if user is not signed in
        }
    }, [user, loading, router]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Welcome to the Dashboard, {user?.displayName}!</h1>
            <p>Email: {user?.email}</p>
            <img src={user?.photoURL} alt="Profile" />
        </div>
    );
}