<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Snippet extends Model{
    
    public function user() {
        return $this->belongsTo(User::class);
    }
    
    public function favorites() {
        return $this->hasMany(Favorite::class);
    }
    
    public function tags() {
        return $this->belongsToMany(Tag::class, 'snippet_tag');
    }
}
