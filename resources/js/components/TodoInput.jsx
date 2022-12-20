function ToDoInput(props) {
    return (
        <form className="todo-input" onSubmit={(event) => { event.preventDefault(); props.submit(event) }}>
            <input
                type="text"
                defaultValue={props.input}
                onBlur={props.onBlur}
                name="name"
                id="todo-input" 
                placeholder="Add a New Todo + Enter"
            />
        </form>
    );
}

export default ToDoInput;
