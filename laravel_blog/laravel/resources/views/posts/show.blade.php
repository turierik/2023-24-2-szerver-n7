@extends('layouts.main')

@section('content')

@can ('update', $post)
    <a href="{{ route('posts.edit', ['post' => $post ]) }}">Szerkesztés</a>
@endcan

@can ('delete', $post)
    <form action="{{ route('posts.destroy', ['post' => $post])}}" method="POST">
        @csrf
        @method('DELETE')
        <a href="#" onclick="this.closest('form').submit()">Törlés</a>
    </form>
@endcan

<h2 class="text-xl">{{ $post -> title }}</h2>
<i>{{ $post -> user -> name }} </i><br>
{{ $post -> content}}

@endsection
