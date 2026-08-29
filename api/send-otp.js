export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: 'Email and code are required' });
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'service_oq4ewto',
        template_id: 'template_3x8c9fh',
        user_id: 'Cq35Uvbp6X2STUGp2',
        template_params: {
          email: email,
          code: code
        }
      })
    });

    if (response.ok) {
      return res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } else {
      const errorText = await response.text();
      return res.status(500).json({ error: errorText });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
