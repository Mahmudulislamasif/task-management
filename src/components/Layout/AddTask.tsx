import { useState } from "react";
import { useCreatTaskMutation, useGetAllTaskQuery } from "../stores/slices/PostTask";

export const AddTask = () => {
  const [addTask] = useCreatTaskMutation();
  const { refetch } = useGetAllTaskQuery("");
  const [taskData, setTaskData] = useState({ taskname: "", category: "" });
  const addHandler = async () => {
    try {
      await addTask(taskData).unwrap();
      refetch();
      setTaskData({ taskname: "", category: "" });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  return (
    <div className="bg-slate-100 p-4">
      <div className="container mx-auto text-center mt-7  flex flex-col w-1/4 gap-4">
        <h1 className="text-2xl font-bold">Add Task</h1>
        <input
          type="text"
          name="taskname"
          className="input input-bordered w-full"
          value={taskData.taskname}
          onChange={handleChange}
          placeholder="Enter task name"
        />
        <input
          type="text"
          name="category"
          className="input input-bordered w-fulls"
          value={taskData.category}
          onChange={handleChange}
          placeholder="Enter category"
        />
        <button className="btn btn-info text-white w-full" onClick={addHandler}>
          Add
        </button>
      </div>
    </div>
  );
};
