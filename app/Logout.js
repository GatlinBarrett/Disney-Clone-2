"use client";
import React, { useState, useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

const Logout = () => {
  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState("");

  console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className="justify-end w-full">
      <div>
        <img
          src={user.photoURL}
          alt=""
          className="ml-auto h-12 w-12 rounded-full object-cover cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Logout;
