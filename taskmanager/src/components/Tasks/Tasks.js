import { useState, useEffect, useRef } from "react";
import classes from "./Tasks.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { taskActions } from "../../store/task";

function Tasks() {
  const modalmode = useSelector(state => state.task.modalstate)
  const taskref = useRef();
  const updatedtaskref = useRef();
  const [tasklist, settasklist] = useState([]);
  const [task_id,settask_id] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    gettaskhandler();
  }, []);

  const modalconfiguretoedit = (task_id) => {
    dispatch(taskActions.changetoeditmode())
    settask_id(task_id);
  }

  const modalconfiguretodelete = (task_id) => {
    dispatch(taskActions.changetodeletemode())
    settask_id(task_id);
  }

  const gettaskhandler = () => {
    fetch("http://localhost:8080/gettasks")
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        settasklist(data.taskarray);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addtaskhandler = event => {
    const task = taskref.current.value;
    fetch("http://localhost:8080/addtask", {
      method: "POST",
      body: JSON.stringify({
        taskdetail: task,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        gettaskhandler();
        console.log(data);
      });
  };

  const edittaskhandler = (task_id) => {
    const updatedtask = updatedtaskref.current.value;
    fetch("http://localhost:8080/edittask", {
      method: "POST",
      body: JSON.stringify({
        taskid : task_id,
        taskdetail: updatedtask,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        gettaskhandler();
      });
  }

  const deletetaskhandler = () => {
    fetch("http://localhost:8080/deletetask", {
      method: "POST",
      body: JSON.stringify({
        taskid : task_id,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        gettaskhandler();
      });
  };

  return (
    <div>
      <div class="container">
        <ul className={classes.tasklist}>
          <li>
            <h1>All Tasks</h1>
          </li>
          {tasklist.map(task => {
            return (
              <div key={task._id} class="row">
                <li  className={classes.task}>
                  <div class="col-xs-5">{task.tasktitle}</div>
                  <div class="col-xs-3">
                    <button
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={()=>modalconfiguretoedit(task._id)}
                    >
                      Edit
                    </button>
                  </div>
                  <div class="col-xs-4">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={()=>modalconfiguretodelete(task._id)}
                      class="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {modalmode === "addtask" && "ADD TASK"}
                {modalmode === "edittask" && "EDIT TASK"}
                {modalmode === "deletetask" && "DELETE TASK"}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={addtaskhandler}>
              <div class="modal-body">
                {modalmode === "addtask" && (
                  <div className={classes.molbody}>
                    <label>Enter Task Description</label>
                    <input type="text" required ref={taskref}></input>
                  </div>
                )}
                {modalmode === "edittask" && (
                  <div className={classes.molbody}>
                  <label>Give New Task Description</label>
                  <input type="text" required ref={updatedtaskref}></input>
                </div>
                )}
                {modalmode === "deletetask" && (
                  <div>Are you sure you want to delete this task?</div>
                )}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={(event)=>{
                    event.preventDefault();
                    modalmode === "addtask" && addtaskhandler();
                    modalmode === "edittask" && edittaskhandler(task_id);
                    modalmode === "deletetask" && deletetaskhandler(task_id)
                  } }
                >
                  {modalmode === "addtask" && "Save Task"}
                  {modalmode === "edittask" && "Edit Task"}
                  {modalmode === "deletetask" && "Delete Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
