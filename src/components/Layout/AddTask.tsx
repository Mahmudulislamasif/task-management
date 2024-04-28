import { useState } from "react";
import {
  useCreatTaskMutation,
  useGetAllTaskQuery,
} from "../stores/slices/PostTask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AddTask = () => {
  const [addTask] = useCreatTaskMutation();
  const { refetch } = useGetAllTaskQuery("");
  const [taskData, setTaskData] = useState({
    taskname: "",
    category: "",
    status: "Incomplete",
  });
  const addHandler = async () => {
    try {
      await addTask(taskData).unwrap();
      refetch();
      setTaskData({ taskname: "", category: "", status: "Incomplete" });
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
          required
        />
        <input
          type="text"
          name="category"
          className="input input-bordered w-fulls"
          value={taskData.category}
          onChange={handleChange}
          placeholder="Enter category"
          required
        />
        <select
          name="status"
          value={taskData.status}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="Incomplete">Incomplete</option>
          <option value="Complete">Complete</option>
        </select>
        <button className="btn btn-info text-white w-full" onClick={addHandler}>
          Add
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};
