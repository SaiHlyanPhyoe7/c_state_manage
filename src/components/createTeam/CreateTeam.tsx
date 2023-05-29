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
import { useDispatch } from "react-redux";
import { createTeam } from "../../redux/feature/team/teamSlice";

interface formVal {
  name: string;
  playerCount: number;
  region: string;
  country: string;
}

export function CreateTeam() {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<formVal>({
    initialValues: {
      name: "Jane",
      playerCount: 0,
      region: "Yangon",
      country: "Myanmar",
    },
  });
  const dispatch = useDispatch();

  const handleSubmit = (values: formVal) => {
    const team = {
      ...values,
      id: uuidv4(),
    };

    // Retrieve existing teams array from local storage
    const teamsJSON = localStorage.getItem("teams");
    const existingTeams = teamsJSON ? JSON.parse(teamsJSON) : [];

    // Add the new team to the existing array
    const updatedTeams = [...existingTeams, team];

    // Store the updated teams array in local storage
    localStorage.setItem("teams", JSON.stringify(updatedTeams));

    // Dispatch the createTeam action to update the global state
    dispatch(createTeam(team));
    close();
  };

  return (
    <div>
      <Modal opened={opened} onClose={close} title='Create Your Team'>
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
