document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    
    // Lista de temas disponíveis e a ordem de ciclo
    const themes = ['dark', 'light', 'high-contrast'];
    
    // 1. Cria o botão de toggle na página
    function createThemeToggleButton() {
        const button = document.createElement('button');
        button.id = 'theme-toggle-button';
        button.className = 'theme-toggle-button primary-button small-button'; 
        button.style.position = 'fixed';
        button.style.bottom = '100px'; 
        button.style.left = '20px';
        button.style.zIndex = '1001'; 
        button.style.fontWeight = 'bold';
        button.style.padding = '8px 12px';

        // Ajuste de posição para não conflitar com o Banner FATEC
        const existingBanner = document.querySelector('.fatec-fixed-banner');
        if (existingBanner) {
            button.style.bottom = '180px'; 
        }

        document.body.appendChild(button);
        return button;
    }

    const toggleButton = createThemeToggleButton();

    // 2. Função para obter o próximo tema no ciclo
    function getNextTheme(currentTheme) {
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        return themes[nextIndex];
    }
    
    // 3. Função para aplicar e salvar o tema
    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Atualiza o texto do botão para o próximo clique
        switch (theme) {
            case 'dark':
                toggleButton.innerHTML = '<i class="fas fa-sun"></i> MODO CLARO';
                toggleButton.title = 'Alternar para o Modo Claro';
                break;
            case 'light':
                toggleButton.innerHTML = '<i class="fas fa-adjust"></i> ALTO CONTRASTE';
                toggleButton.title = 'Alternar para Alto Contraste (Amarelo/Preto)';
                break;
            case 'high-contrast':
                toggleButton.innerHTML = '<i class="fas fa-moon"></i> MODO ESCURO';
                toggleButton.title = 'Alternar para o Modo Escuro (Padrão)';
                break;
        }
    }

    // 4. Inicializa o tema ao carregar
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const initialTheme = savedTheme && themes.includes(savedTheme) ? savedTheme : 'dark';
        setTheme(initialTheme);
    }

    // 5. Função de alternância
    toggleButton.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = getNextTheme(currentTheme);
        setTheme(newTheme);
    });

    initializeTheme();
});