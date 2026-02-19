import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ error: 'Missing name or email' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || 'false') === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_USER, // envia para a própria caixa como captura inicial
      subject: 'Novo lead — Landing Page Sathya',
      text: `Nome: ${name}\nEmail: ${email}`,
      html: `<p><b>Nome:</b> ${name}</p><p><b>Email:</b> ${email}</p>`,
    });

    return res.status(200).json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error('SMTP error', err);
    return res.status(500).json({ error: 'SMTP failure' });
  }
}
