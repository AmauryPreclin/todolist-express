// Vendor
import React from "react";

export interface AddTaskProps {
  addTask: Function;
  title: string;
}

/**
 * @name AddTask
 * @description Form to add task
 */
const AddTask: React.FC<AddTaskProps> = (props) => {
  const { addTask, title } = props;

  // Hooks
  const [taskName, setTaskName] = React.useState("");
  const [taskId, setTaskId] = React.useState(0);

  // Handlers
  const handleChange = (event: any) => {
    setTaskName(event.target.value);
  };

  const handleClick = () => {
    if (taskName) {
      addTask({ variables: { text: taskName, id: taskId, title: title } });
      setTaskName("");
      setTaskId(taskId + 1);
      const response = httpGet("http://localhost:3000/players");
      console.log("handleClick -> response", response);
    }
  };

  // Markups
  const httpGet = async (url: string) => {
    const response = await fetch(url, {
      method: "GET",
    });
    return response.json();
  };

  return (
    <div>
      <div>
        <span>Task: </span>
        <input value={taskName} onChange={handleChange}></input>
      </div>
      <button onClick={handleClick} type="button">{`Add task ${title}`}</button>
    </div>
  );
};

export { AddTask };
