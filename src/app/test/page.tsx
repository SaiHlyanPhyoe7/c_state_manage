"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { increment } from "@/redux/feature/counter/counterSlice";
import { useQuery } from "@tanstack/react-query";

interface Todo {
  userId: number;
  id: number;
  title: number;
  completed: boolean;
}

export default function Test() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
  });

  if (isLoading || !data) return <div>Loading</div>;

  return (
    <main>
      {count}
      <h2>Next</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <div>
        {data.map((x) => {
          return (
            <div key={x.id}>
              <p>{x.title}</p>
              <p>{x.userId}</p>
              <p>{x.completed}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
