// script.js
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CONFIGURAÇÃO WHATSAPP =====
    const phoneNumber = '5582987353564';
    
    // Função principal para enviar mensagem
    window.enviarWhats = function() {
        // Capturar elementos
        const nomeInput = document.getElementById('nome');
        const dataInput = document.getElementById('data');
        const horaInicioInput = document.getElementById('horaInicio');
        const horaFimInput = document.getElementById('horaFim');
        const pessoasInput = document.getElementById('pessoas');
        
        // Validar elementos existem
        if (!nomeInput || !dataInput || !horaInicioInput || !horaFimInput || !pessoasInput) {
            console.error('Elementos do formulário não encontrados');
            alert('Erro ao carregar o formulário. Por favor, recarregue a página.');
            return;
        }
        
        // Obter valores
        const nome = nomeInput.value.trim();
        const data = dataInput.value;
        const horaInicio = horaInicioInput.value;
        const horaFim = horaFimInput.value;
        const pessoas = parseInt(pessoasInput.value, 10);
        
        // Validação: campos obrigatórios
        if (!nome) {
            alert('❌ Por favor, digite seu nome.');
            nomeInput.focus();
            return;
        }
        
        if (!data) {
            alert('❌ Por favor, selecione a data do evento.');
            dataInput.focus();
            return;
        }
        
        if (!horaInicio) {
            alert('❌ Por favor, selecione o horário de início.');
            horaInicioInput.focus();
            return;
        }
        
        if (!horaFim) {
            alert('❌ Por favor, selecione o horário de término.');
            horaFimInput.focus();
            return;
        }
        
        if (!pessoas || isNaN(pessoas)) {
            alert('❌ Por favor, informe a quantidade de pessoas.');
            pessoasInput.focus();
            return;
        }
        
        // Validação: capacidade máxima
        if (pessoas > 100) {
            alert('❌ Capacidade máxima é de 100 pessoas. Por favor, ajuste a quantidade.');
            pessoasInput.focus();
            return;
        }
        
        if (pessoas < 1) {
            alert('❌ A quantidade de pessoas deve ser pelo menos 1.');
            pessoasInput.focus();
            return;
        }
        
        // Validação: horários
        if (horaInicio >= horaFim) {
            alert('❌ O horário final deve ser depois do horário inicial.');
            horaFimInput.focus();
            return;
        }
        
        // Formatar data para português
        let dataFormatada;
        try {
            const dataObj = new Date(data);
            if (isNaN(dataObj.getTime())) {
                throw new Error('Data inválida');
            }
            dataFormatada = dataObj.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (error) {
            dataFormatada = data;
        }
        
        // Validação: data não pode ser passada
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const dataSelecionada = new Date(data);
        dataSelecionada.setHours(0, 0, 0, 0);
        
        if (dataSelecionada < hoje) {
            if (!confirm('⚠️ A data selecionada já passou. Deseja continuar mesmo assim?')) {
                return;
            }
        }
        
        // Construir mensagem profissional
        let mensagem = `*🏖️ ESPAÇO SÓ ALEGRIA - SOLICITAÇÃO DE RESERVA*%0a%0a`;
        mensagem += `*👤 Cliente:* ${nome}%0a`;
        mensagem += `*📅 Data:* ${dataFormatada}%0a`;
        mensagem += `*⏰ Horário:* ${horaInicio} às ${horaFim}%0a`;
        mensagem += `*👥 Pessoas:* ${pessoas}%0a`;
        mensagem += `%0a*🔍 Gostaria de verificar disponibilidade e valores para esta data.*%0a`;
        mensagem += `%0a✨ Aguardo retorno!`;
        
        // Gerar link do WhatsApp
        const url = `https://wa.me/${phoneNumber}?text=${mensagem}`;
        
        // Abrir WhatsApp em nova aba
        window.open(url, '_blank');
        
        // Opcional: limpar formulário após envio
        // nomeInput.value = '';
        // dataInput.value = '';
        // horaInicioInput.value = '';
        // horaFimInput.value = '';
        // pessoasInput.value = '';
    };
    
    // ===== LINKS WHATSAPP FLUTUANTES =====
    const whatsappFloat = document.getElementById('whatsappFloat');
    const whatsappFooter = document.getElementById('whatsappFooter');
    
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function(e) {
            e.preventDefault();
            const mensagem = encodeURIComponent('Olá! Gostaria de saber mais sobre o Espaço Só Alegria. Podemos conversar?');
            window.open(`https://wa.me/${phoneNumber}?text=${mensagem}`, '_blank');
        });
    }
    
    if (whatsappFooter) {
        whatsappFooter.addEventListener('click', function(e) {
            e.preventDefault();
            const mensagem = encodeURIComponent('Olá! Gostaria de saber mais sobre o Espaço Só Alegria. Podemos conversar?');
            window.open(`https://wa.me/${phoneNumber}?text=${mensagem}`, '_blank');
        });
    }
    
    // ===== SCROLL SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ANIMAÇÃO DE ENTRADA =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Animar elementos ao rolar
    const elementosParaAnimar = document.querySelectorAll('.galeria-item, .servico-card, .extra-card, .regra-item');
    elementosParaAnimar.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ===== ANO ATUAL NO FOOTER =====
    const footerYear = document.querySelector('.footer-copyright p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
    }
    
    // ===== VALIDAÇÃO DE ENTER NO FORMULÁRIO =====
    const formInputs = document.querySelectorAll('#pre-atendimento input');
    formInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                // Se for o último campo, envia, senão vai para o próximo
                const inputs = Array.from(formInputs);
                const index = inputs.indexOf(this);
                if (index === inputs.length - 1) {
                    window.enviarWhats();
                } else {
                    inputs[index + 1].focus();
                }
            }
        });
    });
    
    
    
    // ===== PREVENIR DATA RETROATIVA (opcional) =====
    const dataInput = document.getElementById('data');
    if (dataInput) {
        const hoje = new Date().toISOString().split('T')[0];
        dataInput.setAttribute('min', hoje);
    }
    
    console.log('✅ Site Espaço Só Alegria carregado com sucesso!');
});
