// ========== CONFIGURAÇÕES DO SITE ==========
// Essas variáveis serão preenchidas com os dados reais da ONG

const CONFIG = {
    nome_ong: "CDISS - Centro Desportivo de Inclusão Social Serrano",
    email: "projetocdiss@gmail.com", 
    whatsapp: "+5527992925102", 
    pix_chave: "projetocdiss@gmail.com", 
    instagram: "https://www.instagram.com/projetosalvacaocdiss/",
    facebook: "https://www.facebook.com/p/Projeto-CDISS-100064724851214/",
    atividades: [
        {
            nome: "Violão",
            descricao: "Aulas de música e iniciação ao violão para crianças e adolescentes.",
            icon: "🎸",
            foto: "foto2.jpg"
        },
        {
            nome: "Artesanato & Crochê",
            descricao: "Oficinas criativas para desenvolvimento de habilidades manuais e artísticas.",
            icon: "🧶"
        },
        {
            nome: "Balé",
            descricao: "Dança clássica para expressão corporal, disciplina e coordenação.",
            icon: "🩰"
        },
        {
            nome: "Dança Cultural",
            descricao: "Exploração de ritmos e movimentos que celebram nossa cultura.",
            icon: "💃"
        },
        {
            nome: "Roda de Conversa",
            descricao: "Espaço de diálogo e apoio psicossocial para os jovens e famílias.",
            icon: "💬"
        },
        {
            nome: "Reforço Escolar",
            descricao: "Apoio pedagógico para auxiliar no desempenho escolar dos alunos.",
            icon: "📚"
        }
    ]
};

// ========== FUNÇÕES AUXILIARES ==========

// Scroll suave para seções
function scrollTo(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Copiar chave PIX
function copiarChave() {
    const chave = CONFIG.pix_chave;
    navigator.clipboard.writeText(chave).then(() => {
        alert('Chave PIX copiada com sucesso!');
    }).catch(err => {
        console.error('Erro ao copiar:', err);
    });
}

// ========== INICIALIZAÇÃO DO SITE ==========

document.addEventListener('DOMContentLoaded', function() {
    // Atualizar links do WhatsApp
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        const mensagem = encodeURIComponent("Olá! Gostaria de saber mais sobre o CDISS");
        whatsappBtn.href = `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, '')}?text=${mensagem}`;
    }

    // Atualizar links das redes sociais no footer
    const instagramLink = document.querySelector('a[href*="instagram.com"]');
    const facebookLink = document.querySelector('a[href*="facebook.com"]');
    
    if (instagramLink) instagramLink.href = CONFIG.instagram;
    if (facebookLink) facebookLink.href = CONFIG.facebook;

    // Atualizar chave PIX
    const pixChaveElement = document.getElementById('pix-chave');
    if (pixChaveElement) {
        pixChaveElement.textContent = CONFIG.pix_chave;
    }

    // Carregar atividades
    carregarAtividades();

    // Configurar formulário de voluntariado
    configurarFormularioVoluntariado();
});

// ========== CARREGAR ATIVIDADES ==========

function carregarAtividades() {
    const grid = document.getElementById('atividades-grid');
    
    if (!grid) return;

    grid.innerHTML = ''; // Limpar grid

    CONFIG.atividades.forEach(atividade => {
        const card = document.createElement('div');
        card.className = 'atividade-card';
        card.innerHTML = `
            <div class="atividade-card-icon">${atividade.icon}</div>
            <div class="atividade-card-content">
                <h3>${atividade.nome}</h3>
                <p>${atividade.descricao}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ========== FORMULÁRIO DE VOLUNTARIADO ==========

function configurarFormularioVoluntariado() {
    const formulario = document.getElementById('formulario-voluntario');
    
    if (!formulario) return;

    formulario.addEventListener('submit', function(e) {
        e.preventDefault();

        // Coletar dados do formulário
        const dados = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            whatsapp: document.getElementById('whatsapp').value,
            como_ajudar: document.getElementById('como-ajudar').value,
            mensagem: document.getElementById('mensagem').value
        };

        // Validar dados
        if (!dados.nome || !dados.email || !dados.whatsapp || !dados.como_ajudar) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        // Enviar via WhatsApp (opção 1 - mais rápido)
        enviarViaWhatsApp(dados);

        // Limpar formulário
        formulario.reset();
    });
}

// ========== ENVIAR DADOS VIA WHATSAPP ==========

function enviarViaWhatsApp(dados) {
    const mensagem = `
*Novo Voluntário - CDISS*

Nome: ${dados.nome}
E-mail: ${dados.email}
WhatsApp: ${dados.whatsapp}
Como quer ajudar: ${dados.como_ajudar}
Mensagem: ${dados.mensagem || 'Nenhuma mensagem adicional'}
    `.trim();

    const mensagemCodificada = encodeURIComponent(mensagem);
    const numeroWhatsApp = CONFIG.whatsapp.replace(/\D/g, '');
    
    // Abrir WhatsApp com a mensagem pré-preenchida
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`, '_blank');

    // Mostrar mensagem de sucesso
    alert('Redirecionando para o WhatsApp... Sua solicitação será enviada!');
}

// ========== ALTERNATIVA: ENVIAR VIA EMAIL (usando FormSubmit) ==========
// Descomente se quiser usar email em vez de WhatsApp

/*
function enviarViaEmail(dados) {
    const form = new FormData();
    form.append('email', CONFIG.email);
    form.append('subject', 'Novo Voluntário - CDISS');
    form.append('message', `
Nome: ${dados.nome}
E-mail: ${dados.email}
WhatsApp: ${dados.whatsapp}
Como quer ajudar: ${dados.como_ajudar}
Mensagem: ${dados.mensagem}
    `);

    fetch('https://formsubmit.co/ajax/' + CONFIG.email, {
        method: 'POST',
        body: form
    })
    .then(response => response.json())
    .then(data => {
        alert('Obrigado! Sua solicitação foi enviada com sucesso!');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar. Tente novamente.');
    });
}
*/

// ========== ANIMAÇÕES DE SCROLL ==========

// Observador para animar elementos ao entrar na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Adicionar animação aos cards quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.atividade-card, .doacao-card, .reforma-content');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// ========== ANIMAÇÃO CSS ==========
// Adicionar estilos de animação dinamicamente

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ========== FUNÇÃO PARA ATUALIZAR CONFIGURAÇÕES ==========
// Use essa função quando receber os dados reais da ONG

function atualizarConfiguracao(novosDados) {
    Object.assign(CONFIG, novosDados);
    
    // Recarregar elementos que dependem da configuração
    carregarAtividades();
    
    // Atualizar links
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        const mensagem = encodeURIComponent("Olá! Gostaria de saber mais sobre o CDISS");
        whatsappBtn.href = `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, '')}?text=${mensagem}`;
    }
    
    const pixChaveElement = document.getElementById('pix-chave');
    if (pixChaveElement) {
        pixChaveElement.textContent = CONFIG.pix_chave;
    }
    
    console.log('Configuração atualizada:', CONFIG);
}

// ========== EXEMPLO DE USO ==========
// Quando receber os dados da ONG, chamar:
// atualizarConfiguracao({
//     email: "email-real@cdiss.com",
//     whatsapp: "+5527999999999",
//     pix_chave: "chave-real-pix",
//     atividades: [...]
// });
