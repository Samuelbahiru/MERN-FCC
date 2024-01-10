import { React, useState } from "react";
import { API_BASE } from "../config";
import axios from "axios";

const CreateUser = () => {
  const [username, setUsername] = useState();

  const [success, setSucess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = API_BASE + "/users/add";
    let user = username;
    console.log("user", user);
    await axios
      .post(url, {
        username: user,
      })
      .then((res) => setSucess("sucessfully created"));

    setTimeout(() => {
      setSucess("");
      window.location = "/";
    }, 1200);
  };

  return (
    <div className="container">
      <h3>Create User</h3>
      {success && success == "sucessfully created" ? (
        <h5 className="text-success">{success}!</h5>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit}>
        <div className="from-group">
          <label>Username</label>
          <input
            name="username"
            style={{ width: "400px" }}
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            style={{ width: "300px" }}
            className="btn btn-outline-info btn-lg m-3 "
            type="submit"
            value="Create"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
