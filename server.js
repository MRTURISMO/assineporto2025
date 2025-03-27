const express = require('express');  
const bodyParser = require('body-parser');  
const nodemailer = require('nodemailer');  
const fs = require('fs');  

const app = express();  
const PORT = process.env.PORT || 3000;  

// Configura o middleware para analisar JSON  
app.use(bodyParser.json({ limit: '10mb' })); // Aceitar JSON com tamanho máximo de 10MB  

// Endpoint para receber o PDF  
app.post('/upload-pdf', async (req, res) => {  
    const pdfData = req.body.pdf;  

    // Salvar o PDF em um arquivo local  
    const pdfBase64 = pdfData.split(',')[1]; // Remove o prefixo 'data:application/pdf;base64,'  
    fs.writeFileSync('contrato-assinado.pdf', pdfBase64, { encoding: 'base64' });  

    // Configurar o transporte do nodemailer  
    const transporter = nodemailer.createTransport({  
        service: 'gmail', // Use o serviço de e-mail desejado  
        auth: {  
            user: 'mruanfelipe10@gmail.com', // Seu endereço de e-mail  
            pass: 'rBLL1904@'             // Sua senha de e-mail (ou senha de app se ativada)  

// Ponto opcional: Use variáveis de ambiente para armazenar credenciais  
// Forneça as credenciais para a autenticação do Gmail  
        }  
    });  

    // Definir opções do e-mail  
    const mailOptions = {  
        from: 'mruanfelipe10@gmail.com',           // De  
        to: 'cliente@gmail.com',                // Para  
        subject: 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS ASSINADO',                // Assunto  
        text: 'Segue o contrato assinado.',     // Texto do e-mail  
        attachments: [  
            {  
                filename: 'contrato-assinado.pdf',  // Nome do arquivo  
                path: './contrato-assinado.pdf',    // Caminho do arquivo  
            },  
        ],  
    };  

    // Enviar o e-mail  
    try {  
        await transporter.sendMail(mailOptions);  
        res.status(200).send('PDF recebido e e-mail enviado com sucesso!');  
    } catch (error) {  
        console.error('Erro ao enviar e-mail:', error);  
        res.status(500).send('Erro ao enviar e-mail.');  
    }  
});  

// Inicie o servidor  
app.listen(PORT, () => {  
    console.log(`Servidor rodando na porta ${PORT}`);  
});  