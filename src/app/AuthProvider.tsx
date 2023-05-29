"use client";

import { childrenProps } from "@/types/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/redux/feature/auth/loginSlice";
import { useRouter } from "next/navigation";
import { Box, Loader, Text } from "@mantine/core";

export const AuthProvider = ({ children }: childrenProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername && storedUsername !== "") {
      dispatch(login({ username: storedUsername }));
    } else {
      router.push("/login");
    }
    setLoading(false);
  }, [dispatch, router]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100svh",
        }}
      >
        <Loader />
      </Box>
    );
  }

  return <Box>{children}</Box>;
};
