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
    <br><br>

    Szerző:<br>
    <select name="user_id">
        @foreach($users as $u)
            <option value="{{ $u -> id }}" {{ old('user_id', -1) == $u -> id ? 'selected' : '' }}>{{ $u -> name }}</option>
        @endforeach
    </select>
    @error('user_id')
        <span class="text-red-500">{{ $message }}</span>
    @enderror
    <br>
    <button class="rounded rounded-xl bg-green-500 hover:bg-green-700 active:bg-blue-500" type="submit">Mentés</button>
</form>

@endsection
