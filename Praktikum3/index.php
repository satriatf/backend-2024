<?php 
require_once "construct.php";
$satria = new Person("Satria ", "Bandung ", "Teknik Informatika <br>");
$ferdiansyah = new Person("Ferdiansyah ", "Jakarta ", "Teknik Informatika ");

$satria->cetak();
$ferdiansyah->cetak();