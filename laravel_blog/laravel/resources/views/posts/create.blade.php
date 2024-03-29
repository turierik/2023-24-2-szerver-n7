@extends('layouts.main')

@section('content')

<form action="{{ route('posts.store') }}" method="POST">
    @csrf

    Cím:<br>
    <input type="text" name="title" value="{{ old('title', '') }}">
    @error('title')
        <span class="text-red-500">{{ $message }}</span>
    @enderror
    <br><br>

    Tartalom:<br>
    <textarea name="content">{{ old('content', '') }}</textarea>
    @error('content')
        <span class="text-red-500">{{ $message }}</span>
    @enderror
    <br>

    Kategóriák:<br>
    @foreach($tags as $t)
        <input type="checkbox" name="tags[]" value="{{ $t -> id }}"> {{ $t -> name }}<br>
    @endforeach

    <button class="rounded rounded-xl bg-green-500 hover:bg-green-700 active:bg-blue-500" type="submit">Mentés</button>
</form>

@endsection
