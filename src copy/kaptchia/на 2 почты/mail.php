<?php
// Если скрытое поле заполнили
if ($_POST[':']!=''){
  die('No bots!');
}

session_start();
if($_POST['kapcha'] != $_SESSION['rand_code']) echo "Капча введена неверно";
else{
/* получатели */
$to= "1 <adress1@gmail.com>" . ", " ; //обратите внимание на запятую
$to .= "2 <adress2@gmail.com>";
$subject = "Отправка формы с сайта такого-то"; // заголовок письма
$redirect = "./ok.html"; // адрес страницы, на которую нужно перейти после отправки письма

foreach($_POST as $key => $value)
{ $fields .= $key.": ".$value." \r\n"; }
$message = $subject." \r\n".$fields; 
$headers  = "Content-type:  text/plain; charset=utf-8 \r\n"; 
mail($to, $subject, $message, $headers);
header('Location: '.$redirect);
}
?>
