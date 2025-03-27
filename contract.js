let isDrawing = false;  
const canvas = document.getElementById('signature-pad');  
const ctx = canvas.getContext('2d');  

canvas.addEventListener('mousedown', startDrawing);  
canvas.addEventListener('mousemove', draw);  
canvas.addEventListener('mouseup', stopDrawing);  
canvas.addEventListener('mouseout', stopDrawing);  

function startDrawing(event) {  
    isDrawing = true;  
    ctx.moveTo(event.offsetX, event.offsetY);  
}  

function draw(event) {  
    if (!isDrawing) return;  
    ctx.lineTo(event.offsetX, event.offsetY);  
    ctx.stroke();  
}  

function stopDrawing() {  
    isDrawing = false;  
    ctx.beginPath();  
}  

document.getElementById('clear-signature').addEventListener('click', () => {  
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
});  

document.getElementById('save-signature').addEventListener('click', () => {  
    const signatureData = canvas.toDataURL(); // Base64 string da assinatura  

    // Aqui você deve implementar a lógica para salvar a assinatura e a foto  
    const photoInput = document.getElementById('photo-upload');  
    if (photoInput.files.length > 0) {  
        const photoFile = photoInput.files[0];  
        console.log('Assinatura salva!', signatureData);  
        console.log('Foto enviada!', photoFile);  
    } else {  
        alert('Por favor, envie uma foto antes de continuar.');  
    }  
});  

// Lógica de seleção de pagamento  
document.getElementById('payment-form').addEventListener('submit', (e) => {  
    e.preventDefault();  
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');  
    if (paymentMethod) {  
        console.log('Método de pagamento selecionado:', paymentMethod.value);  
        // Implementar lógica de pagamento aqui  
    } else {  
        alert('Por favor, selecione um método de pagamento.');  
    }  
});  
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sendContract").addEventListener("click", async () => {
        const content = document.body;

        // Captura a tela como imagem
        html2canvas(content, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");

            // Gera o PDF
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
            
            // Converte para blob
            const pdfBlob = pdf.output("blob");

            // Cria o FormData para envio ao Google Drive
            const formData = new FormData();
            formData.append("file", pdfBlob, "contrato.pdf");

            // Envia o PDF para o Google Drive via Google Apps Script
            fetch("https://script.google.com/macros/s/AKfycbzfp5pfoaA3xa1TAqmFBPr5jG1bslplsZyYgT-1VV5amTOl8dsg8r28WXDtEKwR4iqZ/exec", {
                method: "POST",
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                if (data) {
                    alert("Contrato enviado com sucesso para o Google Drive!");
                } else {
                    alert("Falha ao enviar contrato para o Google Drive.");
                }
            })
            .catch(error => {
                console.error("Erro:", error);
                alert("Erro ao enviar contrato para o Google Drive.");
            });
        });
    });
});
