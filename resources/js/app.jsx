import React from "react";
import ReactDOM from "react-dom/client";
import Todo from "./components/Todo";
import ToDoInput from "./components/TodoInput";
import fetchCsrf from "./csrf";

class App extends React.Component {
    state = {
        todos: [],
        focus: null,
        input: "",
    };

    render() {
        const todos = this.state.todos.map((todo, index) => {
            return (
                <Todo
                    name={todo.name}
                    id={todo.id}
                    completed={todo.completed}
                    delete={this.delete.bind(this)}
                    edit={this.edit.bind(this)}
                    complete={this.complete.bind(this)}
                />
            );
        });

        return (
            <div class="wrapper">
                <ToDoInput
                    submit={this.submit.bind(this)}
                    onBlur={this.resetFocus.bind(this)}
                    input={this.state.input}
                />
                <ul className="todo-box">{todos}</ul>
            </div>
        );
    }

    componentDidMount() {
        this.getTodos();
    }

    async getTodos() {
        const response = await fetch("/getTodos");
        this.setState({ todos: await response.json() });
    }

    async submit(event) {
        let input = event.target[0].value;
        if (input === "") return;

        if (this.state.focus == null) {
            await fetchCsrf("add", { name: input });
            this.getTodos();
        } else {
            await fetchCsrf("update", { name: input, id: this.state.focus });
            this.resetFocus();
        }

        this.getTodos();
    }

    async delete(id) {
        await fetchCsrf("delete", { id: id });
        this.getTodos();
    }

    async complete(id) {
        await fetchCsrf("complete", { id: id});
        this.getTodos();
    }

    edit(id, input) {
        document.getElementById("todo-input").placeholder = "Edit the Todo + Enter";
        document.getElementById("todo-input").focus();

        this.setState({ focus: id, input: input });
    }

    resetFocus() {
        document.getElementById("todo-input").value = "";
        document.getElementById("todo-input").placeholder =
            "Add the New Todo + Enter";

        this.setState({ focus: null, input: "" });
    }
}

if (document.getElementById("root")) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
