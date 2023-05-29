import { login, logout } from "@/redux/feature/auth/loginSlice";
import { RootState } from "@/redux/store";
import { Box, Button, Flex, Title } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateTeam } from "../createTeam/CreateTeam";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const username = useSelector((state: RootState) => state.auth.username);

  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    dispatch(login({ username: storedUsername }));
  }

  return (
    <div>
      <Flex justify='space-between' align='center'>
        <Box>
          <CreateTeam />
        </Box>
        <Flex justify='start' align='center'>
          <IconUser />
          <Title pr='xl' pl='xs' order={5}>
            {username}
          </Title>
        </Flex>
        <Button
          color='red'
          onClick={() => {
            dispatch(logout());
            router.push("/login");
          }}
        >
          logout
        </Button>
      </Flex>
    </div>
  );
};

export default Navbar;
