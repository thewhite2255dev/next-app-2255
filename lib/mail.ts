import { SiteConfig } from "./site-config";
import { sendMail } from "./send-mail";

const domain = process.env.AUTH_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const expirationtime = 5;
  const formattedExpiration =
    expirationtime > 1
      ? `${expirationtime} minutes`
      : `${expirationtime} minute`;

  await sendMail({
    to: email,
    subject: "Code d'authentification à deux facteurs",
    html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code d'authentification à deux facteurs</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <header style="background-color: #4CAF50; color: white; text-align: center; padding: 10px;">
        <span style="margin: 0;">Votre code d'authentification</span>
    </header>
    <main style="background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin-top: 20px;">
        <span>Bonjour,</span>
        <span>Voici votre code d'authentification à deux facteurs :</span>
        <div style="background-color: #e0e0e0; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${token}
        </div>
        <span>Ce code est valable pendant ${formattedExpiration}. Ne le partagez avec personne.</span>
        <span>Si vous n'avez pas demandé ce code, veuillez ignorer cet email.</span>
    </main>
    <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
        <span>Cet email a été envoyé par ${SiteConfig.title}. Tous droits réservés.</span>
    </footer>
</body>
</html>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-password?token=${token}`;
  const expirationtime = 1;
  const formattedExpiration =
    expirationtime > 1 ? `${expirationtime} heures` : `${expirationtime} heure`;

  await sendMail({
    to: email,
    subject: "Réinitialisation de votre mot de passe",
    html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réinitialisation de votre mot de passe</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <header style="background-color: #3498db; color: white; text-align: center; padding: 10px;">
        <span style="margin: 0;">Réinitialisation de mot de passe</span>
    </header>
    <main style="background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin-top: 20px;">
        <span>Bonjour,</span>
        <span>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte. Si vous n'avez pas fait cette demande, vous pouvez ignorer cet email.</span>
        <span>Pour réinitialiser votre mot de passe, veuillez cliquer sur le bouton ci-dessous :</span>
        <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmLink}" style="background-color: #3498db; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Réinitialiser mon mot de passe</a>
        </div>
        <span>Ce lien expirera dans ${formattedExpiration}. Si vous avez besoin d'un nouveau lien, vous pouvez en demander un sur notre site.</span>
        <span>Si vous avez des problèmes pour cliquer sur le bouton, copiez et collez l'URL suivante dans votre navigateur :</span>
        <span style="word-break: break-all; color: #666;">${confirmLink}</span>
    </main>
    <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
        <span>Cet email a été envoyé par ${SiteConfig.title}. Tous droits réservés.</span>
    </footer>
</body>
</html>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await sendMail({
    to: email,
    subject: "Vérification de votre adresse email",
    html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vérification de votre adresse email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <header style="background-color: #9b59b6; color: white; text-align: center; padding: 10px;">
        <span style="margin: 0;">Vérification de votre email</span>
    </header>
    <main style="background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin-top: 20px;">
        <span>Bonjour,</span>
        <span>Merci d'avoir créé un compte chez nous. Pour finaliser votre inscription, veuillez vérifier votre adresse email en cliquant sur le bouton ci-dessous :</span>
        <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmLink}" style="background-color: #9b59b6; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Vérifier mon adresse email</a>
        </div>
        <span>Si vous n'avez pas créé de compte chez nous, vous pouvez ignorer cet email.</span>
        <span>Si vous avez des problèmes pour cliquer sur le bouton, copiez et collez l'URL suivante dans votre navigateur :</span>
        <span style="word-break: break-all; color: #666;">${confirmLink}</span>
    </main>
    <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
        <span>Cet email a été envoyé par ${SiteConfig.title}. Tous droits réservés.</span>
    </footer>
</body>
</html>`,
  });
};
