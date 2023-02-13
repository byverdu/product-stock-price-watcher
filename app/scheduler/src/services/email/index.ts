/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import SMTPTransport from 'nodemailer/lib/smtp-transport/index';
import { createTransport, Transporter } from 'nodemailer';
import * as dotenv from 'dotenv';
import path from 'path';
import { Product } from '@types-product-stock-price-watcher';

dotenv.config();

const hbs = require('nodemailer-express-handlebars');

const transporter: Transporter<SMTPTransport.SentMessageInfo> = createTransport(
  {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  }
);

const hbsConfig = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.join(__dirname, './'),
    layoutsDir: path.join(__dirname, './'),
    defaultLayout: '',
  },
  viewPath: path.join(__dirname, './'),
  extName: '.hbs',
};
transporter.use('compile', hbs(hbsConfig));

const sendEmail = (products: Product[]) => {
  const mailOptions = {
    from: 'hello@example.com',
    to: process.env.EMAIL,
    subject: 'Subject',
    template: 'product',
    context: { products },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.error(`Email sent: ' + ${info.response}`);
      // do something useful
    }
  });
};

export { sendEmail };
