<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model {
    
    public function snippets() {
        return $this->belongsToMany(Snippet::class, 'snippet_tag');
    }
}
