"use client";
import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import app from "../firebase.js";
import { useRouter } from "next/router";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Logged = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        router.push("/");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  console.log(user);

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div className="sticky bg-[#040714] top-0 z-[1000] flex items-center px-10 h-[72px] md:px-12">
      <Image
        src="/images/logo.svg"
        width={80}
        height={80}
        className="cursor-pointer"
        onClick={() => router.push("/")}
      ></Image>
      {user && (
        <div className="hidden ml-10 md:flex items-center space-x-6">
          <a className="header-link group">
            <HomeIcon className="h-4" />
            <span className="span">Home</span>
          </a>
          <a className="header-link group">
            <SearchIcon className="h-4" />
            <span className="span">Search</span>
          </a>
          <a className="header-link group">
            <PlusIcon className="h-4" />
            <span className="span">Watchlist</span>
          </a>
          <a className="header-link group">
            <StarIcon className="h-4" />
            <span className="span">Originals</span>
          </a>
          <a className="header-link group">
            <img src="/images/movie-icon.svg" alt="" className="h-5" />
            <span className="span">Movies</span>
          </a>
          <a className="header-link group">
            <img src="/images/series-icon.svg" alt="" className="h-5" />
            <span className="span">Series</span>
          </a>
        </div>
      )}
      {user ? (
        // User is logged in, render dashboard or redirect to the dashboard
        <></>
      ) : (
        // User is not logged in, render the login button
        <button
          onClick={signInWithGoogle}
          className="ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide hover:bg-white hover:text-black transition duration-200"
        >
          Sign In With Google
        </button>
      )}
    </div>
  );
};

const Logout = () => {
  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState(null);

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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-8 rounded-lg shadow-md">
        <img
          src={""}
          alt=""
          className="ml-auto h-12 w-12 rounded-full object-cover cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Logged;
