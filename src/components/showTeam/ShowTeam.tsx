import {
  ActionIcon,
  Box,
  Container,
  Flex,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect } from "react";
import HandleManipulation from "./handleManipulation/HandleManipulation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { initializeTeams } from "@/redux/feature/team/teamSlice";

interface Team {
  id: string;
  name: string;
  playerCount: number;
  region: string;
  country: string;
}

function ShowTeam() {
  const dispatch = useDispatch();

  useEffect(() => {
    const teamsJSON = localStorage.getItem("teams");
    const teamsData: Team[] = teamsJSON ? JSON.parse(teamsJSON) : [];

    dispatch(initializeTeams(teamsData));
  }, [dispatch]);

  const teamGs = useSelector((state: RootState) => state.team.teams);

  return (
    <Container size='xl' my='xl'>
      <Title py='xl' order={2}>
        List Of Teams :
      </Title>

      {teamGs.length === 0 ? (
        <Title order={3} align='center' pt='xl' mt='xl'>
          No teams available at the moment.
        </Title>
      ) : (
        <SimpleGrid
          cols={4}
          spacing='lg'
          breakpoints={[
            { maxWidth: "md", cols: 3, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "sm" },
          ]}
        >
          {teamGs.map((team) => (
            <Box
              mx='md'
              p='xl'
              key={team.id}
              sx={{ border: "1px solid gray", borderRadius: "15px" }}
            >
              <Flex justify='space-between' align='center'>
                <h3>{team.name}</h3>
                <HandleManipulation teamId={team.id} />
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
      )}
    </Container>
  );
}

export default ShowTeam;
