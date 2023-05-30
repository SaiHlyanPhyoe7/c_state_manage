"use client";

import { Container, Loader } from "@mantine/core";
import useInfiniteScroll from "../../hook/useInfiniteScroll";
import InfiniteScrollCompo from "@/components/infiniteScroll/InfiniteScrollCompo";

const InfiniteScrollExample = () => {
  const { players, loading } = useInfiniteScroll(
    "https://www.balldontlie.io/api/v1/players",
    10
  );
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

  return <InfiniteScrollCompo players={players} loading={loading} />;
};

export default InfiniteScrollExample;
