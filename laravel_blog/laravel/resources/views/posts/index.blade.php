@extends('layouts.main')

@section('content')

    @if(Session::has('post-created'))
    <div class="bg-green-500 text-xl text-center mb-4 rounded rounded-xl">
        <b>{{ Session::get('post-created') }}</b> című bejegyzés létrehozva!
    </div>
    @endif

    @foreach($posts as $p)
        {{$p -> id}} <a href="{{
            route('posts.show', [ 'post' => $p ] )
        }}">{{ $p -> title }}</a> <b>{{ $p -> user -> name }} </b><br>
    @endforeach
@endsection
