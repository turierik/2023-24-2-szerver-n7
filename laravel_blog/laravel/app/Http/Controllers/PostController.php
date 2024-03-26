<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('user') -> get() -> sortByDesc('id');
        return view('posts.index', [ 'posts' => $posts ] );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this -> authorize('create', Post::class);

        return view('posts.create', [
            //'users' => User::all(),
            'tags' => Tag::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this -> authorize('create', Post::class);

        $validated = $request -> validate([
            'title' => 'required|min:3',
            'content' => 'required|min:20',
            // 'user_id' => 'required|integer|exists:users,id',
            'tags[]' => 'array',
            'tags.*' => 'distinct|integer|exists:tags,id'
        ], [
            'title.required' => 'Marika néni, kéne cím.',
            'title.min' => 'Legalább :min karakter kell.'
        ]);

        // itt fixen jó minden :)
        $validated['user_id'] = Auth::id();
        $p = Post::create($validated);
        $p -> tags() -> sync($validated['tags'] ?? []);
        Session::flash('post-created', $p -> title);
        return redirect() -> route('posts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return view('posts.show', [ 'post' => $post ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $this -> authorize('update', $post);

        return view('posts.edit', [
            //'users' => User::all(),
            'tags' => Tag::all(),
            'post' => $post
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $this -> authorize('update', $post);

        $validated = $request -> validate([
            'title' => 'required|min:3',
            'content' => 'required|min:20',
            // 'user_id' => 'required|integer|exists:users,id',
            'tags[]' => 'array',
            'tags.*' => 'distinct|integer|exists:tags,id'
        ], [
            'title.required' => 'Marika néni, kéne cím.',
            'title.min' => 'Legalább :min karakter kell.'
        ]);

        // itt fixen jó minden :)
        // $validated['user_id'] = Auth::id();
        $post -> update($validated);
        $post -> tags() -> sync($validated['tags'] ?? []);
        Session::flash('post-updated', $post -> title);
        return redirect() -> route('posts.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $this -> authorize('delete', $post);

        $post -> delete();
        return redirect() -> route('posts.index');
    }
}
