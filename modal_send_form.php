<?php

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST['f'])) exit('No direct script access allowed');
    if (!isset($_POST['f']['name'])) exit('No direct script access allowed');
    if (!isset($_POST['f']['phone'])) exit('No direct script access allowed');
    if (!isset($_POST['f']['product'])) exit('No direct script access allowed');

    $name = trim(strip_tags($_POST['f']['name']));
    $phone = trim(strip_tags($_POST['f']['phone']));
    $product = trim(strip_tags($_POST['f']['product']));

    if (!$name) exit('Укажите имя');
    if (!$phone) exit('Укажите телефон');
    if (!$product) exit('Укажите название продукта');

    $recipient = "alexahmetov7@gmail.com";

    $subject = "Заявка с сайта";

    $email_content = "Поступил новый заказ";

    $email_headers = "От: магазина кофе";

    $message = 'Имя: ' . $name . "\r\n" . 'Телефон: ' . $phone . "\r\n" . 'Товар: ' . $product;

    if (mail($recipient, $subject, $message, $email_headers)) {
      http_response_code(200);
      echo "Спасибо! Письмо получили :)";
    } else {
      http_response_code(500);
      echo "Упс! Что-то пошло не так, и мы не можем отправить ваше сообщение :(";
    }
  } else {
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
  }
?>
