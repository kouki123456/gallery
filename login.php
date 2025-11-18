<?php
require_once('./dbConfig.php');
$link = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
  if ($link == null) {
     die("接続に失敗しました：" . mysqli_connect_error());
  }

session_start();
if ($_SESSION['user'] != null){
    header("location: ./gallery.php");
}
//ユーザーが入力したデータたち
$user = $_POST['name'];
$pass = $_POST['pass'];
//ハッシュ化してDBに保存してるので入力されたデータを再度ハッシュ化
$pass_hash = password_hash($pass, PASSWORD_DEFAULT);
//DBからユーザーidとハッシュ化されたパスワードを取得
$sql = "SELECT 1 FROM user WHERE id = '{$id}' AND pass = '{$pass}'"; //DB作ってからここ変えた方がいいかも
$result = mysqli_query($link, $sql);