"use server";

import { getTranslations } from "next-intl/server";
import nodemailer from "nodemailer";
import { SiteConfig } from "./site-config";

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export async function sendMail({
  from,
  to,
  subject,
  text,
  html,
}: {
  from?: string;
  to?: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  const t = await getTranslations();

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isVerified = await transporter.verify();
  } catch (error) {
    console.error(
      t("common.messages.generic"),
      SMTP_SERVER_USERNAME,
      SMTP_SERVER_PASSWORD,
      error,
    );
    return;
  }
  const info = await transporter.sendMail({
    from: `"${SiteConfig.title}" <${SiteConfig.noReplyEmail}>`,
    to: to,
    subject: subject,
    text: text,
    html: html ? html : "",
  });
  console.log("Message Sent", info.messageId);
  console.log("Mail sent to", to || SITE_MAIL_RECIEVER);
  console.log("Mail sent from", from);
  return info;
}
