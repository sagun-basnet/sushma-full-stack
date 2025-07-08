import React, { useEffect, useState } from "react";
// import { useNavigation } from "react-router-dom";
import axios from "axios";

const App = () => {
  // const navigate = useNavigation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/post-user", formData);
      console.log(res);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      fetchData();
      setIsLoading(false);
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const fetchData = async () => {
    await axios
      .get("http://localhost:5000/get-user")
      .then((res) => {
        // console.log("This is get Response", res.data.result);
        setData(res.data.result);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .post(`http://localhost:5000/delete-user/${parseInt(id)}`)
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEdit = (id) => {
    // navigate(`/edit-user/${id}`);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <form onSubmit={handleSubmit} action="">
        <input
          onChange={handleChange}
          type="text"
          name="name"
          id=""
          value={formData.name}
          placeholder="enter name"
        />
        <input
          onChange={handleChange}
          type="email"
          name="email"
          value={formData.email}
          id=""
          placeholder="enter email"
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          value={formData.password}
          placeholder="enter password"
        />
        <button type="submit">{isLoading ? "Loading..." : "Submit"}</button>
      </form>

      <br />
      <br />
      <br />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idex) => {
            return (
              <tr key={idex}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
          {/* You can map through an array of users here if you have one */}
        </tbody>
      </table>
    </div>
  );
};

export default App;



