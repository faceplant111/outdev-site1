const fetch = require("node-fetch");

exports.handler = async function(event) {
  try {
    const body = JSON.parse(event.body);

    const TOKEN = "8454482511:AAG8M9CkkQCqJY781iNg_Oxi5WqfDKo1GRc";
    const CHAT_ID = "8328043359";

    let text = "";
    if(body.type === "client"){
      text = 🧑‍💼 Заявка на сайт\nИмя: ${body.name}\nКонтакт: ${body.contact}\nПроект: ${body.task};
    } else if(body.type === "dev"){
      text = 👨‍💻 Заявка разработчика\nИмя: ${body.name}\nНавыки: ${body.skills}\nПортфолио: ${body.portfolio}\nКонтакт: ${body.contact};
    }

    const url = https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)};
    const res = await fetch(url);
    if(res.ok){
      return { statusCode:200, body:"Success" };
    }
    return { statusCode:500, body:"Telegram API error" };
  } catch(err){
    return { statusCode:500, body: JSON.stringify(err) };
  }
};
