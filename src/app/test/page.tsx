"use client";

import { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Code, NumberInput } from "@mantine/core";

export default function Page() {
  const form = useForm({
    initialValues: {
      name: "Jane",
      playerCount: 0,
      region: "Yangon",
      country: "Myanmar",
    },
  });

  return (
    <Box maw={400} mx='auto'>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
  );
}
