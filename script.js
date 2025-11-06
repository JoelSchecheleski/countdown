// ============================================
// CONFIGURAÇÃO DA DATA DO COUNTDOWN
// ============================================
// Defina aqui a data para a qual o countdown vai contar
// Formato: "YYYY-MM-DD HH:MM:SS" ou new Date(ano, mês-1, dia, hora, minuto, segundo)
// Exemplos:
// const targetDate = new Date("2024-12-31 23:59:59");
// const targetDate = new Date(2024, 11, 31, 23, 59, 59); // Mês começa em 0 (janeiro = 0, dezembro = 11)

const targetDate = new Date("2026-01-03 18:00:00");

// ============================================
// CÓDIGO DO COUNTDOWN (Não modificar)
// ============================================

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    // Cálculos de tempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Atualizar os elementos HTML
    document.getElementById("days").textContent = days >= 0 ? days : 0;
    document.getElementById("hours").textContent = hours >= 0 ? hours : 0;
    document.getElementById("minutes").textContent = minutes >= 0 ? minutes : 0;
    document.getElementById("seconds").textContent = seconds >= 0 ? seconds : 0;

    // Se o countdown terminou
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector(".message h2").innerHTML = 'Já <span class="highlight">VOLTAMOS</span>!';
        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "0";
        document.getElementById("minutes").textContent = "0";
        document.getElementById("seconds").textContent = "0";
    }
}

// Atualizar countdown a cada segundo
const countdownInterval = setInterval(updateCountdown, 1000);

// Executar imediatamente ao carregar
updateCountdown();

// ============================================
// CONFIGURAÇÃO DO WEB3FORMS
// ============================================
// Obtenha sua Access Key gratuita em: https://web3forms.com
// IMPORTANTE: Substitua pela sua chave para ativar o envio
const WEB3FORMS_ACCESS_KEY = "78428969-4420-4a9d-8521-fd1b94f20536";

// Email de destino
const RECIPIENT_EMAIL = "contacto@ascendainmobiliaria.com";

// ============================================
// FUNÇÃO DE INSCRIÇÃO NA NEWSLETTER
// ============================================
async function subscribe() {
    const emailInput = document.getElementById("emailInput");
    const email = emailInput.value.trim();
    const button = document.querySelector(".subscribe-form button");

    // Validação simples de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        alert("Por favor, insira seu email.");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return;
    }

    // Desabilitar botão durante o envio
    button.disabled = true;
    button.textContent = "Enviando...";

    // Preparar dados para envio
    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "Nova Inscrição - Newsletter Ascenda Inmobiliaria");
    formData.append("email", RECIPIENT_EMAIL);
    formData.append("message", `Nova inscrição na newsletter!\n\nEmail do inscrito: ${email}\nData: ${new Date().toLocaleString("pt-BR")}`);
    formData.append("from_name", "Site Countdown");
    formData.append("subscriber_email", email);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            console.log("Email enviado com sucesso!");
            alert(`Obrigado por se inscrever!\n\nEmail registrado: ${email}\n\nVocê receberá nossas atualizações em breve.`);
            emailInput.value = "";
        } else {
            console.error("Erro ao enviar:", data);
            alert("Erro ao registrar inscrição. Por favor, tente novamente mais tarde.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
        button.disabled = false;
        button.textContent = "Inscrever-se";
    }
}

// Permitir inscrição ao pressionar Enter
document.getElementById("emailInput")?.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        subscribe();
    }
});

// ============================================
// INFORMAÇÕES NO CONSOLE
// ============================================
console.log("Countdown iniciado!");
console.log("Data alvo:", targetDate.toLocaleString("pt-BR"));
console.log("Para alterar a data, edite a variável 'targetDate' no arquivo script.js");
