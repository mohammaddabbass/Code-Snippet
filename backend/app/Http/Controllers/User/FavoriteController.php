<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\Snippet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller {

    public function toggleFavorite($snippetId) {
        try {
            $user = Auth::user();
            if(!$user) {
                return response()->json([
                    "success" => true,
                    "message" => "unauthorized",
                ]);
            }
            $authUser = User::find($user->id);
            $snippet = Snippet::findOrFail($snippetId);
    
            $existingFavorite = $authUser->favorites()->where('snippet_id', $snippetId)->first();
    
            if ($existingFavorite) {
                $existingFavorite->delete();
                $message = 'Removed from favorites';
            } else {
                $authUser->favorites()->create(['snippet_id' => $snippetId]);
                $message = 'Added to favorites';
            }
    
            return response()->json([
                'success' => true,
                'message' => $message
            ]);
    
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Operation failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getUserFavorites(){
        try {
            $favorites = Auth::user()->favorites()->with('snippet.tags')->paginate(15);

            return response()->json([
                'success' => true,
                'data' => $favorites
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Operation failed: ' . $e->getMessage()
            ], 500);
        }
    }
}
