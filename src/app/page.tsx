"use client";

import { CreateTeam } from "@/components/createTeam/CreateTeam";
import ShowTeam from "@/components/showTeam/ShowTeam";
import Navbar from "@/components/navbar/Navbar";
import { Container } from "@mantine/core";

export default function Home() {
  return (
    <main>
      <Container size='xl' my='xl'>
        <Navbar />
        <ShowTeam />
      </Container>
    </main>
  );
}
