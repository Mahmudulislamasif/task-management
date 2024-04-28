"use client";
import { useState } from "react";
import {
  useCreatTaskMutation,
  useDeleteTaskMutation,
  useGetAllTaskQuery,
} from "@/components/stores/slices/PostTask";
import { AiOutlineDelete } from "react-icons/ai";
import { AddTask } from "@/components/Layout/AddTask";

export default function Home() {
  const { data } = useGetAllTaskQuery("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };
  const filteredData = data?.filter((task: any) => {
    return (
      (selectedCategory === "All" || task.category === selectedCategory) &&
      task.taskname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <div>
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Task Management</a>
        </div>
      </div>
      <AddTask />

      <div className="bg-slate-100">
        <div className="container mx-auto text-center   flex flex-col w-1/4 gap-4 ">
          <h1 className="text-2xl font-bold">Filter</h1>
          <input
            className=" input input-bordered"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search Task"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="select select-bordered  "
          >
            <option value="All">AlL</option>
            <option value="Exercise">Exercise</option>
            <option value="Reading">Reading</option>
          </select>
        </div>
      </div>

      <TaskList tasks={filteredData} />
    </div>
  );
}

const TaskList = ({ tasks }: any) => {
  const [deleteTask] = useDeleteTaskMutation();
  const { refetch } = useGetAllTaskQuery("");

  const handleDelete = async (id: any) => {
    deleteTask(id);
    refetch();
  };
  return (
    <div className="overflow-x-auto container mx-auto">
      <table className="table table-zebra">
        {/* table head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Task Name</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* table body */}
        <tbody>
          {tasks &&
            tasks.map((task: any) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.taskname}</td>
                <td>{task.category}</td>
                <td>
                  <button onClick={() => handleDelete(task.id)}>
                    <AiOutlineDelete className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
