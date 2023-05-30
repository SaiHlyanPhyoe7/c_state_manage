import { removeTeam, updateTeam } from "@/redux/feature/team/teamSlice";
import { HandleManipulationProps, TeamOP } from "@/types/types";
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

const HandleManipulation: React.FC<HandleManipulationProps> = ({ teamId }) => {
  const [team, setTeam] = useState<TeamOP | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const fetchTeam = () => {
    const teamsJSON = localStorage.getItem("teams");
    const teams: TeamOP[] = teamsJSON ? JSON.parse(teamsJSON) : [];
    const foundTeam = teams.find((team) => team.id === teamId);
    setTeam(foundTeam || null);
  };

  const dispatch = useDispatch();

  const handleUpdate = () => {
    if (team) {
      const teamsJSON = localStorage.getItem("teams");
      const teams: TeamOP[] = teamsJSON ? JSON.parse(teamsJSON) : [];
      const updatedTeams = teams.map((t) => (t.id === teamId ? team : t));
      localStorage.setItem("teams", JSON.stringify(updatedTeams));

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

  const handleDelete = () => {
    const teamsJSON = localStorage.getItem("teams");
    const teams: TeamOP[] = teamsJSON ? JSON.parse(teamsJSON) : [];
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
        <Modal
          size='md'
          opened={opened}
          onClose={close}
          title='Update Team'
          centered
        >
          <Box mx='auto'>
            <TextInput
              pt='md'
              label='Name'
              value={name}
              onChange={(event) =>
                setTeam({ ...team, name: event.currentTarget.value })
              }
            />
            <NumberInput
              pt='md'
              label='Player Count'
              value={playerCount}
              onChange={(value) => setTeam({ ...team, playerCount: value })}
            />
            <TextInput
              pt='md'
              label='Region'
              value={region}
              onChange={(event) =>
                setTeam({ ...team, region: event.currentTarget.value })
              }
            />
            <TextInput
              pt='md'
              label='Country'
              value={country}
              onChange={(event) =>
                setTeam({ ...team, country: event.currentTarget.value })
              }
            />
            <Button mt='lg' onClick={handleUpdate}>
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
