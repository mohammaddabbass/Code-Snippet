<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SnippetTag extends Model
{
    protected $table = 'snippet_tag';
    
    public $incrementing = true;
    
    protected $fillable = [
        'snippet_id',
        'tag_id'
    ];
}
