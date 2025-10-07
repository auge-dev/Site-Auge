// Script simples para carregar imagens
(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        // Verificar se a configuração está disponível
        if (typeof ASSETS_CONFIG === 'undefined') {
            console.warn('ASSETS_CONFIG não encontrado. Usando caminhos padrão.');
            return;
        }

        // Função simples para atualizar src de uma imagem
        function updateImageSrc(elementId, configKey) {
            const element = document.getElementById(elementId);
            if (!element) {
                console.warn(`Elemento ${elementId} não encontrado`);
                return;
            }
            
            if (!ASSETS_CONFIG[configKey]) {
                console.warn(`Configuração ${configKey} não encontrada`);
                return;
            }
            
            // Carregar imagem diretamente
            element.src = ASSETS_CONFIG[configKey];
            console.log(`Imagem ${elementId} carregada: ${ASSETS_CONFIG[configKey]}`);
        }

        // Lista de imagens para carregar
        const imagesToLoad = [
            { elementId: 'logo-img', configKey: 'LOGO_AUGE' },
            { elementId: 'hero-mentors-img', configKey: 'HERO_MENTORS' },
            { elementId: 'mentor-rafael-img', configKey: 'MENTOR_RAFAEL' },
            { elementId: 'mentor-daniel-img', configKey: 'MENTOR_DANIEL' },
            { elementId: 'modulo-1-img', configKey: 'MODULO_1' },
            { elementId: 'modulo-2-img', configKey: 'MODULO_2' },
            { elementId: 'modulo-3-img', configKey: 'MODULO_3' },
            { elementId: 'modulo-4-img', configKey: 'MODULO_4' }
        ];
        
        // Carregar todas as imagens
        imagesToLoad.forEach(({ elementId, configKey }) => {
            updateImageSrc(elementId, configKey);
        });
        
        console.log('Sistema de carregamento de imagens inicializado!');
    });
})();