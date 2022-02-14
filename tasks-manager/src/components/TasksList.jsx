import React, { Component } from "react";
import Task from "./Task";
import "./TasksList.css";
import axios from "axios";

const getTasksEndPoint = "http://localhost:8080/tasks/all";
const postTasksEndPoint = "http://localhost:8080/tasks/add";
class TasksList extends Component {
  state = {
    addTaskDisplay: false,
    tasks: [],
    task: { description: "", date: "" },
  };

  constructor() {
    super();
    this.getLatestTasks();
  }

  // componentDidMount() {
  //   this.addTaskDisplay = true;
  //   this.getLatestTasks();
  // }

  handleChange = (e) => {
    const task = { ...this.state.task };
    task[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ task });
  };

  // handleSubmit = async (e) => {
  //   console.log("Test");
  // };
  handleSubmit = async (task, e) => {
    console.log("HEHEHHE");
    e.preventDefault();
    const task_data = {
      description: task.description,
      date: task.date,
      status: false,
    };
    console.log(task_data);
    await axios
      .post(postTasksEndPoint, task_data)
      .then((response) => {
        console.log("task added");
        // this.setState((this.addTaskDisplay = true));
        window.location.reload();
      })
      .catch((error) => {
        alert("error", error.response);
        console.log(error);
      });
  };

  async getLatestTasks() {
    const { data: tasks } = await axios.get(getTasksEndPoint);
    this.setState({ tasks });
  }

  renderTasks() {
    if (this.state.tasks.length === 0) return <p>Currently no tasks!</p>;
    return this.state.tasks.map((task) => (
      <div key={task.id}>
        <Task key={task.id} task={task} />
        <br></br>
      </div>
    ));
  }

  // addTaskStyles() {
  //   let margin= "0";
  //   let display= "none";
  // }

  showAddTask = () => {
    this.setState({ addTaskDisplay: !this.state.addTaskDisplay });
  };

  render() {
    
    return (
      <div class="col-6 mx-auto p-3" style={{ backgroundColor: "#f4fcf9" }}>
        <div class="row" style={{ margin: 0 }}>
          <div class="pb-3 mx-auto">
            <button type="button" class="btn btn-outline-secondary" onClick={this.showAddTask} style={{ float: "right" }}>
              {this.state.addTaskDisplay === true ? <img width="30px" class="date-icon" src={require("./../resources/min.png")} /> : "Add New"}
            </button>
          </div>
        </div>

        <div class="row" style={{ margin: 0, display: this.state.addTaskDisplay ? "flex" : "none" }}>
          <div
            class="mx-auto"
            style={{
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: "rgb(207 211 209)",
              paddingTop: "25px",
              paddingBottom: "20px",
              boxShadow: "0px 0px 2px 0.1rem rgb(207 211 209)",
            }}
          >
            <h4 style={{ textAlign: "center", fontWeight: "350" }}>Add Task</h4>
            <form onSubmit={this.handleSubmit.bind(this, this.state.task)}>
              <div class="form-group">
                <label for="exampleInputEmail1" style={{ fontWeight: "bold", color: "grey" }}>
                  Description
                </label>
                <input
                  autoFocus
                  name="description"
                  type="text"
                  class="form-control"
                  id="description"
                  aria-describedby="taskDescription"
                  onChange={this.handleChange}
                  style={{
                    borderWidth: "2px",
                    backgroundColor: "#f4fcf9",
                  }}
                />
                {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
              </div>
              <br></br>
              <div class="form-group">
                <label for="exampleInputPassword1" style={{ fontWeight: "bold", color: "grey" }}>
                  Date
                </label>
                <input
                  name="date"
                  placeholder="task date"
                  type="date"
                  class="form-control"
                  id="date"
                  onChange={this.handleChange}
                  style={{
                    borderWidth: "2px",
                    backgroundColor: "#f4fcf9",
                  }}
                />
              </div>
              <br></br>
              <button type="submit" class="btn btn-secondary" style={{ float: "right" }}>
                Save
              </button>
            </form>
          </div>
        </div>
        <br></br>
        <div class="row" style={{ margin: 0 }}>
          <div
            class="mx-auto"
            style={{
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: "rgb(207 211 209)",
              padding: "25px",
              boxShadow: "0px 0px 2px 0.1rem rgb(207 211 209)",
              marginTop: "10px",
            }}
          >
            {this.renderTasks()}
            {/* <Task /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default TasksList;
