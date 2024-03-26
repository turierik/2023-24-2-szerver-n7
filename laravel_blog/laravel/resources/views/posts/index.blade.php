@extends('layouts.main')

@section('content')
    @auth
        <a href="{{ route('posts.create') }}">Új bejegyzés</a><br><br>
    @endauth

    @if(Session::has('post-created'))
    <div class="bg-green-500 text-xl text-center mb-4 rounded rounded-xl">
        <b>{{ Session::get('post-created') }}</b> című bejegyzés létrehozva!
    </div>
    @endif

    @forelse($posts as $p)
        {{$p -> id}} <a href="{{
            route('posts.show', [ 'post' => $p ] )
        }}">{{ $p -> title }}</a> <b>{{ $p -> user -> name }} </b><br>
    @empty
        Nincsenek bejegyzések...
    @endforelse
@endsection
