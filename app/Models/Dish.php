<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dish extends Model
{
    use HasFactory;

    protected $fillable = ['name','summary','price','cafe_id'];

    public function cafe(){
        return $this->belongsTo(Cafe::class);
    }
    public function scopeFilter(Builder $query, $filter){
        if ($filter->name!=null) {
            $query->where("name", "like", "%$filter->name%");
        }

    }
}
