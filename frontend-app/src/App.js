import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get("http://backend:5000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const addUser = async (e) => {
    e.preventDefault();
    await axios.post("http://backend:5000/users", { name, email });
    setUsers([...users, { name, email }]);
    setName("");
    setEmail("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User List</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name} - {user.email}</li>
        ))}
      </ul>
      <h2>Add User</h2>
      <form onSubmit={addUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default App;
