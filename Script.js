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

    // --- LÓGICA PARA O WIDGET DE CLIMA ---
    function initWeatherWidget() {
        const widget = document.getElementById('weather-widget');
        if (!widget) return;

        // --- IMPORTANTE: Substitua pela sua chave de API --- 
        const apiKey = '89a16a04dac618174f4ca26cf7edefaa';
        // Obtenha sua chave gratuita em: https://openweathermap.org/appid

        const frases = {
            sol: "Dia de sol pede unhas que brilham! Que tal um esmalte com glitter para refletir essa luz?",
            nuvens: "O tempo fechou? Dê um up no visual com uma cor vibrante e alegre suas unhas!",
            chuva: "Chuvinha lá fora, e unhas perfeitas aqui dentro. O dia ideal para se mimar!",
            tempestade: "Raios e trovões? Proteja-se com unhas fortes e bem cuidadas. Agende seu horário!",
            neve: "Com esse friozinho, suas mãos merecem um cuidado especial e uma cor elegante. Que tal um vinho ou um nude?",
            padrao: "Não importa o clima, unhas bem feitas são sempre a previsão certa para um dia feliz!"
        };

        const getFrase = (weatherId) => {
            if (weatherId >= 200 && weatherId < 300) return frases.tempestade;
            if (weatherId >= 300 && weatherId < 600) return frases.chuva;
            if (weatherId >= 600 && weatherId < 700) return frases.neve;
            if (weatherId === 800) return frases.sol;
            if (weatherId > 800) return frases.nuvens;
            return frases.padrao;
        };

        const sucesso = async (pos) => {
            try {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

                const resposta = await fetch(url);
                if (!resposta.ok) throw new Error('Não foi possível obter o clima.');
                
                const data = await resposta.json();

                const icone = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                const temperatura = `${Math.round(data.main.temp)}°C`;
                const cidade = data.name;
                const frase = getFrase(data.weather[0].id);

                widget.innerHTML = `
                    <div class="weather-info">
                        <img src="${icone}" alt="${data.weather[0].description}">
                        <span>${temperatura} em ${cidade}</span>
                    </div>
                    <p>${frase}</p>
                `;
                widget.classList.add('visible');

            } catch (error) {
                console.error("Erro no widget de clima:", error);
                widget.innerHTML = `<p>${frases.padrao}</p>`;
                widget.classList.add('visible');
            }
        };

        const erro = () => {
            console.log("Usuário não permitiu a geolocalização.");
            widget.innerHTML = `<p>${frases.padrao}</p>`;
            widget.classList.add('visible');
        };

        if (apiKey === 'SUA_CHAVE_API_AQUI') {
            console.warn("Widget de clima: Por favor, adicione uma chave de API da OpenWeatherMap.");
            widget.innerHTML = `<p>Para ativar o clima, a dona do site precisa configurar uma coisinha. Mas hey, que tal agendar seu horário?</p>`;
            widget.classList.add('visible');
            return;
        }

        navigator.geolocation.getCurrentPosition(sucesso, erro);
    }

        // Inicia o widget de clima
    initWeatherWidget();

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
});
