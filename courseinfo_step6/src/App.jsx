import React from "react";
import Course from "./Course";
import { useState } from "react";

function App(props) {
  const [greetings, setGreetings] = useState(props.greetings);
  const course = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        { id: 1, name: "Fundamentals of React", exercises: 10 },
        { id: 2, name: "Using props to pass data", exercises: 7 },
        { id: 3, name: "State of a component", exercises: 14 },
        { id: 4, name: "Redux", exercises: 11 },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        { id: 1, name: "Routing", exercises: 3 },
        { id: 2, name: "Middlewares", exercises: 7 },
      ],
    },
  ];

  return (
    <>
      <h1>Web development curriculum</h1>
      {course.map((course) => (
        <Course course={course} key={course.id} />
      ))}
    </>
  );
}

export default App;
