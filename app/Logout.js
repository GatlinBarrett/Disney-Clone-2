"use client";
import React, { useState, useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function Logout() {
  const { data: session } = useSession();
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
        {session && (
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
        <img
          src={
            "https://lh3.googleusercontent.com/a/ACg8ocKvXNeRF59at4Lygiu_w487lfZZZ8Iu1uDJnYL2dPeHU44wLg=s96-c"
          }
          alt=""
          className="ml-auto h-12 w-12 rounded-full object-cover cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default Logout;
