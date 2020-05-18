// Vendor
import React from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";

// Internal
import { AddTask } from "../AddTask/AddTask";
import {
  ADD_TASK,
  GET_TODOLIST,
  MODIFY_TASK,
  REMOVE_TASK,
  UP_OR_DOWN_TASK,
} from "../../types/graphql";
import { Task } from "../Task/Task";
import { Task as TaskType } from "../../types/todolist";

// CSS
import "./styles.css";

export interface TodolistProps {
  title?: string;
  className?: string;
}

/**
 * @name Todolist
 * @description Todolist Component, contains some tasks (Task) and a form to add tasks
 */
const Todolist: React.FC<TodolistProps> = (props) => {
  const { title, className } = props;
  let { day } = useParams();
  if (title) {
    day = title.toLowerCase();
  }
  const dayCapitalized = day.charAt(0).toUpperCase() + day.slice(1);

  // Hooks

  // Handlers

  // Markup
  const addTask = () => {};

  const removeTask = () => {};

  const modifyTask = () => {};

  const upOrDownTask = () => {};

  const httpGet = async (url: string) => {
    const response = await fetch(url, {
      method: "GET",
    });
    return response.json();
  };

  const renderTasks = () => {
    let url = "http://localhost:3000/todolists/";
    url = url.concat(day);
    const data = httpGet(url).then((value) => {
      return value;
    });
    console.log(data);
    return data.todolists[indexTodolist].todolist.tasks.map(
      (task: TaskType, index: number) => {
        const { id, text } = task;
        const now = window.performance.now();
        let key = `${id}-${day}-${text}-${now}`;
        return (
          <Task
            texte={text}
            key={key}
            removeTask={removeTask}
            modifyTask={modifyTask}
            upOrDownTask={upOrDownTask}
            id={id}
            title={day}
          />
        );
      }
    );
  };

  return (
    <div className={`todolist ${className}`}>
      <h2>{dayCapitalized}</h2>
      <AddTask addTask={addTask} title={day} />
      {renderTasks()}
    </div>
  );
};

export { Todolist };
