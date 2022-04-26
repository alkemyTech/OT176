const sgMail = require('@sendgrid/mail')
const config = require('../config/config')

/**
 * sendMail function to send email
 * @param {string} toEmail (string)
 * @param {string} subject (string)
 * @param {string} message (string html)
 * @param {function} next (function)
 * @returns (obj) -> api response
 */
const sendMail = async (toEmail, subject, message, next = false) => {
  try {
    if (config.sendgrid_key) {
      sgMail.setApiKey(config.sendgrid_key)

      const msg = {
        to: toEmail,
        from: config.sendgrid_verified,
        subject: subject,
        html: message
      }

      const sending = await sgMail.send(msg)
      if (sending) {
        return sending
      }
    }
  } catch (error) {
    console.log(error.message)
    if (next) {
      next(error)
    }
  }
}

module.exports = sendMail
