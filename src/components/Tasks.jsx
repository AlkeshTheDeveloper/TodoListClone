import React, { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";

import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import addDays from "date-fns/addDays";
import isToday from "date-fns/isToday";
const FORMAT = "dd/MM/yyyy";
function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

const AddTask = ({ onCancel, onAddTask }) => {
  const [date, setDate] = useState(null);
  const [task, setTask] = useState("");
  return (
    <div className="add-task-dialog">
      <input value={task} onChange={(event) => setTask(event.target.value)} />
      <div className="add-task-actions-container">
        <div className="btns-container">
          <button
            className="add-btn"
            onClick={() => {
              onAddTask(task, date);
              onCancel();
              setTask("");
            }}
          >
            Add Task
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              onCancel();
              setTask("");
            }}
          >
            cancel
          </button>
        </div>
        <div className="icon-container">
          <DayPickerInput
            onDayChange={(day) => setDate(day)}
            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
            formatDate={formatDate}
            format={FORMAT}
            dayPickerProps={{
              modifiers: {
                disabled: [{ before: new Date() }],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Tasks_Header_Mapping = {
  INBOX: "Inbox",
  Today: "Today",
  Next_7: "Next 7 days",
};

const TaskItems = ({ selectedTab, tasks }) => {
    let tasksToRender = [...tasks];
    if (selectedTab === 'Next_7') {
         tasksToRender=tasksToRender.filter(
            (task) =>
              isAfter(task.date, new Date()) &&
              isBefore(task.date, addDays(new Date(), 7))
          )
          .map((task) => (
            <p>
              {task.text} {task.text}
              {dateFnsFormat(new Date(task.date), FORMAT)}
            </p>
          ));
    }
     if (selectedTab === "Today") {
         tasksToRender = tasksToRender.filter(
             (task) =>
                 isToday(task.date));
    }
    
    return(<div>
           
        {tasksToRender.map((task) => (
            <div className="task-item">
                <p>
                    {task.text}</p>
                <p> {dateFnsFormat(new Date(task.date), FORMAT)}
                </p>
            </div>
        ))}
    
    </div>)

    
 
}

const Tasks = ({ selectedTab }) => {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const addNewTask = (text, date) => {
    const newTaskItem = { text, date: date || new Date() };
    setTasks((prevstate) => [...prevstate, newTaskItem]);
  };
  return (
    <div className="tasks">
      <h1>{Tasks_Header_Mapping[selectedTab]}</h1>
          {selectedTab === "Inbox" ? (<div
              className="add-task-btn"
              onClick={() => setShowAddTask((prevstate) => !prevstate)}
          >
              <span className="plus">+</span>
              <span className="add-task-text">Add Task</span>
          </div>) : null}
      {showAddTask && (
        <AddTask
          onAddTask={addNewTask}
          onCancel={() => setShowAddTask(false)}
        />
      )}

      {tasks.length > 0 ? (
              <TaskItems tasks={tasks} selectedTab={selectedTab}/>
      ) : (
        <p>No tasks yet</p>
      )}
    </div>
  );
};

export default Tasks;
