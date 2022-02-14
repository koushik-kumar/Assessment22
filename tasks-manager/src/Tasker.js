import "./Tasker.css";
import TasksList from "./components/TasksList";
import React, { Component } from 'react';

class Tasker extends Component {
  state = {  } 
  render() { 
    return (
      <main className="container" style={{ backgroundColor: "#fefefe" }}>
        <div class="row py-2 ">
          <div class="col-6 mx-auto">
            <div class="row">
              <div class="col-md-6">
                <span class="col-2" style={{ fontSize: "30px", fontWeight: "300" }}>
                  Tasker
                </span>
              </div>
              <div class="col-md-6 float-right">
                <button class="btn btn-light" style={{ float: "right" }}>
                  Techformist
                </button>
              </div>
            </div>
          </div>
        </div>
        <TasksList />
      </main>
    );
  }
}
 
export default Tasker;
