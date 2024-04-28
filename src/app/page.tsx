"use client";
import { useState } from "react";
import {
  useDeleteTaskMutation,
  useGetAllTaskQuery,
  useUpdateTaskMutation,
} from "@/components/stores/slices/PostTask";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { AddTask } from "@/components/Layout/AddTask";
import { FaXmark } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

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
        <div className="container mx-auto text-center   flex flex-col w-full md:w-1/4 gap-4 ">
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
            <option value="All">ALL</option>
            <option value="Exercise">Exercise</option>
            <option value="Reading">Reading</option>
            <option value="Playing">Playing</option>
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
  const [updateTask] = useUpdateTaskMutation();

  // State variables for managing editing
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<any>({
    taskname: "",
    category: "Exercise",
    status: "Incomplete",
  });
  const handleDelete = async (id: any) => {
    await deleteTask(id).unwrap();
    refetch();
  };
  const handleEdit = (task: any) => {
    // Set the task being edited and open the modal or form for editing
    setEditingTaskId(task.id);
    setEditedTask({ ...task });
  };

  const handleUpdate = async () => {
    try {
      // Call the update task mutation with the edited task details
      await updateTask(editedTask);
      // Close the modal or form after updating
      setEditingTaskId(null);
      // Refetch the task list to display updated data
      refetch();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };
  return (
    <div className="bg-slate-100 py-7">
      <div className="overflow-x-auto container mx-auto w-full md:w-1/2 bg-slate-700 text-white">
        <table className="table ">
          {/* table head */}
          <thead className="text-base text-white">
            <tr>
              <th>ID</th>
              <th>Task Name</th>
              <th>Category</th>
              <th>Status</th>
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
                    {task.status === "Incomplete" ? (
                      <FaXmark className="text-red-500 text-2xl" />
                    ) : (
                      <IoMdCheckmarkCircleOutline className="text-green-500 text-2xl" />
                    )}
                  </td>
                  <td className="flex gap-4">
                    <button onClick={() => handleEdit(task)}>
                      <AiOutlineEdit className="text-green-500 text-2xl" />
                    </button>
                    <button onClick={() => handleDelete(task.id)}>
                      <AiOutlineDelete className="text-red-500 text-2xl" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Modal or form for editing */}
      {editingTaskId && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h1 className="text-xl text-center font-bold mb-4">Edit Task</h1>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="taskname"
                value={editedTask.taskname}
                onChange={handleChange}
                className="input input-bordered mb-2"
                placeholder="Enter task name"
              />
              <select
                name="category"
                value={editedTask.category}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="Exercise">Exercise</option>
                <option value="Reading">Reading</option>
                <option value="Playing">Playing</option>
              </select>
              <select
                name="status"
                value={editedTask.status}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="Incomplete">Incomplete</option>
                <option value="Complete">Complete</option>
              </select>
              <button className="btn btn-primary mr-2" onClick={handleUpdate}>
                Update
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEditingTaskId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
