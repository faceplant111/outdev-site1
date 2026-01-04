exports.handler = async function(event, context) {
  // Разрешаем CORS (чтобы не было ошибок)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
  
  // Если это OPTIONS запрос (предварительный от браузера)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  try {
    // Парсим данные
    const body = JSON.parse(event.body);
    console.log('Получены данные:', body);
    
    // Твой токен и chat_id
    const TOKEN = '8454482511:AAG8M9CkkQCqJY781iNg_Oxi5WqfDKo1GRc';
    const CHAT_ID = '8328043359';
    
    // Формируем текст сообщения
    let text = '';
    if (body.type === 'client') {
      text = `🧑‍💼 НОВАЯ ЗАЯВКА НА САЙТ\n\n👤 Имя: ${body.name || 'Не указано'}\n📞 Контакт: ${body.contact || 'Не указано'}\n📋 Проект: ${body.task || 'Не указано'}\n\n🕐 ${new Date().toLocaleString('ru-RU')}`;
    } else if (body.type === 'dev') {
      text = `👨‍💻 ЗАЯВКА РАЗРАБОТЧИКА\n\n👤 Имя: ${body.name || 'Не указано'}\n💻 Навыки: ${body.skills || 'Не указано'}\n📁 Портфолио: ${body.portfolio || 'Не указано'}\n📞 Контакт: ${body.contact || 'Не указано'}\n\n🕐 ${new Date().toLocaleString('ru-RU')}`;
    } else {
      text = `📨 НОВОЕ СООБЩЕНИЕ\n\n${JSON.stringify(body, null, 2)}`;
    }
    
    // Кодируем текст для URL
    const encodedText = encodeURIComponent(text);
    
    // Отправляем в Telegram
    const telegramUrl = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodedText}&parse_mode=HTML`;
    
    console.log('Отправляем в Telegram:', telegramUrl);
    
    const response = await fetch(telegramUrl);
    const result = await response.json();
    
    console.log('Ответ Telegram:', result);
    
    if (result.ok) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          message: 'Заявка отправлена!' 
        })
      };
    } else {
      console.error('Ошибка Telegram:', result);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Ошибка отправки в Telegram',
          details: result 
        })
      };
    }
    
  } catch (error) {
    console.error('Ошибка:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: error.message 
      })
    };
  }
};
