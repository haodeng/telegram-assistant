addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
    const { method, url } = request;
    if (method === 'POST') {
      const body = await request.text();
      const payload = JSON.parse(body);
  
      if (payload.message) {
        const chatId = payload.message.chat.id;
        const messageText = payload.message.text;
  
        // Echo the received message back to the user
        const response = await sendMessage(chatId, messageText);
  
        return new Response(JSON.stringify(response), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
  
    return new Response('OK');
  }
  
  async function sendMessage(chatId, text) {
    const token = '<TOKEN>';
    const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;
  
    const data = {
      chat_id: chatId,
      text,
    };
  
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  
    return response.json();
  }
  