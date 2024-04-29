"use client";
import { useState } from "react";
import {
  useCreatTaskMutation,
  useGetAllTaskQuery,
} from "../../components/stores/slices/PostTask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "@/components/Layout/Layout";
export default function AddTask() {
  const [addTask] = useCreatTaskMutation();
  const { refetch } = useGetAllTaskQuery("");
  const [taskData, setTaskData] = useState({
    taskname: "",
    category: "Exercise",
    status: "Incomplete",
  });
  const addHandler = async () => {
    try {
      await addTask(taskData).unwrap();
      refetch();
      setTaskData({ taskname: "", category: "Exercise", status: "Incomplete" });
      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  return (
    <MainLayout>
      <div className="bg-slate-100 min-h-screen flex justify-center items-center">
        <div className="container mx-auto w-full md:w-1/3 text-center flex flex-col gap-4 p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold">Add Task</h1>
          <input
            type="text"
            name="taskname"
            className="input input-bordered w-full"
            value={taskData.taskname}
            onChange={handleChange}
            placeholder="Enter task name"
            required
          />
          <select
            name="category"
            value={taskData.category}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="Exercise">Exercise</option>
            <option value="Reading">Reading</option>
            <option value="Playing">Playing</option>
          </select>

          <select
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="Incomplete">Incomplete</option>
            <option value="Complete">Complete</option>
          </select>
          <button
            className="btn btn-info text-white w-full"
            onClick={addHandler}
          >
            Add
          </button>
          <ToastContainer />
        </div>
      </div>
    </MainLayout>
  );
}
