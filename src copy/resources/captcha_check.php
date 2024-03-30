<?php
session_start();

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: *, Authorization');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json; charset=UTF-8");

$postData = file_get_contents('php://input');
$data = json_decode($postData, true);

// file_put_contents('query.txt', date("d.m.y H:i:s  ") . "1" . "\r\n", FILE_APPEND);

// Получение данных из формы регистрации (ваш HTML-формат)
$captcha = $data['captcha'];


if($captcha != $_SESSION['rand_code']) {
   echo json_encode(
	["success" => false,
	]
);

}else {
   echo json_encode(
      ["success" => true,
      ]
   );
}
exit;
?>
