@extends('layouts.main')

@section('content')

<form action="{{ route('posts.update', ['post' => $post ]) }}" method="POST">
    @csrf
    @method('PATCH')

    Cím:<br>
    <input type="text" name="title" value="{{ old('title', $post -> title) }}">
    @error('title')
        <span class="text-red-500">{{ $message }}</span>
    @enderror
    <br><br>

    Tartalom:<br>
    <textarea name="content">{{ old('content', $post -> content) }}</textarea>
    @error('content')
        <span class="text-red-500">{{ $message }}</span>
    @enderror
    <br>

    Kategóriák:<br>
    @foreach($tags as $t)
        <input type="checkbox" name="tags[]" value="{{ $t -> id }}"
        {{ in_array($t -> id, old('tags[]', $post -> tags -> pluck('id') -> toArray()))  ? "checked" : ""}}
        > {{ $t -> name }}<br>
    @endforeach

    <button class="rounded rounded-xl bg-green-500 hover:bg-green-700 active:bg-blue-500" type="submit">Mentés</button>
</form>

@endsection
