"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { Title } from "@mantine/core";
import { login, logout } from "../redux/feature/auth/loginSlice";
import { useEffect, useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      dispatch(login({ username: storedUsername }));
    } else {
      router.push("/login"); // Redirect to login page if not logged in
    }
  }, [dispatch, router]);

  return (
    <main>
      {username ? (
        <>
          <p>Login Username is: {username}</p>
          <button
            onClick={() => {
              dispatch(logout());
              router.push("/login");
            }}
          >
            logout
          </button>
        </>
      ) : null}
    </main>
  );
}
