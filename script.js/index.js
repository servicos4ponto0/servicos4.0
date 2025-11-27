// index.js (Lógica do Header e Cadastro Rápido do Cliente)

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do Formulário de Cadastro Rápido
    const botaoCadastroRapido = document.getElementById('botao-cadastro-rapido');
    const formularioCadastro = document.getElementById('formulario-cadastro');
    const formInputs = formularioCadastro ? formularioCadastro.querySelectorAll('input') : [];
    const cadastrarButton = formularioCadastro ? formularioCadastro.querySelector('.primary-button') : null;

    
    // 1. Lógica para Abrir/Fechar o Formulário Rápido (Cadastre-se Cliente)
    if (botaoCadastroRapido && formularioCadastro) {
        botaoCadastroRapido.addEventListener('click', function(event) {
            event.stopPropagation(); 
            // Alterna a visibilidade
            formularioCadastro.style.display = formularioCadastro.style.display === 'none' ? 'flex' : 'none';
        });

        // Fechar o formulário ao clicar fora
        document.addEventListener('click', function(event) {
            if (!formularioCadastro.contains(event.target) && event.target !== botaoCadastroRapido) {
                formularioCadastro.style.display = 'none';
            }
        });
    }

    // 2. Lógica para Submeter o Formulário Rápido
    if (cadastrarButton) {
        cadastrarButton.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o envio real do formulário
            
            // Validação simples (apenas checando se E-mail e Senha estão preenchidos)
            const emailInput = Array.from(formInputs).find(input => input.type === 'email');
            const senhaInput = Array.from(formInputs).find(input => input.type === 'password');
            
            if (!emailInput || emailInput.value.trim() === '' || !senhaInput || senhaInput.value.trim() === '') {
                alert('Por favor, preencha o E-mail e a Senha para o Cadastro Rápido.');
                return;
            }

            // SIMULAÇÃO DE CADASTRO
            alert('Cadastro de Cliente Rápido realizado com sucesso! Bem-vindo(a).');
            formularioCadastro.style.display = 'none'; // Esconde o formulário
            // Limpa os campos após o sucesso
            formInputs.forEach(input => input.value = ''); 
        });
    }

    // 3. Lógica para Botões de Cadastro Rápido com Redes Sociais
    formularioCadastro.querySelectorAll('.secondary-button').forEach(button => {
        button.addEventListener('click', function() {
            // Este é o fluxo de cliente
            alert('Redirecionando para o login/cadastro via ' + this.textContent.trim() + '...');
            // Em um site real, isso iniciaria o fluxo OAuth do Google ou o login por telefone.
            formularioCadastro.style.display = 'none';
        });
    });

    
    // 4. Lógica do Floating Banner (se existir na página)
    const closeBannerButton = document.getElementById('close-floating-banner');
    const floatingBanner = document.getElementById('floating-banner');
    
    if (closeBannerButton && floatingBanner) {
        closeBannerButton.addEventListener('click', () => {
            floatingBanner.style.display = 'none';
        });
    }

    // 5. Lógica para Ativar o Link do Menu de Navegação (mantida)
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkFileName = linkHref.split('/').pop(); 

        link.classList.remove('active'); 

        if (linkFileName === currentPath) {
            link.classList.add('active');
        }
        if ((currentPath === '' || currentPath === 'index.html') && linkFileName === 'index.html') {
            link.classList.add('active');
        }
        if (linkHref.includes('#') && linkFileName === 'index.html') {
             link.addEventListener('click', (event) => {
                const targetId = linkHref.split('#')[1];
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    event.preventDefault(); 
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
             });
        }
    });
});