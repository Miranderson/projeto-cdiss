// ========== CONFIGURAÇÕES DO SITE ==========
const CONFIG = {
    nome_ong: "CDISS - Centro Desportivo de Inclusão Social Serrano",
    email: "projetocdiss@outlook.com", 
    whatsapp: "+5527998456074", 
    pix_chave: "10429046000184", // CNPJ limpo para o QR Code
    pix_display: "10.429.046/0001-84",
    atividades: [
        {
            nome: "Roda de Conversa",
            descricao: "Espaço de diálogo e apoio psicossocial para os jovens e famílias com acompanhamento profissional.",
            foto: "atividades/Roda de Conversa.jpg"
        },
        {
            nome: "Reforço Escolar",
            descricao: "Apoio pedagógico focado no desenvolvimento acadêmico e superação de dificuldades escolares.",
            foto: "atividades/Reforço Escolar.jpg"
        },
        {
            nome: "Dança Cultural",
            descricao: "Exploração de ritmos e movimentos que celebram a diversidade e a identidade cultural.",
            foto: "atividades/Dança Cultural.jpg"
        },
        {
            nome: "Artesanato & Crochê",
            descricao: "Desenvolvimento de habilidades manuais, criatividade e potencial geração de renda.",
            foto: "atividades/Artesanato & Crochê.jpg"
        },
        {
            nome: "Balé",
            descricao: "Dança clássica para expressão corporal, disciplina e coordenação motora.",
            foto: "atividades/Balé.jpg"
        },
        {
            nome: "Violão",
            descricao: "Iniciação musical e prática instrumental para despertar talentos artísticos.",
            foto: "foto2.jpg"
        }
    ]
};

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    carregarAtividades();
    gerarQRCode();
    iniciarContadores();
    configurarFormulario();
});

// ========== CARREGAR ATIVIDADES ==========
function carregarAtividades() {
    const grid = document.getElementById('atividades-grid');
    if (!grid) return;

    CONFIG.atividades.forEach((at, index) => {
        const card = document.createElement('div');
        card.className = 'atividade-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index * 100).toString());
        
        card.innerHTML = `
            <div class="at-img" style="background-image: url('${at.foto}')"></div>
            <div class="at-content">
                <h3>${at.nome}</h3>
                <p>${at.descricao}</p>
                <a href="https://wa.me/${CONFIG.whatsapp.replace(/\D/g, '')}" target="_blank" class="btn-text">Saiba Mais <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ========== GERAR QR CODE PIX ==========
function gerarQRCode() {
    const qrImg = document.getElementById('qrcode');
    if (!qrImg) return;

    // Payload Estático Simplificado para o CNPJ
    const payload = `00020126360014BR.GOV.BCB.PIX0114${CONFIG.pix_chave}5204000053039865802BR5905CDISS6005SERRA62070503***6304`;
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(payload)}`;
}

// ========== COPIAR CHAVE PIX ==========
function copiarChave() {
    navigator.clipboard.writeText(CONFIG.pix_display).then(() => {
        alert('Chave CNPJ copiada com sucesso!');
    });
}

// ========== CONTADORES ANIMADOS ==========
function iniciarContadores() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounting = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => startCounting(counter), 1);
        } else {
            counter.innerText = target + (target > 900 ? '+' : '');
        }
    };

    // Intersection Observer para disparar quando visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

// ========== FORMULÁRIO DE VOLUNTARIADO ==========
function configurarFormulario() {
    const form = document.getElementById('formulario-voluntario');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const area = document.getElementById('como-ajudar').value;
        
        const mensagem = `Olá! Meu nome é ${nome}. Tenho interesse em ser voluntário no CDISS na área de ${area}.`;
        const url = `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(mensagem)}`;
        
        window.open(url, '_blank');
        form.reset();
    });
}
