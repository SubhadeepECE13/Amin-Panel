import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role_id: 1,
  });

  // Get token from localStorage
  const Authorization = localStorage.getItem("token");
  const token = Authorization ? ` ${Authorization}` : null;

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        console.error("No token found. Redirecting to login...");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUsers(data);
        } else {
          console.error("Error fetching users:", data.message);
        }
      } catch (error) {
        console.error("⚠️ Network error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token]);

  // Add user
  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(newUser),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setUsers([...users, result.user]);
      setNewUser({ name: "", email: "", phone: "", role_id:1 });
    } catch (error) {
      console.error("⚠️ Error adding user:", error.message);
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    if (!token) {
      console.error("Authorization token missing.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });

      if (!response.ok) throw new Error("Failed to delete user");

      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("⚠️ Error deleting user:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              className="input-field"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="input-field"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              required
              className="input-field"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              className="input-field"
              value={newUser.role_id}
              onChange={(e) => setNewUser({ ...newUser, role_id: e.target.value })}
            >
              <option value="2">Team Leader</option>
              <option value="1">Telecaller</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">Add User</button>
        </form>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">User List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.role_id}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDeleteUser(user.id)} className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
