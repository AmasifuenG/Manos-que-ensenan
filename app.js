/**
 * Manos que Enseñan - Lógica de la Aplicación
 * Paleta Inspirada en la Naturaleza Amazónica y Tradición de Loreto:
 * Verde bosque (#28563E), Marrón artesanal (#A66B3F), Beige natural (#F3E5C8),
 * Amarillo mostaza (#D9A441), Blanco crema (#FFFDF7).
 * Desarrollado por Gracia Milagros y Zuleyka Vilchez - Two girl studio
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. GESTIÓN DE NOTIFICACIONES TOAST FLOTANTE
  // ==========================================
  const toastContainer = document.getElementById('toast-container');
  let toastTimeout = null;

  function showToast(message, type = 'warning', duration = 3800) {
    if (!toastContainer) return;

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    const toastIcon = type === 'warning'
      ? `<svg class="w-6 h-6 text-amarillo-mostaza shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
         </svg>`
      : type === 'success'
      ? `<svg class="w-6 h-6 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
         </svg>`
      : `<svg class="w-6 h-6 text-amarillo-mostaza shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
         </svg>`;

    const borderColor = type === 'warning' ? 'border-amarillo-mostaza' : type === 'success' ? 'border-emerald-500' : 'border-marron-artesanal';

    toastContainer.innerHTML = `
      <div id="active-toast" class="toast-enter flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#1E2E24]/95 text-blanco-crema shadow-2xl border ${borderColor} backdrop-blur-md max-w-md w-full">
        ${toastIcon}
        <div class="flex-1 text-sm font-medium leading-snug">
          ${message}
        </div>
        <button type="button" id="toast-close-btn" class="p-1 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    `;

    const closeBtn = document.getElementById('toast-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', hideToast);
    }

    toastTimeout = setTimeout(() => {
      hideToast();
    }, duration);
  }

  function hideToast() {
    const toast = document.getElementById('active-toast');
    if (toast) {
      toast.classList.remove('toast-enter');
      toast.classList.add('toast-exit');
      setTimeout(() => {
        if (toastContainer) toastContainer.innerHTML = '';
      }, 290);
    }
  }

  // ==========================================
  // 2. MENÚ MÓVIL Y NAVEGACIÓN
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
      } else {
        mobileMenu.classList.remove('hidden');
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // ==========================================
  // 3. SUBPESTAÑAS DE TALLERES (Presenciales vs Tutoriales)
  // ==========================================
  const tabPresencialesBtn = document.getElementById('tab-presenciales-btn');
  const tabTutorialesBtn = document.getElementById('tab-tutoriales-btn');
  const viewPresenciales = document.getElementById('view-presenciales');
  const viewTutoriales = document.getElementById('tutorials-container') || document.getElementById('view-tutoriales');

  function setTalleresTab(active) {
    if (active === 'presenciales') {
      tabPresencialesBtn.classList.add('bg-verde-bosque', 'text-white', 'shadow-sm');
      tabPresencialesBtn.classList.remove('bg-transparent', 'text-texto-oscuro/80', 'hover:text-verde-bosque');
      tabTutorialesBtn.classList.remove('bg-verde-bosque', 'text-white', 'shadow-sm');
      tabTutorialesBtn.classList.add('bg-transparent', 'text-texto-oscuro/80', 'hover:text-verde-bosque');

      viewPresenciales.classList.remove('hidden');
      viewTutoriales.classList.add('hidden');
    } else {
      tabTutorialesBtn.classList.add('bg-verde-bosque', 'text-white', 'shadow-sm');
      tabTutorialesBtn.classList.remove('bg-transparent', 'text-texto-oscuro/80', 'hover:text-verde-bosque');
      tabPresencialesBtn.classList.remove('bg-verde-bosque', 'text-white', 'shadow-sm');
      tabPresencialesBtn.classList.add('bg-transparent', 'text-texto-oscuro/80', 'hover:text-verde-bosque');

      viewTutoriales.classList.remove('hidden');
      viewPresenciales.classList.add('hidden');
    }
  }

  if (tabPresencialesBtn && tabTutorialesBtn) {
    tabPresencialesBtn.addEventListener('click', () => setTalleresTab('presenciales'));
    tabTutorialesBtn.addEventListener('click', () => setTalleresTab('tutoriales'));
  }

  // ==========================================
  // 4. DATOS Y MODAL DE TUTORIALES & VIDEO GUÍAS
  // ==========================================
  const tutorialesData = {
    'telar': {
      titulo: 'Fundamentos del Tejido en Telar de Cintura',
      artesania: 'Tejido tradicional',
      docente: 'Mama Rosaura Quispe',
      duracion: '24 minutos',
      nivel: 'Intermedio',
      imagen: '/images/tutorial-telar.jpg',
      resumen: 'Aprende el urdido de hilos de algodón y lanas teñidas con cortezas nativas de Loreto, la colocación de lizos y el primer diseño del telar tradicional.',
      materiales: [
        'Telar de cintura de madera dura amazónica con espadas de batán',
        'Madejas de algodón teñidas artesanalmente con corteza de nogal y achiote',
        'Cuchillo de hueso para tupir la trama',
        'Cuerda de sujeción para la cintura con faja acolchada'
      ],
      pasos: [
        'Paso 1: Armado de la urdimbre manteniendo una tensión constante entre estacas.',
        'Paso 2: Fijación del telar a un punto sólido y ajuste ergonómico a la cintura.',
        'Paso 3: Separación de hebras pares e impares con los lizos de caña brava.',
        'Paso 4: Inserción de la trama mediante la lanzadera y batido suave con la espada.',
        'Paso 5: Remate de orillos para evitar deshilachados con puntada ancestral.'
      ],
      consejo: 'El secreto está en respirar con cada movimiento de la espada; el tejido refleja el ritmo sereno del río y la concentración de quien lo crea.'
    },
    'ceramica': {
      titulo: 'Modelado y Bruñido de Vasijas con Arcilla Local',
      artesania: 'Cerámica tradicional',
      docente: 'Maestro Juan Poma',
      duracion: '18 minutos',
      nivel: 'Básico / Todos los niveles',
      imagen: '/images/tutorial-ceramica.jpg',
      resumen: 'Técnica de rollo y pellizco para crear una múcura tradicional, seguida por el frotado con cantos rodados de río para lograr un bruñido impermeable sin esmalte.',
      materiales: [
        '1.5 kg de arcilla roja ribereña decantada y purificada',
        'Piedras de río perfectamente pulidas (cantos rodados de ágata o cuarzo)',
        'Retazos de cuero húmedo y raspadores de calabaza (mate)',
        'Agua tibia en cuenco de barro'
      ],
      pasos: [
        'Paso 1: Amasado exhaustivo en cruz para eliminar cualquier burbuja de aire.',
        'Paso 2: Elaboración de la base esférica con la técnica del ahuecado con pulgares.',
        'Paso 3: Superposición de chorizos o rollos de grosor uniforme.',
        'Paso 4: Alisado exterior e interior usando la lámina de mate o cuchara de madera.',
        'Paso 5: Bruñido en estado de cuero con piedra de río hasta obtener brillo natural.'
      ],
      consejo: 'Deja secar la pieza siempre bajo sombra y envuelta en tela para evitar grietas por el calor húmedo.'
    },
    'bordado': {
      titulo: 'Simbología Ancestral y Puntos del Bordado Tradicional',
      artesania: 'Bordado ancestral',
      docente: 'Maestra Elena Mayhua',
      duracion: '32 minutos',
      nivel: 'Básico',
      imagen: '/images/tutorial-bordado.jpg',
      resumen: 'Descubre los trazos iconográficos que narran la cosmovisión comunitaria: la flor de cantuta, la espiral del agua y los caminos de las cordilleras.',
      materiales: [
        'Tela de lino o tocuyo crudo de algodón nativo',
        'Hilos de estambre o seda vegetal teñidos con achiote y corteza',
        'Agujas capoteras de punta roma',
        'Bastidor circular de madera con tornillo de ajuste'
      ],
      pasos: [
        'Paso 1: Calcado del patrón tradicional mediante puntos de tiza orgánica.',
        'Paso 2: Montaje tenso de la tela en el bastidor sin deformar la trama.',
        'Paso 3: Puntada de cadeneta tupida para delinear los contornos sagrados.',
        'Paso 4: Relleno en relieve combinando colores cálidos y verdes para dar volumen.',
        'Paso 5: Fijación de nudos invisibles en el reverso.'
      ],
      consejo: 'Cada color cuenta una historia: los tonos tierra son la fertilidad y la madera; los verdes y mostaza, el follaje y el sol protector.'
    },
    'cesteria': {
      titulo: 'Tejido Espiral con Fibras de Palma Chambira',
      artesania: 'Cestería vegetal',
      docente: 'Don Braulio Champi',
      duracion: '20 minutos',
      nivel: 'Intermedio',
      imagen: '/images/tutorial-cesteria.jpg',
      resumen: 'Manejo de fibras de chambira y tamshi: preparación, humedecido, torsión manual y tejido helicoidal para canastos utilitarios de gran resistencia.',
      materiales: [
        'Fibras vegetales hidratadas de palma chambira',
        'Punzón de madera dura o aguja de cestería',
        'Tijeras de poda o cuchilla afilada',
        'Recipiente con agua para humedecer periódicamente las hebras'
      ],
      pasos: [
        'Paso 1: Selección y clasificación de fibras según flexibilidad y calibre.',
        'Paso 2: Iniciación del núcleo espiral con nudo de ojo central.',
        'Paso 3: Enlazado envolvente usando el punzón para abrir paso al cordón guía.',
        'Paso 4: Expansión de las paredes mediante inclinación progresiva del haz.',
        'Paso 5: Remate trenzado del borde superior con doble refuerzo.'
      ],
      consejo: 'Nunca dejes que la fibra se reseque mientras tejes; una fibra bien hidratada es dócil y jamás se quiebra.'
    }
  };

  const tutorialModal = document.getElementById('tutorial-modal') || document.getElementById('modal-tutorial');
  const tutorialCloseBtn = document.getElementById('tutorial-modal-close-btn') || document.getElementById('modal-tutorial-close');
  const tutorialIframe = document.getElementById('tutorial-video-iframe');
  const tutorialTitleEl = document.getElementById('tutorial-modal-title');
  const tutorialDescEl = document.getElementById('tutorial-modal-desc');

  function openTutorialModal(videoUrl, title, desc, tutorialId) {
    if (!tutorialModal) return;

    const data = tutorialesData[tutorialId] || tutorialesData['telar'];

    if (tutorialTitleEl) {
      tutorialTitleEl.textContent = title || (data && data.titulo) || '';
    }
    if (tutorialDescEl) {
      tutorialDescEl.textContent = desc || (data && data.resumen) || '';
    }

    if (tutorialIframe && videoUrl) {
      tutorialIframe.src = videoUrl;
    }

    if (data) {
      const craftEl = document.getElementById('tutorial-modal-craft');
      if (craftEl && data.artesania) craftEl.textContent = data.artesania;
      
      const levelEl = document.getElementById('tutorial-modal-level');
      if (levelEl && data.nivel) levelEl.textContent = data.nivel;

      const summaryEl = document.getElementById('tutorial-modal-summary');
      if (summaryEl) summaryEl.textContent = data.resumen || desc || '';

      const matList = document.getElementById('tutorial-modal-materials');
      if (matList && data.materiales) {
        matList.innerHTML = data.materiales.map(m => `
          <li class="flex items-start gap-2.5 text-xs text-[#1E1B26]/80">
            <span class="w-1.5 h-1.5 rounded-full bg-marron-artesanal mt-1.5 shrink-0"></span>
            <span>${m}</span>
          </li>
        `).join('');
      }

      const pasosList = document.getElementById('tutorial-modal-steps');
      if (pasosList && data.pasos) {
        pasosList.innerHTML = data.pasos.map((p, idx) => `
          <div class="p-2.5 rounded-xl bg-blanco-crema border border-borde-tierra text-xs">
            <span class="font-bold text-verde-bosque block mb-0.5">Etapa ${idx + 1}</span>
            <p class="text-[#1E1B26]/90 leading-relaxed">${p}</p>
          </div>
        `).join('');
      }

      const consejoEl = document.getElementById('tutorial-modal-consejo');
      if (consejoEl && data.consejo) consejoEl.textContent = data.consejo;
    }

    tutorialModal.classList.remove('hidden');
    tutorialModal.classList.add('flex');
    tutorialModal.scrollTop = 0;
    const cardEl = document.getElementById('tutorial-modal-card');
    if (cardEl) cardEl.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }

  function closeTutorialModal() {
    if (!tutorialModal) return;
    tutorialModal.classList.add('hidden');
    tutorialModal.classList.remove('flex');
    document.body.style.overflow = '';
    if (tutorialIframe) {
      tutorialIframe.src = '';
    }
  }

  // Clic en botones .btn-open-tutorial para abrir el modal con el video correspondiente
  document.querySelectorAll('.btn-open-tutorial').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const button = e.currentTarget;
      const card = button.closest('.card-craft');
      const videoUrl = button.getAttribute('data-video-url') || (card && card.getAttribute('data-video-url')) || '';
      const title = button.getAttribute('data-tutorial-title') || (card && card.getAttribute('data-tutorial-title')) || '';
      const desc = button.getAttribute('data-tutorial-desc') || (card && card.getAttribute('data-tutorial-desc')) || '';
      const tutorialId = button.getAttribute('data-tutorial-id') || (card && card.getAttribute('data-tutorial-id')) || '';
      openTutorialModal(videoUrl, title, desc, tutorialId);
    });
  });

  // Clic en la "X" para cerrar el modal
  if (tutorialCloseBtn) {
    tutorialCloseBtn.addEventListener('click', closeTutorialModal);
  }

  // Clic fuera del modal (en el backdrop) o en la "X" delegada para cerrar
  if (tutorialModal) {
    tutorialModal.addEventListener('click', (e) => {
      if (e.target.closest('#tutorial-modal-close-btn')) {
        closeTutorialModal();
        return;
      }
      if (e.target === tutorialModal) {
        closeTutorialModal();
      }
    });
  }

  // Cerrar al presionar la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && tutorialModal && !tutorialModal.classList.contains('hidden')) {
      closeTutorialModal();
    }
  });

  // ==========================================
  // 5. REGISTRO DE VOLUNTARIADO (PESTAÑAS DOCENTE VS PARTICIPANTE)
  // ==========================================
  const tabBtnDocente = document.getElementById('tab-docente-btn');
  const tabBtnParticipante = document.getElementById('tab-participante-btn');
  const formDocente = document.getElementById('form-docente');
  const formParticipante = document.getElementById('form-participante');
  const registroHeaderBadge = document.getElementById('registro-header-badge');
  const registroHeaderTitle = document.getElementById('registro-header-title');
  const registroHeaderSubtitle = document.getElementById('registro-header-subtitle');
  const registroContainer = document.getElementById('registro-card-container');

  function setVolunteerRole(role) {
    if (role === 'docente') {
      // Activar pestaña docente con Marrón artesanal
      tabBtnDocente.classList.add('bg-marron-artesanal', 'text-white', 'shadow-md');
      tabBtnDocente.classList.remove('text-[#1E1B26]/70', 'hover:text-marron-artesanal', 'bg-transparent');
      tabBtnParticipante.classList.remove('bg-verde-bosque', 'text-white', 'shadow-md');
      tabBtnParticipante.classList.add('text-[#1E1B26]/70', 'hover:text-verde-bosque', 'bg-transparent');

      // Modificar Header dinámicamente
      if (registroHeaderBadge) {
        registroHeaderBadge.textContent = 'Portal de Maestros Sabios';
        registroHeaderBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F5ECE4] text-[#784825] border border-marron-artesanal/40';
      }
      if (registroHeaderTitle) {
        registroHeaderTitle.textContent = 'Registro de Docente Artesano Voluntario';
      }
      if (registroHeaderSubtitle) {
        registroHeaderSubtitle.textContent = 'Comparte tus conocimientos ancestrales y ayuda a formar a la nueva generación de custodios de nuestra cultura.';
      }
      if (registroContainer) {
        registroContainer.className = 'bg-blanco-crema rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-marron-artesanal transition-all duration-300';
      }

      formDocente.classList.remove('hidden');
      formParticipante.classList.add('hidden');
    } else {
      // Activar pestaña participante con Verde bosque
      tabBtnParticipante.classList.add('bg-verde-bosque', 'text-white', 'shadow-md');
      tabBtnParticipante.classList.remove('text-[#1E1B26]/70', 'hover:text-verde-bosque', 'bg-transparent');
      tabBtnDocente.classList.remove('bg-marron-artesanal', 'text-white', 'shadow-md');
      tabBtnDocente.classList.add('text-[#1E1B26]/70', 'hover:text-marron-artesanal', 'bg-transparent');

      // Modificar Header dinámicamente
      if (registroHeaderBadge) {
        registroHeaderBadge.textContent = 'Portal de Aprendices Comunitarios';
        registroHeaderBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF2EE] text-[#1A3D2B] border border-verde-bosque/40';
      }
      if (registroHeaderTitle) {
        registroHeaderTitle.textContent = 'Inscripción de Aprendiz Comunitario';
      }
      if (registroHeaderSubtitle) {
        registroHeaderSubtitle.textContent = 'Aprende gratuitamente un oficio tradicional directamente de los maestros artesanos de nuestra comunidad.';
      }
      if (registroContainer) {
        registroContainer.className = 'bg-blanco-crema rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-verde-bosque transition-all duration-300';
      }

      formParticipante.classList.remove('hidden');
      formDocente.classList.add('hidden');
    }
  }

  if (tabBtnDocente && tabBtnParticipante) {
    tabBtnDocente.addEventListener('click', () => setVolunteerRole('docente'));
    tabBtnParticipante.addEventListener('click', () => setVolunteerRole('participante'));
  }

  // CTA del Hero
  const btnHeroAprender = document.getElementById('hero-btn-aprender');
  const btnHeroEnsenar = document.getElementById('hero-btn-ensenar');

  if (btnHeroAprender) {
    btnHeroAprender.addEventListener('click', () => {
      setVolunteerRole('participante');
      document.getElementById('registro').scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (btnHeroEnsenar) {
    btnHeroEnsenar.addEventListener('click', () => {
      setVolunteerRole('docente');
      document.getElementById('registro').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ==========================================
  // 6. FORMULARIO DOCENTE: CONDICIONAL "OTROS"
  // ==========================================
  const docenteEspecialidadRadios = document.querySelectorAll('input[name="docente_especialidad"]');
  const docenteOtrosContainer = document.getElementById('docente-otros-container');
  const docenteOtrosInput = document.getElementById('docente-otros-input');

  docenteEspecialidadRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'Otros') {
        docenteOtrosContainer.classList.remove('hidden');
        docenteOtrosInput.setAttribute('required', 'required');
        docenteOtrosInput.focus();
      } else {
        docenteOtrosContainer.classList.add('hidden');
        docenteOtrosInput.removeAttribute('required');
        docenteOtrosInput.value = '';
      }
    });
  });

  // ==========================================
  // 7. FORMULARIO PARTICIPANTE: MÁXIMO 3 OPCIONES & TOAST
  // ==========================================
  const participanteCheckboxes = document.querySelectorAll('.participante-craft-check');
  const selectionCountBadge = document.getElementById('participante-selection-count');
  const participanteOtrosCheck = document.getElementById('participante-check-otros');
  const participanteOtrosContainer = document.getElementById('participante-otros-container');
  const participanteOtrosInput = document.getElementById('participante-otros-input');

  function updateParticipantCounter() {
    const checked = Array.from(participanteCheckboxes).filter(cb => cb.checked);
    const count = checked.length;
    
    if (selectionCountBadge) {
      selectionCountBadge.textContent = `${count} / 3 seleccionados`;
      if (count === 3) {
        selectionCountBadge.className = 'text-xs font-bold px-3 py-1 rounded-full bg-amarillo-mostaza text-texto-oscuro border border-marron-artesanal/30';
      } else {
        selectionCountBadge.className = 'text-xs font-semibold px-2.5 py-1 rounded-full bg-beige-natural text-texto-oscuro';
      }
    }

    // Toggle otros
    if (participanteOtrosCheck) {
      if (participanteOtrosCheck.checked) {
        participanteOtrosContainer.classList.remove('hidden');
        participanteOtrosInput.setAttribute('required', 'required');
      } else {
        participanteOtrosContainer.classList.add('hidden');
        participanteOtrosInput.removeAttribute('required');
        participanteOtrosInput.value = '';
      }
    }

    return count;
  }

  participanteCheckboxes.forEach(cb => {
    cb.addEventListener('change', (e) => {
      const checkedBoxes = Array.from(participanteCheckboxes).filter(c => c.checked);
      if (checkedBoxes.length > 3) {
        e.preventDefault();
        cb.checked = false;
        showToast('⚠️ Has alcanzado el límite máximo permitido de 3 talleres para garantizar una dedicación óptima.', 'warning', 4500);
      }
      updateParticipantCounter();
    });
  });

  // Establecer fecha por defecto (hoy)
  const fechaInput = document.getElementById('participante_fecha');
  if (fechaInput) {
    const today = new Date().toISOString().split('T')[0];
    fechaInput.value = today;
    fechaInput.min = today;
  }

  // Preselección desde las tarjetas de talleres presenciales
  document.querySelectorAll('.btn-inscribir-taller').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const craftTarget = e.currentTarget.getAttribute('data-craft');
      setVolunteerRole('participante');

      // Buscar checkbox
      const targetCheckbox = document.querySelector(`.participante-craft-check[value="${craftTarget}"]`);
      if (targetCheckbox) {
        const currentChecked = Array.from(participanteCheckboxes).filter(c => c.checked);
        if (!targetCheckbox.checked) {
          if (currentChecked.length < 3) {
            targetCheckbox.checked = true;
            updateParticipantCounter();
            showToast(`✨ Se ha preseleccionado: "${craftTarget}". Revisa tus datos abajo.`, 'info', 4000);
          } else {
            showToast(`⚠️ Ya tienes 3 talleres seleccionados. Desmarca uno para añadir "${craftTarget}".`, 'warning', 4500);
          }
        } else {
          showToast(`El taller "${craftTarget}" ya está en tu lista de selección.`, 'info', 3000);
        }
      }

      document.getElementById('registro').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ==========================================
  // 8. ENVÍO DE FORMULARIOS Y MODAL RESUMEN
  // ==========================================
  const modalConfirmacion = document.getElementById('modal-confirmacion');
  const btnCloseModalConfirm = document.getElementById('modal-confirm-close');
  const btnFinalizarConfirm = document.getElementById('modal-confirm-finalizar');
  const summaryContent = document.getElementById('modal-confirm-content');

  function openConfirmationModal(summaryHTML, resetCallback) {
    summaryContent.innerHTML = summaryHTML;
    modalConfirmacion.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    const handleClose = () => {
      modalConfirmacion.classList.add('hidden');
      document.body.style.overflow = '';
      if (resetCallback) resetCallback();
      btnFinalizarConfirm.removeEventListener('click', handleClose);
      btnCloseModalConfirm.removeEventListener('click', handleClose);
    };

    btnFinalizarConfirm.addEventListener('click', handleClose);
    btnCloseModalConfirm.addEventListener('click', handleClose);
  }

  // Enviar Formulario Docente
  if (formDocente) {
    formDocente.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nombre = document.getElementById('docente_nombre').value.trim();
      const edad = document.getElementById('docente_edad').value.trim();
      const correo = document.getElementById('docente_correo').value.trim();
      const telefono = document.getElementById('docente_telefono').value.trim();
      
      let especialidadRadio = document.querySelector('input[name="docente_especialidad"]:checked');
      if (!especialidadRadio) {
        showToast('Por favor selecciona tu especialidad artesanal principal.', 'warning');
        return;
      }
      let especialidad = especialidadRadio.value;
      if (especialidad === 'Otros') {
        const especOtro = docenteOtrosInput.value.trim();
        if (!especOtro) {
          showToast('Por favor escribe tu especialidad en el campo "Otros".', 'warning');
          docenteOtrosInput.focus();
          return;
        }
        especialidad = `Otros: ${especOtro}`;
      }

      const diasChecked = Array.from(document.querySelectorAll('.docente-dia-check:checked')).map(cb => cb.value);
      if (diasChecked.length === 0) {
        showToast('Selecciona al menos un día disponible para impartir tus talleres.', 'warning');
        return;
      }

      const turnosChecked = Array.from(document.querySelectorAll('.docente-turno-check:checked')).map(cb => cb.value);
      if (turnosChecked.length === 0) {
        showToast('Selecciona al menos un turno disponible (Mañana, Tarde o Noche).', 'warning');
        return;
      }

      const horaDesde = document.getElementById('docente_hora_desde').value || '09:00';
      const horaHasta = document.getElementById('docente_hora_hasta').value || '13:00';

      const summaryHTML = `
        <div class="space-y-4 text-left">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5ECE4] text-[#784825] text-xs font-bold border border-marron-artesanal/40">
            <span>✨</span> Registro Exitoso como Docente Artesano
          </div>
          
          <div class="bg-blanco-crema rounded-2xl p-4 border border-borde-tierra space-y-2.5 text-sm">
            <div class="flex justify-between border-b border-borde-tierra/60 pb-2">
              <span class="text-gray-600 font-medium">Nombre completo:</span>
              <span class="font-bold text-verde-bosque text-right">${nombre} (${edad} años)</span>
            </div>
            <div class="flex justify-between border-b border-borde-tierra/60 pb-2">
              <span class="text-gray-600 font-medium">Contacto:</span>
              <span class="font-medium text-texto-oscuro text-right">${correo} | ${telefono}</span>
            </div>
            <div class="flex justify-between border-b border-borde-tierra/60 pb-2">
              <span class="text-gray-600 font-medium">Especialidad:</span>
              <span class="font-bold text-marron-artesanal text-right">${especialidad}</span>
            </div>
            <div class="flex justify-between border-b border-borde-tierra/60 pb-2">
              <span class="text-gray-600 font-medium">Días disponibles:</span>
              <span class="font-medium text-texto-oscuro text-right">${diasChecked.join(', ')}</span>
            </div>
            <div class="flex justify-between border-b border-borde-tierra/60 pb-2">
              <span class="text-gray-600 font-medium">Turnos y Rango:</span>
              <span class="font-medium text-texto-oscuro text-right">${turnosChecked.join(', ')} (${horaDesde} a ${horaHasta})</span>
            </div>
            <div class="flex justify-between pt-1">
              <span class="text-gray-600 font-medium">Sede Comunal:</span>
              <span class="font-medium text-texto-oscuro text-right">AA.HH. Santa Rosa Pampachica, mz. lote 36</span>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-[#F5ECE4] border border-marron-artesanal/30 text-xs text-[#784825] leading-relaxed">
            <strong>¡Gracias por tu generosidad y compromiso!</strong> Nuestro coordinador comunitario de Loreto se comunicará contigo vía WhatsApp o llamada en un plazo de 24 a 48 horas para coordinar tu bienvenida al equipo de maestros.
          </div>
        </div>
      `;

      openConfirmationModal(summaryHTML, () => {
        formDocente.reset();
        docenteOtrosContainer.classList.add('hidden');
        showToast('¡Registro de docente enviado correctamente! Bienvenido/a a la comunidad.', 'success');
      });
    });
  }

  // Enviar Formulario Participante
  if (formParticipante) {
    formParticipante.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('participante_nombre').value.trim();
      const edad = document.getElementById('participante_edad').value.trim();
      const correo = document.getElementById('participante_correo').value.trim();
      const telefono = document.getElementById('participante_telefono').value.trim();
      const fecha = document.getElementById('participante_fecha').value;
      const sede = document.getElementById('participante_sede').value;

      const checkedCrafts = Array.from(participanteCheckboxes).filter(cb => cb.checked).map(cb => {
        if (cb.value === 'Otros') {
          const extra = participanteOtrosInput.value.trim() || 'No especificado';
          return `Otros (${extra})`;
        }
        return cb.value;
      });

      if (checkedCrafts.length === 0) {
        showToast('Selecciona al menos una artesanía que desees aprender.', 'warning');
        return;
      }

      if (checkedCrafts.length > 3) {
        showToast('Máximo puedes seleccionar 3 artesanías.', 'warning');
        return;
      }

      const summaryHTML = `
        <div class="space-y-4 text-left">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2EE] text-[#1A3D2B] text-xs font-bold border border-verde-bosque/40">
            <span>🎉</span> Inscripción Exitosa de Aprendiz
          </div>
          
          <div class="bg-blanco-crema rounded-2xl p-4 border border-borde-tierra space-y-2.5 text-sm">
            <div class="flex justify-between border-b border-borde-tierra/60 pb-2">
              <span class="text-gray-600 font-medium">Nombre completo:</span>
              <span class="font-bold text-verde-bosque text-right">${nombre} (${edad} años)</span>
            </div>
            <div class="flex justify-between border-b border-borde-tierra/60 pb-2">
              <span class="text-gray-600 font-medium">Contacto:</span>
              <span class="font-medium text-texto-oscuro text-right">${correo} | ${telefono}</span>
            </div>
            <div class="border-b border-borde-tierra/60 pb-2">
              <span class="text-gray-600 font-medium block mb-1">Talleres seleccionados (${checkedCrafts.length}/3):</span>
              <div class="flex flex-wrap gap-1.5 mt-1">
                ${checkedCrafts.map(c => `<span class="px-2.5 py-1 rounded-lg bg-[#EBF2EE] text-verde-bosque border border-verde-bosque/30 text-xs font-semibold">${c}</span>`).join('')}
              </div>
            </div>
            <div class="flex justify-between border-b border-borde-tierra/60 pb-2">
              <span class="text-gray-600 font-medium">Fecha de inicio:</span>
              <span class="font-bold text-marron-artesanal text-right">${fecha}</span>
            </div>
            <div class="flex justify-between pt-1">
              <span class="text-gray-600 font-medium">Sede fija asignada:</span>
              <span class="font-semibold text-verde-bosque text-right text-xs max-w-[210px]">${sede}</span>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-[#FAF4E8] border border-marron-artesanal/30 text-xs text-marron-artesanal leading-relaxed">
            <strong>¡Tu cupo ha sido reservado!</strong> Los talleres son 100% gratuitos e incluyen materiales de práctica básica en la casa comunal. Te enviaremos tu ficha de confirmación con el horario exacto por WhatsApp.
          </div>
        </div>
      `;

      openConfirmationModal(summaryHTML, () => {
        formParticipante.reset();
        participanteOtrosContainer.classList.add('hidden');
        if (fechaInput) {
          const today = new Date().toISOString().split('T')[0];
          fechaInput.value = today;
        }
        updateParticipantCounter();
        showToast('¡Inscripción confirmada! Te esperamos en la casa comunal.', 'success');
      });
    });
  }

  // ==========================================
  // 9. EVENTOS GLOBALES DE CIERRE CON TECLA ESCAPE
  // ==========================================
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalTutorial && !modalTutorial.classList.contains('hidden')) {
        closeTutorialModal();
      }
      if (modalConfirmacion && !modalConfirmacion.classList.contains('hidden')) {
        modalConfirmacion.classList.add('hidden');
        document.body.style.overflow = '';
      }
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    }
  });

  // Cerrar modales al hacer clic fuera del contenido
  if (modalTutorial) {
    modalTutorial.addEventListener('click', (e) => {
      if (e.target === modalTutorial) closeTutorialModal();
    });
  }

  if (modalConfirmacion) {
    modalConfirmacion.addEventListener('click', (e) => {
      if (e.target === modalConfirmacion) {
        modalConfirmacion.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }
});
