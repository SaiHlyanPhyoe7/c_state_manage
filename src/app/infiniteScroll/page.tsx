"use client";

import { ActionIcon, Box, Container, Loader, Text, Title } from "@mantine/core";
import useInfiniteScroll from "../../hook/useInfiniteScroll";
import { IconChevronLeft, IconCircleChevronLeft } from "@tabler/icons-react";
import { Affix, Button, Transition } from "@mantine/core";
import { IconArrowUp } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/feature/auth/loginSlice";
import { useMediaQuery } from "@mantine/hooks";

const InfiniteScrollExample = () => {
  const forDesktop = useMediaQuery("(min-width: 56.25em)");
  const { players, loading } = useInfiniteScroll(
    "https://www.balldontlie.io/api/v1/players",
    10
  );
  const router = useRouter();
  const dispatch = useDispatch();

  if (loading && players.length === 0) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader />
      </Container>
    );
  }

  return (
    <Container size='md'>
      <Box
        sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}
      >
        <ActionIcon>
          <IconChevronLeft onClick={() => router.back()} />
        </ActionIcon>
        <Title order={1} sx={{ textDecoration: "underline", padding: "20px" }}>
          Players
        </Title>
        <Button
          onClick={() => {
            dispatch(logout());
            router.push("/login");
          }}
          variant='gradient'
          gradient={{ from: "orange", to: "red" }}
        >
          Logout
        </Button>
      </Box>
      {players.map((player, index) => (
        <div key={index}>
          <Text fz={forDesktop ? "80px" : "60px"}>
            {index}. {player.first_name} {player.last_name}
          </Text>
        </div>
      ))}
      <Affix position={{ bottom: "20rem", right: "20rem" }}>
        <Transition transition='slide-up' mounted={window.scrollY > 0}>
          {(transitionStyles) => (
            <Button
              leftIcon={<IconArrowUp size='1rem' />}
              style={transitionStyles}
              onClick={() => window.scrollTo({ top: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
      {loading && (
        <Box>
          <Loader />;
        </Box>
      )}
    </Container>
  );
};

export default InfiniteScrollExample;
