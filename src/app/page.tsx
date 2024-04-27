"use client";
import {
  useCreatTaskMutation,
  useGetAllTaskQuery,
} from "@/components/stores/slices/PostTask";

export default function Home() {
  const { data, isLoading, isError } = useGetAllTaskQuery("");
  const [updatePost, result] = useCreatTaskMutation();
  console.log("result", result);
  return (
    <main className="p-24">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error fetching data</div>}
      {data && (
        <ul>
          {data.map((task: any) => (
            <li key={task.id}>
              {task.id} - {task.category}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() =>
          updatePost({ id: 4, taskname: "walk", category: "exercise" })
        }
      >
        Add Task
      </button>
    </main>
  );
}
