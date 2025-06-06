document.getElementById('FormulárioparaContato').addEventListener('submit',function(event) {
    //Impede o envio padrão do formulário
    event.preventDefault();

    //Você pode adcionar validações mais complexas aqui se quiser
    //Pega os valores dos campos (opcional, só para  mostar que funciona)
    const nome = document.getElementById('nome').value;
    //const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    //const email = document.getElementById('email').value; 
    const mensagem = document.getElementById('mensagem').value;
    //Exibe os valores no console (opcional)

    console.log("nome:", nome);
    console.log("email:", email);
    console.log("mensagem:", mensagem);

    //simula um envio bem-sucedido  
    const MensagemRetorno = document.getElementById('MensagemRetorno');
    MensagemRetorno.textContent = "Agendamento simulado com sucesso!";
    MensagemRetorno.style.display = 'block';
    MensagemRetorno.style.color = 'green';
    MensagemRetorno.style.fontSize = '20px';
    //opcional: Limpa o formulário após um pequeno atraso
    setTimeout(function() {
        document.getElementById('FormulárioparaContato').reset();
        //document.getElementById('Formulárioparacontato').reset();
        MensagemRetorno.style.display = 'none';
    }, 3000); //Limpa após 3 segundos de atraso
});

