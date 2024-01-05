import { useState, React, useEffect } from "react";
import { API_BASE } from "../config";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CreateExercise = () => {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [success, setSucess] = useState("");

  const getUsers = async () => {
    let url = API_BASE + "/users/";
    let users = await axios.get(url);

    setUsers(users.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = API_BASE + "/exercises/add";
    const data = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    };
    console.log("data", data);
    const res = await axios.post(url, data);

    if (res.data) {
      setSucess("sucessfully created");
    }

    setTimeout(() => {
      setSucess("");
      window.location = "/";
    }, 2000);
  };

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      {success && success == "sucessfully created" ? (
        <h5 className="text-success">{success}!</h5>
      ) : (
        ""
      )}
      <div className="mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              required
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            >
              <option value="" disabled selected>
                Select User
              </option>
              {users &&
                users.map((user) => {
                  return (
                    <option key={user._id} value={user.username}>
                      {user.username}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Duration(in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <ReactDatePicker
                selected={date}
                onChange={(date) => setDate(date)}
              />
            </div>
          </div>
          <div className="form-group my-3">
            <input
              type="submit"
              value="Create Exercise"
              className="btn btn-info"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExercise;
