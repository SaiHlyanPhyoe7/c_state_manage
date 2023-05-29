import { removeTeam, updateTeam } from "@/redux/feature/team/teamSlice";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Modal,
  TextInput,
  NumberInput,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

interface Team {
  id: string;
  name: string;
  playerCount?: number | "" | undefined;
  region: string;
  country: string;
}

interface HandleManipulationProps {
  teamId: string;
}

const HandleManipulation: React.FC<HandleManipulationProps> = ({ teamId }) => {
  const [team, setTeam] = useState<Team | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  // Fetch the team from local storage or any other data source
  const fetchTeam = () => {
    const teamsJSON = localStorage.getItem("teams");
    const teams: Team[] = teamsJSON ? JSON.parse(teamsJSON) : [];
    const foundTeam = teams.find((team) => team.id === teamId);
    setTeam(foundTeam || null);
  };

  const dispatch = useDispatch();

  // Update the team with new values
  const handleUpdate = () => {
    if (team) {
      // Update the team in the local storage
      const teamsJSON = localStorage.getItem("teams");
      const teams: Team[] = teamsJSON ? JSON.parse(teamsJSON) : [];
      const updatedTeams = teams.map((t) => (t.id === teamId ? team : t));
      localStorage.setItem("teams", JSON.stringify(updatedTeams));

      // Dispatch the updateTeam action to update the Redux state
      dispatch(updateTeam(team));

      notifications.show({
        autoClose: 3000,
        color: "green",
        title: "Success",
        message: `Team is successfully updated.`,
      });
      close();
    }
  };

  // Delete the team
  const handleDelete = () => {
    // Remove the team from the local storage
    const teamsJSON = localStorage.getItem("teams");
    const teams: Team[] = teamsJSON ? JSON.parse(teamsJSON) : [];
    const updatedTeams = teams.filter((t) => t.id !== teamId);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    notifications.show({
      autoClose: 3000,
      color: "red",
      title: "Success",
      message: `Team ${team?.name} is successfully deleted.`,
    });
    dispatch(removeTeam(teamId));
  };

  // Ensure the team is fetched when the component mounts
  React.useEffect(() => {
    fetchTeam();
  }, []);

  if (!team) {
    return null;
  }

  const { name, playerCount, region, country } = team;

  return (
    <Box>
      <Flex justify='start' align='center'>
        <Modal opened={opened} onClose={close} title='Update Team' centered>
          <Box mx='auto'>
            <TextInput
              label='Name'
              value={name}
              onChange={(event) =>
                setTeam({ ...team, name: event.currentTarget.value })
              }
            />
            <NumberInput
              label='Player Count'
              value={playerCount}
              onChange={(value) => setTeam({ ...team, playerCount: value })}
            />
            <TextInput
              label='Region'
              value={region}
              onChange={(event) =>
                setTeam({ ...team, region: event.currentTarget.value })
              }
            />
            <TextInput
              label='Country'
              value={country}
              onChange={(event) =>
                setTeam({ ...team, country: event.currentTarget.value })
              }
            />
            <Button onClick={handleUpdate} mt='md'>
              Update
            </Button>
          </Box>
        </Modal>

        <Group position='center'>
          <ActionIcon onClick={open}>
            <IconEdit />
          </ActionIcon>
          <UnstyledButton onClick={handleDelete}>
            <IconTrash />
          </UnstyledButton>
        </Group>
      </Flex>
    </Box>
  );
};

export default HandleManipulation;
