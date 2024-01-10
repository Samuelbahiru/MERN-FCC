import { useState, useEffect, React } from "react";
import axios from "axios";
import { API_BASE } from "../config";
import { Link } from "react-router-dom";

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [deleteString, setDelete] = useState("");

  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = exercises.slice(indexOfFirstItem, indexOfLastItem);
  const getExercises = () => {
    let url = API_BASE + "/exercises";
    axios.get(url).then((res) => {
      console.log(res.data);
      setExercises(res.data);
    });
  };

  useEffect(() => {
    getExercises();
  }, []);

  return (
    <div>
      {deleteString ? <p className="text-success">{deleteString}</p> : ""}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Description</th>
            <th scope="col">Duration</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems && currentItems.length > 0
            ? currentItems.map((exercise, index) => {
                return (
                  <tr key={exercise._id}>
                    {/* <th scope="row">{}</th> */}
                    <td>{exercise.username}</td>
                    <td>{exercise.description}</td>
                    <td>{Number(exercise.duration)}</td>
                    <td>{Date(exercise.date)}</td>
                    <td>
                      <button className="btn btn-outline-warning mx-2">
                        <Link
                          className="text-dark"
                          to={`/edit/${exercise._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          Edit
                        </Link>
                      </button>
                      <button
                        className="btn"
                        onClick={() => {
                          let url = `${API_BASE}/exercises/${exercise._id}`;
                          axios
                            .delete(url)
                            .then((res) => setDelete("Successfully Deleted!"));
                          setTimeout(() => {
                            setDelete("");
                            getExercises();
                          }, 1200);
                        }}
                      >
                        <img
                          src="delete.png"
                          style={{
                            width: "20px",
                            height: "20px",
                            objectFit: "cover",
                          }}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })
            : ""}
          <tr>
            <td>
              {exercises.length <= indexOfLastItem ? (
                <button
                  className="btn btn-info mx-3"
                  onClick={() => {
                    setCurrentPage(currentPage - 1);

                    currentItems = exercises.slice(
                      indexOfFirstItem,
                      indexOfLastItem
                    );
                  }}
                >
                  Previous
                </button>
              ) : (
                ""
              )}

              <button
                className="btn btn-info"
                onClick={() => {
                  if (exercises.length > indexOfLastItem) {
                    setCurrentPage(currentPage + 1);
                  }

                  currentItems = exercises.slice(
                    indexOfFirstItem,
                    indexOfLastItem
                  );
                }}
              >
                Next
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExerciseList;
