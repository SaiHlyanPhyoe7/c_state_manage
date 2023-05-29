import {
  ActionIcon,
  Box,
  Container,
  Flex,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { IconEdit } from "@tabler/icons-react";
import React from "react";

interface Team {
  id: string;
  name: string;
  playerCount: number;
  region: string;
  country: string;
}

function ShowTeam() {
  // Retrieve the teams array from localStorage
  const teamsJSON = localStorage.getItem("teams");
  const teams: Team[] = teamsJSON ? JSON.parse(teamsJSON) : [];

  return (
    <Container size='xl' my='xl'>
      <Title py='xl' order={2}>
        List Of Teams :
      </Title>
      <SimpleGrid
        cols={4}
        spacing='lg'
        breakpoints={[
          { maxWidth: "md", cols: 3, spacing: "md" },
          { maxWidth: "sm", cols: 2, spacing: "sm" },
          { maxWidth: "xs", cols: 1, spacing: "sm" },
        ]}
      >
        {teams.map((team) => (
          <Box
            mx='md'
            p='xl'
            key={team.id}
            sx={{ border: "1px solid gray", borderRadius: "15px" }}
          >
            <Flex justify='space-between' align='center'>
              <h3>{team.name}</h3>
              <Flex justify='start' align='center'>
                <ActionIcon>
                  <IconEdit />
                </ActionIcon>
                <ActionIcon>
                  <IconTrash />
                </ActionIcon>
              </Flex>
            </Flex>
            <Flex justify='space-between' align='center'>
              <Text>Player Count: </Text>
              <Text>{team.playerCount}</Text>
            </Flex>
            <Flex justify='space-between' align='center'>
              <Text>Region: </Text>
              <Text>{team.region}</Text>
            </Flex>
            <Flex justify='space-between' align='center'>
              <Text>Country: </Text>
              <Text>{team.country}</Text>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default ShowTeam;
