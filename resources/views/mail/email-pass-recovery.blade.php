<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Сброс пароля — Reflection</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden;">
        <tr>
            <td align="center" style="padding: 24px 0;">
                <h1 style="font-size: 1.5rem; font-weight: 600; color: #111827; margin-top: 16px; margin-bottom: 0;">Reflection</h1>
            </td>
        </tr>

        <tr>
            <td style="padding: 0 24px 24px;">
                <p style="font-size: 1rem; color: #374151; margin-bottom: 16px;">Здравствуйте, {{ $email }}!</p>
                <p style="font-size: 1rem; color: #374151; margin-bottom: 24px;">
                    Мы получили запрос на смену пароля в сервисе <strong>Reflection</strong>.
                    Чтобы продолжить, перейдите по ссылке ниже.
                </p>

                <div style="text-align: center; margin-bottom: 24px;">
                    <a href="{{ $link }}" style="display: inline-block; padding: 12px 24px; font-size: 1rem; font-weight: 600; color: #ffffff; background-color: #000000; text-decoration: none; border-radius: 6px;">
                        Сбросить пароль
                    </a>
                </div>

                <p style="font-size: 0.875rem; color: #6B7280; margin-bottom: 0;">Эта ссылка действительна в течение 15 минут.</p>
            </td>
        </tr>

        <tr>
            <td style="padding: 24px;">
                <div style="border-left: 4px solid #F59E0B; background-color: #FEF3C7; padding: 12px 16px; border-radius: 4px;">
                    <p style="color: #92400E; font-size: 0.875rem; margin: 4px 0;">Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.</p>
                    <p style="color: #92400E; font-size: 0.875rem; margin: 4px 0;">Не передавайте эту ссылку никому — она конфиденциальна.</p>
                </div>
            </td>
        </tr>

        <tr>
            <td style="padding: 24px; text-align: center; background-color: #F3F4F6;">
                <p style="font-size: 0.75rem; color: #6B7280; margin: 0;">© 2025 Reflection. Все права защищены.</p>
            </td>
        </tr>
    </table>
</body>
</html>
