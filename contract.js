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