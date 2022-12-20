import React, { useState, useEffect, useRef } from "react";
import { BiDotsHorizontal, BiEdit, BiTrash  } from 'react-icons/bi';

function Todo(props) {
    const [menu, setMenu] = useState(false);

    const ref = useRef();
    useOutsideClick(ref, () => {
        if (menu) {
            setMenu(false);
        }
    });
    return (
        <li className="todo">
            <input type="checkbox" id="0" onChange={() => { props.complete(props.id) }}></input>
            <p className={props.completed ? "checked" : " "}> {props.name} </p>
            <div className="settings">
                <BiDotsHorizontal 
                    onClick={() => {
                        setMenu(!menu);
                    }}
                />
                <ul className={menu ? "todo-menu show" : "todo-menu"} ref={ref}>
                    <li
                        onClick={() => {
                            props.edit(props.id, props.name);
                        }}
                    >
                       
                       <BiEdit /> Edit
                    </li>
                    <li
                        onClick={() => {
                            props.delete(props.id);
                        }}
                    >
                        <BiTrash /> Delete
                    </li>
                </ul>
            </div>
        </li>
    );
}

function useOutsideClick(ref, callback) {
    useEffect(() => {
        const handleClickOutside = (evt) => {
            if (ref.current && !ref.current.contains(evt.target)) {
                callback();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
}

export default Todo;
