import React, { FC, useEffect, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { toast } from "react-hot-toast";

type Props = {
  isTeam?: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully");
      setActive(false);
    }
    if (deleteSuccess) {
      refetch();
      toast.success("User deleted successfully!");
      setOpen(false);
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [updateError, isSuccess, deleteSuccess, deleteError]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterRole(event.target.value);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
  };

  const filteredRows = data?.users
    ?.filter((user: any) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user: any) => (filterRole === "All" ? true : user.role === filterRole)) || [];

  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);

  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };

  const handleDelete = async () => {
    await deleteUser(userId);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="mt-[20px] ">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight dark:text-white text-black">All Users</h2>
          </div>
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="appearance-none h-full rounded-l border block appearance-none w-full bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-700 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-700 focus:border-gray-500"
                >
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-200">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select
                  value={filterRole}
                  onChange={handleFilter}
                  className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-700 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white dark:focus:bg-gray-700 focus:border-gray-500"
                >
                  <option>All</option>
                  <option>user</option>
                  <option>admin</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-200">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500 dark:text-gray-200">
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <input
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search"
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 dark:border-gray-700 block pl-8 pr-6 py-2 w-full bg-white dark:bg-gray-800 text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-700 dark:text-gray-200 focus:bg-white dark:focus:bg-gray-700 focus:placeholder-gray-600 focus:text-gray-700 dark:focus:text-gray-200 focus:outline-none"
              />
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">User</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">Role</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">Joined At</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={5}>
                        <Loader />
                      </td>
                    </tr>
                  ) : (
                    paginatedRows.map((row : any) => (
                      <tr key={row.id}>
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img className="w-full h-full rounded-full" src="https://via.placeholder.com/40" alt="" />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 dark:text-gray-200 whitespace-no-wrap">{row.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                          <p className="text-gray-900 dark:text-gray-200 whitespace-no-wrap">{row.role}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                          <p className="text-gray-900 dark:text-gray-200 whitespace-no-wrap">{format(row.createdAt)}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                          <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${row.isVerified ? 'text-green-900' : 'text-red-900'}`}>
                            <span aria-hidden className={`absolute inset-0 ${row.isVerified ? 'bg-green-200' : 'bg-red-200'} opacity-50 rounded-full`}></span>
                            <span className="relative">{row.isVerified ? 'Active' : 'Inactive'}</span>
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                          <div className="flex items-center space-x-4">
                            <Button
                              onClick={() => {
                                setOpen(true);
                                setUserId(row.id);
                              }}
                            >
                              <AiOutlineDelete className="text-red-600 hover:text-red-800" size={20} />
                            </Button>
                            <a href={`mailto:${row.email}`}>
                              <AiOutlineMail className="text-blue-600 hover:text-blue-800" size={20} />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className="px-5 py-5 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex flex-col xs:flex-row items-center xs:justify-between">
                <span className="text-xs xs:text-sm text-gray-900 dark:text-gray-200">
                  Showing {currentPage} to {totalPages} of {filteredRows.length} Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button
                    onClick={handlePrevPage}
                    className="text-sm bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  <button
                    onClick={handleNextPage}
                    className="text-sm bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {active && (
        <Modal
          open={active}
          onClose={() => setActive(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
            <h1 className="text-xl font-semibold mb-4 dark:text-white">
              Add New Member
            </h1>
            <div className="mt-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email..."
                className="w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
              <select
                name=""
                id=""
                className="w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                onChange={(e: any) => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <div
                className="bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer text-center"
                onClick={handleSubmit}
              >
                Submit
              </div>
            </div>
          </Box>
        </Modal>
      )}

      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
            <h1 className="text-xl font-semibold mb-4 dark:text-white">
              Are you sure you want to delete this user?
            </h1>
            <div className="flex w-full items-center justify-between mb-6 mt-4">
              <div
                className="bg-[#57c7a3] text-white py-2 px-4 rounded-md cursor-pointer"
                onClick={() => setOpen(false)}
              >
                Cancel
              </div>
              <div
                className="bg-[#d63f3f] text-white py-2 px-4 rounded-md cursor-pointer"
                onClick={handleDelete}
              >
                Delete
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default AllUsers;
