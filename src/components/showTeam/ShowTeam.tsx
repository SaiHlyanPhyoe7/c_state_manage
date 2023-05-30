import { Box, Container, Title } from "@mantine/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { initializeTeams } from "@/redux/feature/team/teamSlice";
import { Team } from "@/types/types";
import ShowPlayer from "./ShowPlayer";

function ShowTeam() {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.auth.username);

  useEffect(() => {
    const teamsJSON = localStorage.getItem("teams");
    const teamsData: Team[] = teamsJSON ? JSON.parse(teamsJSON) : [];

    dispatch(initializeTeams(teamsData));
  }, [dispatch]);

  return (
    <Box>
      {username && (
        <Container size='xl' my='xl'>
          <Title py='xl' order={2}>
            List Of Teams :
          </Title>
          <ShowPlayer />
        </Container>
      )}
    </Box>
  );
}

export default ShowTeam;
