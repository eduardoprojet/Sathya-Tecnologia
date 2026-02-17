export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    
    // Aqui você pode colocar o URL do seu Webhook real
    const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://webhook.site/seu-id-de-teste';

    try {
      console.log('Recebendo lead:', data);
      
      // Simulação de envio para Webhook
      /* 
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      */

      return res.status(200).json({ message: 'Lead capturado com sucesso!' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao processar lead' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
