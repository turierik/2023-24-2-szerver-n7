<?php
    require_once("vendor/autoload.php");
    use Cowsayphp\Farm;

    $cow = Farm::create(\Cowsayphp\Farm\Cow::class);
    echo '<pre>'.$cow->say("Ohmg I'm a cow!").'</pre>';
?>