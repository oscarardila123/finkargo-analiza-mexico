import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  try {
    if (!resend) {
      console.log('[DEV] Email sending disabled - no RESEND_API_KEY configured')
      return { success: true, data: null }
    }

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Finkargo Analiza <noreply@finkargo.com>',
      to: [email],
      subject: 'Restablecer tu contraseña de Finkargo Analiza',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Restablecer contraseña</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
              🔐 Finkargo Analiza
            </h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
              Solicitud de restablecimiento de contraseña
            </p>
          </div>
          
          <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2563eb; margin-top: 0;">¡Hola!</h2>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en <strong>Finkargo Analiza</strong>.
            </p>
            
            <p style="font-size: 16px; margin-bottom: 30px;">
              Si no realizaste esta solicitud, puedes ignorar este correo. Tu contraseña no será modificada.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="background-color: #2563eb; 
                             color: white; 
                             text-decoration: none; 
                             padding: 15px 30px; 
                             border-radius: 8px; 
                             font-weight: 600; 
                             font-size: 16px;
                             text-align: center;">
                    <a href="${resetUrl}" 
                       style="color: white; 
                              text-decoration: none; 
                              display: block;
                              font-weight: 600;">
                      🔑 Restablecer mi contraseña
                    </a>
                  </td>
                </tr>
              </table>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 30px 0;">
              <p style="margin: 0; font-size: 14px; color: #92400e;">
                <strong>⚠️ Importante:</strong> Este enlace expira en 24 horas por seguridad.
              </p>
            </div>
            
            <p style="font-size: 14px; color: #6b7280; margin-bottom: 10px;">
              Si el botón no funciona, copia y pega este enlace en tu navegador:
            </p>
            <p style="font-size: 12px; color: #9ca3af; word-break: break-all; background: #f8fafc; padding: 10px; border-radius: 4px;">
              ${resetUrl}
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <div style="text-align: center;">
              <p style="color: #6b7280; font-size: 14px; margin: 10px 0;">
                <strong>Finkargo Analiza</strong><br>
                Plataforma de Inteligencia Comercial<br>
                Operando en México
              </p>
              
              <div style="margin-top: 20px;">
                <p style="color: #9ca3af; font-size: 12px; margin: 5px 0;">
                  Este correo fue enviado automáticamente. Por favor no respondas a este mensaje.
                </p>
                <p style="color: #9ca3af; font-size: 12px; margin: 5px 0;">
                  Si tienes problemas, contacta nuestro soporte en <a href="mailto:soporte@finkargo.com" style="color: #2563eb;">soporte@finkargo.com</a>
                </p>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #9ca3af; font-size: 11px;">
              © 2024 Finkargo Analiza. Todos los derechos reservados.
            </p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Error sending email:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending password reset email:', error)
    return { success: false, error }
  }
}

export async function sendWelcomeEmail(email: string, name: string, isComceMember: boolean = false) {
  try {
    if (!resend) {
      console.log('[DEV] Email sending disabled - no RESEND_API_KEY configured')
      return { success: true, data: null }
    }

    // COMCE discount section HTML (only shown if user is COMCE member)
    const comceSection = isComceMember ? `
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                  padding: 25px;
                  border-radius: 12px;
                  margin: 30px 0;
                  text-align: center;
                  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);">
        <h3 style="color: white; margin: 0 0 15px 0; font-size: 22px;">
          🎁 ¡Beneficio Exclusivo Socio COMCE!
        </h3>
        <p style="color: rgba(255,255,255,0.95); font-size: 16px; margin-bottom: 20px;">
          Como socio COMCE, tienes acceso a un <strong>descuento especial del 15%</strong> en todos nuestros planes.
        </p>
        <div style="background: white;
                    padding: 20px;
                    border-radius: 8px;
                    display: inline-block;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
          <p style="color: #059669; margin: 0 0 10px 0; font-size: 14px; font-weight: 600;">
            TU CÓDIGO DE DESCUENTO:
          </p>
          <div style="background: #f0fdf4;
                      border: 2px dashed #10b981;
                      padding: 15px 30px;
                      border-radius: 6px;">
            <p style="color: #047857;
                      margin: 0;
                      font-size: 28px;
                      font-weight: bold;
                      letter-spacing: 2px;
                      font-family: monospace;">
              COMCE15
            </p>
          </div>
          <p style="color: #6b7280; margin: 15px 0 0 0; font-size: 12px;">
            Válido en todos los planes hasta el 31 de diciembre de 2025
          </p>
        </div>
        <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 20px 0 0 0;">
          💡 Usa este código al momento de suscribirte para aplicar tu descuento automáticamente
        </p>
      </div>
    ` : '';

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Finkargo Analiza <noreply@finkargo.com>',
      to: [email],
      subject: isComceMember ? '¡Bienvenido a Finkargo Analiza! 🎉 Tu código COMCE está listo' : '¡Bienvenido a Finkargo Analiza! 🎉',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenido a Finkargo Analiza</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
              🎉 ¡Bienvenido a Finkargo Analiza!
            </h1>
          </div>
          
          <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2563eb; margin-top: 0;">¡Hola ${name}!</h2>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Te damos la bienvenida a <strong>Finkargo Analiza</strong>, la plataforma de inteligencia comercial más avanzada de México.
            </p>

            <p style="font-size: 16px; margin-bottom: 30px;">
              ¡Estás a un solo paso de acceder a datos verificados y herramientas de análisis que transformarán tus decisiones comerciales!
            </p>

            ${comceSection}

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXTAUTH_URL}/precios"
                 style="background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
                        color: white;
                        text-decoration: none;
                        padding: 15px 40px;
                        border-radius: 8px;
                        font-weight: 600;
                        font-size: 18px;
                        display: inline-block;
                        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);">
                💎 Descubre el plan perfecto para ti
              </a>
            </div>

            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <h3 style="color: #0369a1; margin-top: 0;">¿Qué podrás hacer una vez elijas tu plan?</h3>
              <ul style="color: #0c4a6e; margin: 0; padding-left: 20px;">
                <li>Analizar datos de importaciones y exportaciones en tiempo real</li>
                <li>Generar reportes personalizados con información detallada</li>
                <li>Descubrir nuevos proveedores y mercados estratégicos</li>
                <li>Analizar a tu competencia y tendencias del mercado</li>
              </ul>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <div style="text-align: center;">
              <p style="color: #6b7280; font-size: 14px; margin: 10px 0;">
                <strong>Finkargo Analiza</strong><br>
                Plataforma de Inteligencia Comercial<br>
                Operando en México
              </p>
              
              <div style="margin-top: 20px;">
                <p style="color: #9ca3af; font-size: 12px; margin: 5px 0;">
                  ¿Necesitas ayuda? Contacta nuestro soporte en <a href="mailto:soporte@finkargo.com" style="color: #2563eb;">soporte@finkargo.com</a>
                </p>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #9ca3af; font-size: 11px;">
              © 2024 Finkargo Analiza. Todos los derechos reservados.
            </p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Error sending welcome email:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return { success: false, error }
  }
}