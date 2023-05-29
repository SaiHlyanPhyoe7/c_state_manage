import React from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Group,
  TextInput,
  NumberInput,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { createTeam } from "../../redux/feature/team/teamSlice";
import { notifications } from "@mantine/notifications";
import { RootState } from "@/redux/store";

interface formVal {
  name: string;
  playerCount: number;
  region: string;
  country: string;
}

export function CreateTeam() {
  const [opened, { open, close }] = useDisclosure(false);
  const teamGs = useSelector((state: RootState) => state.team.teams);

  const form = useForm<formVal>({
    initialValues: {
      name: "",
      playerCount: 0,
      region: "",
      country: "",
    },
    validate: {
      name: (value: string) => {
        if (value.length < 4) {
          return "Name must have at least 4 letters";
        }

        const isNameUnique = !teamGs.some((t) => t.name === value);
        if (!isNameUnique) {
          return "Team name must be unique";
        }

        return null;
      },
      playerCount: (value: number) =>
        value <= 0 ? "Player count must be a positive number" : null,
      region: (value: string) =>
        value.length === 0 ? "Region is required" : null,
      country: (value: string) =>
        value.length === 0 ? "Country is required" : null,
    },
  });
  const dispatch = useDispatch();

  const handleSubmit = (values: formVal) => {
    const team = {
      ...values,
      id: uuidv4(),
    };

    const teamsJSON = localStorage.getItem("teams");
    const existingTeams = teamsJSON ? JSON.parse(teamsJSON) : [];

    const updatedTeams = [...existingTeams, team];

    localStorage.setItem("teams", JSON.stringify(updatedTeams));

    notifications.show({
      autoClose: 3000,
      color: "green",
      title: "Success",
      message: `Team is successfully created.`,
    });

    dispatch(createTeam(team));
    form.reset();
    close();
  };

  return (
    <div>
      <Modal opened={opened} onClose={close} title='Create Your Team' centered>
        <Box maw={400} mx='auto'>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
              label='Name'
              placeholder='Name'
              {...form.getInputProps("name")}
            />
            <NumberInput
              label='Player Count'
              placeholder='Player Count'
              mt='md'
              {...form.getInputProps("playerCount")}
            />
            <TextInput
              label='Region'
              placeholder='Region'
              mt='md'
              {...form.getInputProps("region")}
            />
            <TextInput
              label='Country'
              placeholder='Country'
              mt='md'
              {...form.getInputProps("country")}
            />
            <Button type='submit' mt='md'>
              Submit
            </Button>
          </form>
        </Box>
        {/* Modal content */}
      </Modal>

      <Group position='left'>
        <Button onClick={open}>Create Team</Button>
      </Group>
    </div>
  );
}
