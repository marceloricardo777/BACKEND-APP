import { response } from 'express';
import * as nodemailer from 'nodemailer';
import SMTPTransport = require('nodemailer/lib/smtp-transport');

export async function EnviarEmail(
  email: string,
  subject: string,
  conteudo: string,
) {

  var transporter = nodemailer.createTransport(new SMTPTransport({
    name: "dialhost.com.br",
    host: "smtp.dialhost.com.br",
    //service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      type: 'LOGIN',
      user: "tecnologia@transmobisolucoes.com.br",
      pass: "T3ch@Tr4nsmob!",
    },
    logger: true,
    debug: false,
    tls: {
      rejectUnauthorized: true
    },
  }));

  var mailOptions = {
    from: 'tecnologia@transmobisolucoes.com.br',
    to: email,
    subject: subject,
    html: conteudo
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return response.json({ error: true });

    } else {
      console.log('Email enviado: ' + info.response);
      return response.json({ error: false });

    }
  });
}
