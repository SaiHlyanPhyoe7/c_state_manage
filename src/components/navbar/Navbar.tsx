import { login, logout } from "@/redux/feature/auth/loginSlice";
import { RootState } from "@/redux/store";
import { Box, Button, Flex, Text, Title } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateTeam } from "../createTeam/CreateTeam";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const username = useSelector((state: RootState) => state.auth.username);

  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    dispatch(login({ username: storedUsername }));
  }
  const forDesktop = useMediaQuery("(min-width: 36.25em)");

  return (
    <Box>
      {username && (
        <Flex justify='space-between' align='center'>
          <Flex
            direction={forDesktop ? "row" : "column"}
            justify='space-between'
            align='center'
            gap='xl'
          >
            <CreateTeam />
            <Link href='/infiniteScroll'>
              <Text>Goto Infinite Scroll</Text>
            </Link>
          </Flex>
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
      )}
    </Box>
  );
};

export default Navbar;
