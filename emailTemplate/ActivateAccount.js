const ActivateAccountTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activate Your Account</title>
    <style>
        .email-container {
            max-width: 670px;
            margin: 0 auto;
            font-family: 'Open Sans', sans-serif;
            border: 1px solid #e0e0e0;
            background-color: #f2f3f8;
        }

        .header {
            text-align: center;
            padding: 20px 100px 0px 0px;
        }

        .content {
            background-color: #fff;
            padding: 40px 35px;
            border-radius: 3px;
            box-shadow: 0 6px 18px 0 rgba(0, 0, 0, .06);
        }

        .content h1 {
            color: #1e1e2d;
            font-weight: 500;
            font-size: 18px;
            font-family: Arial, Helvetica, sans-serif;
        }

        .content p {
            color: #1e1e2d;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
            line-height: 20.8px;
        }

        .content a {
            color: #3498db;
            text-decoration: none;
        }
    </style>
    <link href="https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700"
        rel="stylesheet">
</head>

<body style="margin: 0px; background-color: #f2f3f8;">
    <div class="email-container">
        <!-- Logo Section -->
        <div class="header">
            <a href="https://gembainfotech.com" title="logo" target="_blank">
                <img width="300" height="90" src="https://iili.io/dVW66X9.png" title="logo" alt="logo">
            </a>
        </div>

        <!-- Content Section -->
        <div class="content">
            <h1>Welcome %NAME%,</h1>
            <p>Thank you for registering with Gemba Infotech! Please activate your account to get started.</p>
            <p>To activate your account, click the link below:</p>
            <p><a href="%ACTIVATION_LINK%" target="_blank">Activate Account</a></p>
            <p>If you didn’t register for this account, you can safely ignore this email.</p>
            <p>If you have any questions, feel free to reach out to us at <a href="mailto:support@gembainfotech.com">support@gembainfotech.com</a>.</p>
            <p>Best regards,<br>Gemba Infotech Team</p>
        </div>
    </div>
</body>

</html>
`;

module.exports = { ActivateAccountTemplate };
