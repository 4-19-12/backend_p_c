const nodemailer = require('nodemailer');


class MainService {

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST, 
            port:process.env.SMTP_POST, 
            secure: false, 
            auth: {
                user: process.env.SMTP_MAIL_USER,
                pass: process.env.SMTP_MAIL_PASSWORD,

            },
            
        })
    }
    async SendActivationMail(to, name, message){
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_MAIL_USER, 
                to, 
                subject:'Добро пожаловать в Pink Cheesecake!', 
                text: '', 
                html: 
                `
                    <div>
                    <h1><b>Здравствуйте, ${name}!</b></h1>
                    <p>Добро пожаловать в Pink Cheesecake – ваш незаменимый помощник в мире кондитерского искусства!</p>
                    <p>Мы рады, что вы присоединились к нашему сообществу творческих кондитеров. Pink Cheesecake – это место, где вы можете:</p>
                    <ul>
                        <li><b>Арендовать профессиональное оборудование:</b> Забудьте о больших вложениях! Арендуйте всё необходимое для реализации самых смелых идей.</li>
                        <li><b>Найти уникальный инвентарь:</b> От форм для выпечки до инструментов для декора – у нас есть всё, чтобы сделать ваши шедевры неповторимыми.</li>
                        <li><b>Воспользоваться удобной доставкой:</b> Получите всё необходимое прямо к вашей двери, экономя время и силы.</li>
                    </ul>

                    <p>
                        ${message ? `<br><b>Сообщение для обратной связи:</b><br>${message}<br><br>` : ''}
                    </p>

                    <p>С нетерпением ждем ваших кулинарных творений в Pink Cheesecake!</p>
                    <p>С наилучшими пожеланиями,<br>Команда Pink Cheesecake</p>
                </div>
                ` 

            })

        } catch (error) {
            console.error('Error sending activation email:', error);
            throw error; 
        }

    }

}

module.exports = new MainService();