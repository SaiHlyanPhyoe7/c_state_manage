"use client";

import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.scss";
import { RootState } from "@/redux/store";
import { increment } from "@/redux/feature/counter/counterSlice";
import { Title } from "@mantine/core";

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <main>
      {count}
      <Title order={2}>Cat</Title>
      <h2>Next</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </main>
  );
}
