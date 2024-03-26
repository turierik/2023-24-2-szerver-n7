<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <div class="container mx-auto">
        <div class="grid grid-cols-4">
            <div class="col-span-4 pb-4">
                <h1 class="text-3xl text-red-500">Szerveroldali blog</h1>
            </div>
            <div class="col-span-3">
                @yield('content')
            </div>
            <div class="">
                @auth
                    Szia, {{ Auth::user() -> name }}!

                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <a href="#" onclick="this.closest('form').submit()">Kijelentkezés</a>

                    </form>
                @endauth

                @guest
                    <a href="{{ route('login') }}">Bejelentkezés</a>
                @endguest
            </div>
        </div>
    </div>
</body>
</html>
