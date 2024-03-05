@extends('layouts.main')

@section('content')
    @foreach($posts as $p)
        {{$p -> id}} {{ $p -> title }} <b>{{ $p -> user -> name }} </b><br>
    @endforeach
@endsection