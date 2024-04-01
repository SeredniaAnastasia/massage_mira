<?php
session_start();

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: *, Authorization');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json; charset=UTF-8");
$request_method = $_SERVER['REQUEST_METHOD'];

$postData = file_get_contents('php://input');
$data = json_decode($postData, true);

// file_put_contents('query.txt', date("d.m.y H:i:s  ") . "1" . "\r\n", FILE_APPEND);

// Получение данных из формы регистрации (ваш HTML-формат)
$project_name = $data['project_name'];
$admin_email= $data['admin_email'];
$form_subject  = $data['form_subject'];

$user_email  = $data['email'];
$user_phone = $data["phone"];
$form_predmet = $data["form_predmet"];
$form_text = $data["form_text"];

$captcha = $data['captcha'];
$validator = $data[':'];
$message = "";


// if ($request_method === 'POST') {


if ($validator !=''){
  die('No bots!');
}

file_put_contents('captcha.txt', date("d.m.y H:i:s  "). "REQUEST METHOD  " . $request_method ." " . "\r\n", FILE_APPEND);


if($captcha != $_SESSION['rand_code']) {
   echo json_encode(
	["success" => false,
     "message" => "Captcha byl zadán nesprávně: ",
     "captcha" => "error",     "request_m  ethod" => $request_method,
       "SESSION rand_code" => $_SESSION['rand_code'],
     "user_email " => $user_email ,
     "project_name " => $project_name ,
     "form_subject " => $form_subject ,
     "admin_email " => $admin_email ,
     "user_phone " => $user_phone ,
     "captcha_text " => $captcha ,
     "form_predmet " => $form_predmet ,
     "form_text " => $form_text
	]
);
   exit;
}else{

foreach ( $data as $key => $v a lue ) {
file_put_contents('query1.txt', date("d.m.y H:i:s  ") .$key ." ". $value . "\r\n", FILE_APPEND);
		if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" && $key != "captcha") {
			$message .= "
			" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
			</tr>
			";
		}
	}

$message = "<table style='width: 100%;'>$message</table>";

function adopt($text) { return '=?UTF-8?B?'.Base64_encode($text).'?='; };

$adminHeaders = "MIME-Version: 1.0" . "\r\n" .
"Content-Type: text/html; charset=utf-8" . "\r\n" .
"From: " . $project_name . "\r\n" .
"Reply-To: " . $user_email . "" . "\r\n";

$userHeaders = "MIME-Version: 1.0" . "\r\n" .
"Content-Type: text/html; charset=utf-8" . "\r\n" .
"From: " . $project_name . "\r\n" .
"Reply-To: " . $admin_email . "" . "\r\n";

if($user_email) {
   mail($user_email, adopt("Potvrzení o odeslání dopisu"), "Odeslali jste na stránku zprávu " . $project_name, $userHeaders);
}

if (mail($admin_email, adopt($form_subject) , $message, $adminHeaders )) {
 echo json_encode(["success" => true, "message" => "Dopis byl úspěšně odeslán: ", "captcha" => "ok"]);
           exit;
} else {
 echo json_encode(["success" => false, "message" => "Při odesílání dopisu došlo k chybě: ", "captcha" => "undefined" ]);
           exit;
}

}


// }
?>

