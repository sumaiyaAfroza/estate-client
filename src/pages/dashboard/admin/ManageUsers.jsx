import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UserCheck,
  UserX,
  Shield,
  Briefcase,
  Trash2,
  AlertTriangle,
  Search,
  Filter,
  Users,
  RefreshCw,
} from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      return await axiosSecure.patch(`/users/${id}/role`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      Swal.fire("Success!", "User role updated successfully", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update user role", "error");
    },
  });

  const markFraudMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/users/${id}/fraud`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      Swal.fire(
        "Fraud Marked!",
        "User is flagged and properties removed.",
        "warning"
      );
    },
    onError: () => {
      Swal.fire("Error!", "Failed to mark as fraud", "error");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async ({ id, email }) => {
      await axiosSecure.delete(`/users/${id}`);
      await axiosSecure.delete(`/firebaseUser/${email}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      Swal.fire("Deleted!", "User removed from DB & Firebase", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete user", "error");
    },
  });

  const handleRoleChange = (id, role) => {
    Swal.fire({
      title: "Change Role?",
      text: `Make this user an ${role}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
      confirmButtonColor: "#3b82f6",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRoleMutation.mutate({ id, role });
      }
    });
  };

  const handleMarkFraud = (id) => {
    Swal.fire({
      title: "Mark as Fraud?",
      text: "This will flag the user, remove all their properties, and disable future adding.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Flag",
      confirmButtonColor: "#e11d48",
    }).then((result) => {
      if (result.isConfirmed) {
        markFraudMutation.mutate(id);
      }
    });
  };

  const handleDeleteUser = (id, email) => {
    Swal.fire({
      title: "Delete User?",
      text: "This will delete from database and Firebase. Cannot be undone!",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      confirmButtonColor: "#dc2626",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate({ id, email });
      }
    });
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === "all" ||
      (roleFilter === "fraud" && user.fraud) ||
      (roleFilter !== "fraud" && user.role === roleFilter);
    return matchesSearch && matchesRole;
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-gray-600">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex gap-2 items-center">
          <Users className="w-6 h-6 text-blue-600" />
          Manage Users
        </h2>
        <button
          onClick={refetch}
          className="flex gap-2 items-center px-4 py-1 border rounded text-sm bg-white hover:bg-gray-100"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute top-2.5 left-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded"
          />
        </div>
        <div className="relative w-full sm:w-1/4">
          <Filter className="absolute top-2.5 left-3 text-gray-400 w-5 h-5" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded bg-white"
          >
            <option value="all">All</option>
            <option value="admin">Admin</option>
            <option value="agent">Agent</option>
            <option value="user">User</option>
            <option value="fraud">Fraudulent</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl border">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-3">{user.name || "Unknown"}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">
                  {user.fraud ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <AlertTriangle className="w-3 h-3" /> Fraudulent
                    </span>
                  ) : (
                    <span className="text-green-600 font-medium">Active</span>
                  )}
                </td>
                <td className="px-6 py-3 text-right">
                  <div className="flex justify-end gap-2 flex-wrap">
                    {user.fraud ? (
                      <span className="text-red-600 text-xs font-medium">Fraud</span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleRoleChange(user._id, "admin")}
                          disabled={user.role === "admin"}
                          className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 disabled:opacity-50"
                        >
                          Make Admin
                        </button>
                        <button
                          onClick={() => handleRoleChange(user._id, "agent")}
                          disabled={user.role === "agent"}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 disabled:opacity-50"
                        >
                          Make Agent
                        </button>
                        {user.role === "agent" && (
                          <button
                            onClick={() => handleMarkFraud(user._id)}
                            className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded hover:bg-orange-200"
                          >
                            Mark Fraud
                          </button>
                        )}
                      </>
                    )}
                    <button
                      onClick={() => handleDeleteUser(user._id, user.email)}
                      className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                    >
                      Delete User
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center p-8 text-sm text-gray-500">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;