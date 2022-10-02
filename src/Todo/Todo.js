import { useState } from "react";

const useInputValue = (inputValue) => {
  const [value, setValue] = useState(inputValue);

  return {
    value,
    type: "text",
    onChange: (e) => setValue(e.target.value),
    resetValue: () => setValue(""),
  };
};

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const { resetValue, ...text } = useInputValue("");

  const addTodo = (e) => {
    e.preventDefault();

    setTodos([
      ...todos,
      {
        text: text.value,
        completed: false,
      },
    ]);
    resetValue("");
  };

  const toggleCompleted = (i) => {
    setTodos(
      todos.map((todo, k) =>
        k === i
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          margin: "0 auto",
        }}
        onSubmit={(e) => addTodo(e)}
      >
        <input {...text} />
      </form>
      {todos.map(({ text, completed }, i) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "3rem",
              margin: "20px auto",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              onClick={() => toggleCompleted(i)}
              style={{
                marginRight: "20px",
                textDecoration: completed ? "line-through" : "none",
              }}
            >
              {text}
            </div>
            <div style={{ backgroundColor: "red", padding: "5px" }}>X</div>
          </div>
        ); 
      })}
      <button onClick={() => setTodos([])}>reset todo</button>
    </div>
  );
};
