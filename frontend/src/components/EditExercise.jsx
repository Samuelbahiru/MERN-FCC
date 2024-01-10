import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditExercise = () => {
  const [exercise, setExercise] = useState();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState("");

  const [success, setSucess] = useState("");

  const getEditItem = async () => {
    let url = API_BASE + "/exercises/" + id;
    await axios.get(url).then((res) => {
      console.log("resdata", res.data);
      setExercise(res.data);
      setUsername(res.data.username);
      setDescription(res.data.description);
      setDuration(Number(res.data.duration));
      setDate(new Date(res.data.date));
    });
  };

  const getUsers = async () => {
    let url = API_BASE + "/users/";
    let users = await axios.get(url);

    setUsers(users.data);
  };

  useEffect(() => {
    getEditItem();
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = API_BASE + "/exercises/update/" + id;
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
      {" "}
      <div>
        <h3>Update Exercise Log</h3>
        {success && success == "sucessfully Updated" ? (
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
                <option value={username} disabled selected>
                  {username}
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
                value="Update Exercise"
                className="btn btn-info"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditExercise;
