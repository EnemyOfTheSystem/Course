const nodemailer = require("nodemailer");

class EmailController {

    async send(req, res) {
        const { to, subject, emailBody, attachFile } = req.body;
        let transporter;
        let emailOptions = { from: "orgfortesting@gmail.com", to, subject, html: emailBody }
        try {
            transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "orgfortesting@gmail.com",
                    pass: "rjws vbho bott wtvu"
                }
            });
        } catch (e) {
            console.log(e)
            res.json({ message: "Mail service auth failed", error: e, status: "error", code: 500 });
        }

        try {
            transporter.sendMail(attachFile ? { ...emailOptions, attachments: [{ path: './static/mainFiles/Договор.docx' }] } : emailOptions);
        } catch (e) {
            console.log(e)
            res.json({ message: "Mail sending failed", error: e, status: "error", code: 500 });
        }
        res.json({ message: "Mail sent", status: "success", code: 200 });
    }

}

module.exports = new EmailController();