import React, { Component } from "react";
import "./Task.css";
import SimpleDateTime from "react-simple-timestamp-to-date";

class Task extends Component {
  state = {
    // task: this.props.task,
    show: false,
  };

  checkboxStyles = {
    borderStyle: this.state.show === true ? "solid" : "",
  };

  getDate = (currentTimestamp) => {
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(currentTimestamp);
  };

  render() {
    return (
      <div class="row task-item">
        <div class="card col-8" style={{ backgroundColor: "#f4fcf9" }}>
          <div>
            <div class="card-body">
              <h5 style={{ fontWeight: "300" }} class="card-title">
                {this.props.task.description}
              </h5>
              <span style={{ fontWeight: "300" }}>
                <img class="date-icon" src={require("./../resources/date.png")} width="15" height="15" style={{ marginTop: "-5px", marginRight: "5px" }} />
                {this.getDate(this.props.task.date)}
              </span>
            </div>
          </div>
        </div>
        <div class="col-3 m-auto">
          <div class="taskItemCheck" style={this.checkboxStyles}>
            <input class="form-check-input rounded-0 checkBox" type="checkbox" id={this.props.task.id + "-checkbox"} defaultChecked={this.props.task.status} aria-label="..." style={{ backgroundColor: "#f4fcf9" }} />
          </div>
        </div>
      </div>
    );
  }
}

export default Task;
