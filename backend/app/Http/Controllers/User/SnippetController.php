<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Snippet;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SnippetController extends Controller{

    public function getSnippets(Request $request)
    {
        try {
            $user = Auth::user();
    
            if (!$user) {
                return response()->json([
                    "success" => false,
                    "message" => "Unauthorized",
                    "data" => null
                ], 401);
            }
    
            $query = Snippet::with(["user", "tags"])
                ->where("user_id", $user->id)
                ->orderBy("created_at", "desc");
    
            if ($request->has("language")) {
                $query->where("language", $request->language);
            }
    
            if ($request->has("tag")) {
                $query->whereHas("tags", function ($q) use ($request) {
                    $q->where("name", $request->tag);
                });
            }
    
            $perPage = $request->per_page ?? 15;
            $snippets = $query->paginate($perPage);
    
            return response()->json([
                "success" => true,
                "message" => "Snippets retrieved successfully",
                "data" => $snippets
            ], 200);
    
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Operation failed: " . $e->getMessage(),
                "data" => null
            ], 500);
        }
    }
    

    public function addOrUpdateSnippets(Request $request, $id = "add")
    {
        try {
            $snippet = ($id == "add") ? new Snippet() : Snippet::find($id);
            
            if (!$snippet && $id != "add") {
                return response()->json([
                    "success" => false,
                    "message" => "Snippet not found",
                    "data" => null
                ], 404);
            }
    
            $data = [
                "title" => "required|string|max:255",
                "code" => "required|string",
                "language" => "required|string|max:50",
                "tags" => "nullable|array",
                "tags.*" => "string|max:255"
            ];
    
            $validatedData = $request->validate($data);
    
            $snippet->user_id = Auth::user()->id;
            
            $snippet->fill($validatedData);
            $snippet->save();
    
            if ($request->has("tags")) {    
                $tagIds = [];
                foreach ($validatedData["tags"] as $tagName) {
                    $tag = Tag::firstOrCreate(["name" => $tagName]);
                    $tagIds[] = $tag->id;
                }
                $snippet->tags()->sync($tagIds);
            }
    
            $snippet->load("tags");
    
            return response()->json([
                "success" => true,
                "message" => ($id == "add") ? "Snippet created successfully" : "Snippet updated successfully",
                "data" => $snippet
            ], ($id == "add") ? 201 : 200);
    
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Operation failed: " . $e->getMessage(),
                "data" => null
            ], 500);
        }
    }

    public function getSnippetById($id) {
        try {
            $snippet = Snippet::with(["user", "tags", "favorites"])
                ->findOrFail($id);

            return response()->json([
                "success" => true,
                "data" => $snippet
            ]);

        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "error" => "No snippets found "
            ]);
        }
    }
}
