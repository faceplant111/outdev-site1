const fetch = require("node-fetch");

exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Allow": "POST" },
      body: "Method Not Allowed"
    };
  }

  try {
    const body = JSON.parse(event.body);

    const TOKEN = "ВАШ_ТОКЕН";      // <- вставь свой Telegram Bot токен
    const CHAT_ID = "ВАШ_CHAT_ID";  // <- вставь свой chat_id

    let text = "";

    if (body.type === "client") {
      text = `🧑‍💼 Заявка на сайт
Имя: ${body.name}
Контакт: ${body.contact}
Проект: ${body.task}`;
    } else if (body.type === "dev") {
      text = `👨‍💻 Заявка разработчика
Имя: ${body.name}
Навыки: ${body.skills}
Портфолио: ${body.portfolio}
Контакт: ${body.contact}`;
    } else {
      text = "Неверный тип заявки";
    }

    const url = https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)};
    const res = await fetch(url);

    if (res.ok) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type"
        },
        body: "Success"
      };
    } else {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type"
        },
        body: "Telegram API error"
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify(err)
    };
  }
};
