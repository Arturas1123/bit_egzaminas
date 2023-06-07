<?php

namespace App\Http\Controllers;

use App\Models\Cafe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CafeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Cafes/Index',[
            'can'=>[
                'edit'=>Gate::allows("edit"),
            ],
            "cafes"=>Cafe::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Cafes/Create',[

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required|min:3|max:32'
        ],
            [
                'name'=>'Privalomas'
            ]);
        Cafe::create($request->all());
        return to_route("cafes.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(Cafe $cafe)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cafe $cafe)
    {
        return inertia("Cafes/Edit",[
            "cafe"=>$cafe,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cafe $cafe)
    {
        $cafe->fill($request->all());
        $cafe->save();
        return to_route("cafes.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cafe $cafe)
    {
        $cafe->delete();
        return to_route("cafes.index");
    }
}
