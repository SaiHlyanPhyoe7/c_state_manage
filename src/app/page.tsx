"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { Title } from "@mantine/core";
import { login, logout } from "../redux/feature/auth/loginSlice";
import { useEffect, useState } from "react";
import { CreateTeam } from "@/components/createTeam/CreateTeam";
import ShowTeam from "@/components/showTeam/ShowTeam";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const username = useSelector((state: RootState) => state.auth.username);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      dispatch(login({ username: storedUsername }));
    } else {
      router.push("/login"); // Redirect to login page if not logged in
    }
  }, [dispatch, router]);

  return (
    <main>
      {username && (
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
          <div>
            <CreateTeam />
          </div>
          <div>
            <ShowTeam />
          </div>
        </>
      )}
    </main>
  );
}
