<?php

namespace App\Http\Controllers;

use App\Models\Todo as Todo; 
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function getTodos()
    {
        return Todo::all();
    }

    public function add(Request $request) {
        $todo = new Todo();
        $todo->name = $request->name;

        $todo->save();
        return ["sucess" => true];
    }

    public function delete(Request $request) {
        $todo = Todo::find($request->id);
        $todo->delete();
        return ["sucess" => true];
    }

    public function update(Request $request) {
        $todo = Todo::find($request->id);
        $todo->name = $request->name;
        $todo->save();
        return ["sucess" => true];
    }

    public function complete(Request $request) {
        $todo = Todo::find($request->id);
        $todo->completed = !$todo->completed;
        $todo->save();
        return ["sucess" => true];
    }
}
