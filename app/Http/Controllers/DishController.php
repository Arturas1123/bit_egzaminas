<?php

namespace App\Http\Controllers;

use App\Models\Cafe;
use App\Models\Dish;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class DishController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $emfilter=new \stdClass();
        $emfilter->name="";
        $filter=$request->session()->get("dish_filter", $emfilter);
        return inertia('Dishes/Index',[
            'can'=>[
                'edit'=>Gate::allows("edit"),
            ],
            "dishes"=>Dish::filter($filter)->with('cafe')->get(),
            "filter"=>$filter,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Dishes/Create',[
            "cafes"=>Cafe::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required|min:3|max:32',
            'summary'=>'required|min:3|max:255',
            'price'=>'required|numeric',
            'cafe_id'=>'required'
        ],
            [
                'name'=>'Pavadinimas yra privalomas, ne ilgesnis negu 32 ir ne trumpesnis negu 32 simboliai',
                'summary'=>'Santrumpa yra privaloma, ne ilgesne negu 255 simboliai',
                'price'=>'Privalomas, tik skaitmenys',
                'category_id'=>'Privalomas'
            ]);
        $dish = Dish::create($request->all());
        if ($request->file("picture")!=null){
            $request->file("picture")->store("/public/dishes");
            $dish->picture=$request->file("picture")->hashName();
        }
        return to_route("dishes.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(Dish $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dish $dish)
    {
        return inertia("Dishes/Edit",[
            "dish"=>$dish,
            "cafes"=>Cafe::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dish $dish)
    {
        if ($request->file("picture")!=null){
            $request->file("picture")->store("/public/dishes");
            $dish->picture=$request->file("picture")->hashName();
        }
        $dish->fill($request->all());
        $dish->save();
        return to_route("dishes.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dish $dish)
    {
        $dish->delete();
        return to_route("dishes.index");
    }
    public function filter(Request $request){
        $filter=new \stdClass();
        $filter->name=$request->name;
        $request->session()->put("dish_filter", $filter);
        to_route("dishes.index");
    }
}
