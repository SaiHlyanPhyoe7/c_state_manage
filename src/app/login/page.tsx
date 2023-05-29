"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/feature/auth/loginSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { Button, Container, Input, Tooltip } from "@mantine/core";
import { IconAlertCircle, IconUser } from "@tabler/icons-react";

function Page() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const router = useRouter();

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(login({ username }));
    router.push("/");
  };

  return (
    <Container
      size='md'
      h='100svh'
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <form onSubmit={handleLogin}>
        <div>
          <Input
            mb='xl'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            icon={<IconUser size='1rem' />}
            placeholder='username'
          />
          <Button w='100%' type='submit'>
            Login
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default Page;
