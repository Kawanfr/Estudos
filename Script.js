// Envolve todo o código em um único 'DOMContentLoaded' para garantir que o HTML foi carregado.
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA O FORMULÁRIO DE CONTATO ---
    const formulario = document.getElementById('formulario-contato');

    // Adiciona o listener apenas se o formulário existir na página
    if (formulario) {
        const nomeInput = document.getElementById('nome');
        const emailInput = document.getElementById('email');
        const telefoneInput = document.getElementById('telefone');
        const mensagemInput = document.getElementById('mensagem');
        const mensagemRetorno = document.getElementById('MensagemRetorno');

        // Função para mostrar uma mensagem de erro para um campo específico
        const showError = (input, message) => {
            const errorDiv = document.getElementById(`error-${input.id}`);
            input.classList.add('input-error');
            errorDiv.textContent = message;
        };

        // Função para limpar todos os erros visuais do formulário
        const clearErrors = () => {
            formulario.querySelectorAll('.input-error').forEach(input => input.classList.remove('input-error'));
            formulario.querySelectorAll('.error-message').forEach(div => div.textContent = '');
        };

        formulario.addEventListener('submit', function(event) {
            // Impede o envio padrão do formulário
            event.preventDefault();
            clearErrors();
            let isValid = true;

            // 1. Validação do Nome
            if (nomeInput.value.trim() === '') {
                showError(nomeInput, 'O campo nome é obrigatório.');
                isValid = false;
            }

            // 2. Validação do Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'O campo email é obrigatório.');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'Por favor, insira um email válido.');
                isValid = false;
            }

            // 3. Validação do Telefone (apenas números, 10 ou 11 dígitos)
            const telefoneRegex = /^\d{10,11}$/;
            if (telefoneInput.value.trim() === '') {
                showError(telefoneInput, 'O campo telefone é obrigatório.');
                isValid = false;
            } else if (!telefoneRegex.test(telefoneInput.value.trim())) {
                showError(telefoneInput, 'Insira um telefone válido (apenas números, com DDD).');
                isValid = false;
            }

            // 4. Validação da Mensagem
            if (mensagemInput.value.trim() === '') {
                showError(mensagemInput, 'Por favor, descreva o serviço desejado.');
                isValid = false;
            }

            // Se tudo for válido, simula o envio
            if (isValid) {
                // Adiciona estilo de sucesso e mostra a mensagem
                mensagemRetorno.textContent = "Agendamento simulado com sucesso!";
                mensagemRetorno.className = 'success-message'; // Adiciona classe para estilo
                mensagemRetorno.style.display = 'block';
                setTimeout(() => {
                    formulario.reset();
                    mensagemRetorno.className = ''; // Limpa a classe
                    mensagemRetorno.style.display = 'none';
                }, 3000);
            }
        });
    }

    // --- LÓGICA PARA O LIGHTBOX DA GALERIA ---
    const imagensDaGaleria = document.querySelectorAll('.galeria-imagem');

    // Executa a lógica do lightbox apenas se houver imagens da galeria na página.
    if (imagensDaGaleria.length > 0) {
        // Cria os elementos do lightbox uma única vez
        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.className = 'lightbox-overlay';
        document.body.appendChild(lightboxOverlay);

        const lightboxImage = document.createElement('img');
        lightboxImage.className = 'lightbox-imagem';
        lightboxOverlay.appendChild(lightboxImage);
        
        const closeButton = document.createElement('span');
        closeButton.className = 'lightbox-close';
        closeButton.innerHTML = '&times;';
        lightboxOverlay.appendChild(closeButton);

        // 1. DECLARE AS FUNÇÕES PRIMEIRO
        const abrirLightbox = (imagemSrc) => {
            lightboxImage.src = imagemSrc;
            lightboxOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Trava a rolagem da página
        };
        
        const fecharLightbox = () => {
            lightboxOverlay.classList.remove('active');
            document.body.style.overflow = 'auto'; // Libera a rolagem da página
        };

        // 2. DEPOIS, ADICIONE OS EVENTOS QUE USAM AS FUNÇÕES
        
        // Evento para ABRIR o lightbox ao clicar em uma imagem
        imagensDaGaleria.forEach(imagem => {
            imagem.addEventListener('click', () => abrirLightbox(imagem.src));
        });

        // Eventos para FECHAR o lightbox (adicionados apenas uma vez)
        closeButton.addEventListener('click', fecharLightbox);
        lightboxOverlay.addEventListener('click', (e) => {
            // Fecha somente se o clique for no fundo (overlay) e não na imagem
            if (e.target === lightboxOverlay) {
                fecharLightbox();
            }
        });

        // Evento para FECHAR o lightbox com a tecla "Escape"
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) fecharLightbox();
        });
    }

    // --- LÓGICA PARA ATUALIZAR O ANO NO RODAPÉ ---
    const anoCorrenteSpan = document.getElementById('ano-corrente');
    if (anoCorrenteSpan) {
        anoCorrenteSpan.textContent = new Date().getFullYear();
    }

    // --- LÓGICA PARA O MENU LATERAL ---
    // Adiciona a classe ao body para ajustar o padding se a tela for grande o suficiente
    const mediaQuery = window.matchMedia('(min-width: 1025px)');
    function handleNavVisibility(e) {
        document.body.classList.toggle('nav-visible', e.matches);
    }
    mediaQuery.addEventListener('change', handleNavVisibility);
    handleNavVisibility(mediaQuery); // Executa na primeira carga

    // --- LÓGICA PARA ANIMAÇÃO AO ROLAR ---
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('main > section');
        if (revealElements.length === 0) return;

        const observerOptions = {
            root: null, // Observa em relação ao viewport
            rootMargin: '0px',
            threshold: 0.1 // Ativa quando 10% do elemento está visível
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Para a observação após a animação
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            el.classList.add('reveal-on-scroll');
            revealObserver.observe(el);
        });
    }

    // Inicia a animação de scroll
    initScrollReveal();

    // --- LÓGICA PARA O MENU HAMBÚRGUER ---
    const hamburger = document.querySelector('.hamburger');
    const sideNav = document.querySelector('.side-nav');
    const closeNav = document.querySelector('.close-nav');

    if (hamburger && sideNav && closeNav) {
        hamburger.addEventListener('click', () => {
            sideNav.classList.add('nav-active');
        });

        closeNav.addEventListener('click', () => {
            sideNav.classList.remove('nav-active');
        });
    }

    // --- LÓGICA PARA O SELETOR DE TEMA (DARK MODE) ---
    const themeToggle = document.getElementById('theme-toggle');

    // Adiciona o listener apenas se o interruptor existir
    if (themeToggle) {
        // Função para aplicar o tema salvo ou do sistema
        const applyTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            // Prioriza o tema salvo. Se não houver, usa a preferência do sistema.
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
                document.body.classList.add('dark-mode');
                themeToggle.checked = true;
            } else {
                document.body.classList.remove('dark-mode');
                themeToggle.checked = false;
            }
        };

        // Função para salvar a preferência de tema
        const saveThemePreference = () => {
            localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
        };
        
        // Aplica o tema ao carregar a página
        applyTheme();

        // Adiciona o evento de clique para trocar o tema
        themeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode');
            saveThemePreference();
        });

        // Ouve mudanças na preferência de tema do sistema operacional
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
    }
});