export class MailerService {
  constructor(env) {
    this.apiKey = env.SMTP2GO_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('SMTP2GO_API_KEY environment variable is required');
    }
    
    this.fromEmail = env.SMTP2GO_FROM_EMAIL || 'noreply@learnings.org';
    this.fromName = env.SMTP2GO_FROM_NAME || 'Learnings.org';
  }

  async sendConfirmationEmail(data) {
    const typeLabel = data.type === 'term' ? 'corporate term' : 'wall post';
    
    const emailData = {
      api_key: this.apiKey,
      to: [data.recipientEmail],
      sender: this.fromEmail,
      subject: `Confirm your ${data.type} submission to Learnings.org`,
      html_body: this.generateConfirmationHtml(data),
      text_body: this.generateConfirmationText(data)
    };

    try {
      const response = await fetch('https://api.smtp2go.com/v3/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`SMTP2GO API error: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log(`Confirmation email sent to ${data.recipientEmail}`, result);
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      throw new Error('Failed to send confirmation email');
    }
  }

  generateConfirmationHtml(data) {
    const typeLabel = data.type === 'term' ? 'corporate term' : 'wall post';
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirm Your Submission</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #8b5cf6; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: transparent; color: #2563eb; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; border: 2px solid #8b5cf6; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 Confirm Your Submission</h1>
            </div>
            <div class="content">
              <p>Hi there!</p>
              <p>Thanks for submitting "<strong>${data.title}</strong>" to our corporate buzzword dictionary!</p>
              <p>To complete your ${typeLabel} submission, please click the button below:</p>
              <p style="text-align: center;">
                <a href="${data.confirmationUrl}" class="button">Confirm Submission</a>
              </p>
              <p>This link will expire in 24 hours for security reasons.</p>
              <p>If you didn't submit anything to Learnings.org, you can safely ignore this email.</p>
            </div>
            <div class="footer">
              <p>Learnings.org - Translate your meeting to human</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  generateConfirmationText(data) {
    const typeLabel = data.type === 'term' ? 'corporate term' : 'wall post';
    
    return `
Confirm Your Submission - Learnings.org

Hi there!

Thanks for submitting "${data.title}" to our corporate buzzword dictionary!

To complete your ${typeLabel} submission, please visit this link:
${data.confirmationUrl}

This link will expire in 24 hours for security reasons.

If you didn't submit anything to Learnings.org, you can safely ignore this email.

Best regards,
The Learnings.org Team
    `.trim();
  }
}
