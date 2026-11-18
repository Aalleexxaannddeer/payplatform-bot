// ⚠️ ЗАМЕНИТЕ НА ВАШ URL APPS SCRIPT
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxHQnduDN1rCYTg5kxnj2C10xSZiW4DneyblFVEurc-m1gHXCWiaB_lMqJhJpAG29PY/exec';

exports.handler = async (event, context) => {
  // Разрешаем только POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }
  
  try {
    // Отправляем данные от Telegram в Google Apps Script
    const response = await fetch(APPS_SCRIPT_URL + '?type=telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: event.body
    });
    
    // Логируем ошибки (видно в Netlify Dashboard)
    if (!response.ok) {
      console.error('Apps Script error:', await response.text());
    }
    
    // Всегда возвращаем 200 Telegram'у
    return {
      statusCode: 200,
      body: 'ok'
    };
    
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 200,
      body: 'ok'
    };
  }
};
