import React from "react";

export default function Course({ course }) {
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total
        totalExercises={course.parts.reduce(
          (sum, curr) => sum + curr.exercises,
          0
        )}
      />
    </>
  );
}

function Header({ courseName }) {
  return <h2>{courseName}</h2>;
}

function Content({ parts }) {
  return (
    <>
      {parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </>
  );
}

function Part({ part, exercises }) {
  return (
    <p>
      {part}: {exercises} exercises
    </p>
  );
}

function Total({ totalExercises }) {
  return (
    <p style={{ fontWeight: "bold" }}>
      Total number of exercises are:
      {totalExercises}
    </p>
  );
}
