"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/feature/auth/loginSlice";
import { useRouter } from "next/navigation";
import { Button, Container, Input, TextInput, Tooltip } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { useForm } from "@mantine/form";

function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleLogin = (username: string) => {
    dispatch(login({ username }));
    router.push("/");
  };

  const form = useForm({
    initialValues: {
      username: "",
    },
    validate: {
      username: (value: string) => {
        if (value.length <= 4) {
          return "Username must be at least 5 characters";
        }
        if (value.includes(" ")) {
          return "Username cannot contain spaces";
        }
        if (value.length > 10) {
          return "Username must be less than 10 characters";
        }
        return null;
      },
    },
  });

  return (
    <Container
      size='md'
      h='100svh'
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <form onSubmit={form.onSubmit((values) => handleLogin(values.username))}>
        <TextInput
          ref={inputRef}
          mb='xl'
          icon={<IconUser size='1rem' />}
          {...form.getInputProps("username")}
          placeholder='username'
        />
        <Button w='100%' type='submit'>
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Page;
