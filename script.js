/**
 * Portfólio Guilherme Emanuel — Lógica de Interatividade (Vanilla JavaScript Puro)
 * Funciona diretamente em qualquer navegador sem necessidade de Node.js ou npm.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualização dinâmica do ano no rodapé
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Efeito de fundo no header ao rolar a página
  const mainHeader = document.getElementById('main-header');
  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 15) {
        mainHeader.classList.add('bg-white/95', 'backdrop-blur-md', 'border-slate-200/80', 'shadow-2xs');
        mainHeader.classList.remove('bg-[#FAFAFB]/90', 'border-transparent');
      } else {
        mainHeader.classList.remove('bg-white/95', 'backdrop-blur-md', 'border-slate-200/80', 'shadow-2xs');
        mainHeader.classList.add('bg-[#FAFAFB]/90', 'border-transparent');
      }
    },
    { passive: true }
  );

  // 3. Menu Mobile (Abrir e Fechar)
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconMenuOpen = document.getElementById('icon-menu-open');
  const iconMenuClose = document.getElementById('icon-menu-close');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        iconMenuOpen.classList.add('hidden');
        iconMenuClose.classList.remove('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      } else {
        mobileMenu.classList.add('hidden');
        iconMenuOpen.classList.remove('hidden');
        iconMenuClose.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Fechar menu mobile ao clicar em um link interno
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        iconMenuOpen.classList.remove('hidden');
        iconMenuClose.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Filtro de Projetos (Todos, QA/APIs & Backend, Desenvolvimento Web)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Atualiza visual dos botões
      filterButtons.forEach((b) => {
        b.classList.remove('bg-white', 'text-slate-950', 'shadow-2xs');
        b.classList.add('text-slate-600');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('bg-white', 'text-slate-950', 'shadow-2xs');
      btn.classList.remove('text-slate-600');
      btn.setAttribute('aria-pressed', 'true');

      // Exibe ou oculta os cards correspondentes
      projectCards.forEach((card) => {
        const group = card.getAttribute('data-group');
        if (filter === 'todos' || group === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 5. Modal de Ficha Técnica dos Projetos
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalNumber = document.getElementById('modal-number');
  const modalDescription = document.getElementById('modal-description');
  const modalHighlightsTitle = document.getElementById('modal-highlights-title');
  const modalHighlightsList = document.getElementById('modal-highlights-list');
  const modalTechStack = document.getElementById('modal-tech-stack');
  const modalGithubLink = document.getElementById('modal-github-link');
  const modalVisualArt = document.getElementById('modal-visual-art');

  function openProjectModal(card) {
    if (!modal) return;
    const number = card.getAttribute('data-number');
    const title = card.getAttribute('data-title');
    const category = card.getAttribute('data-category');
    const description = card.getAttribute('data-description');
    const highlightsTitle = card.getAttribute('data-highlights-title');
    const highlights = JSON.parse(card.getAttribute('data-highlights') || '[]');
    const tech = card.getAttribute('data-tech');
    const repo = card.getAttribute('data-repo');
    const artTemplate = card.querySelector('.project-art-container');

    modalNumber.textContent = `Projeto ${number}`;
    modalTitle.textContent = title;
    modalCategory.textContent = category;
    modalDescription.textContent = description;
    modalHighlightsTitle.textContent = highlightsTitle;
    modalTechStack.textContent = tech;
    modalGithubLink.setAttribute('href', repo);

    // Monta lista de destaques técnicos
    modalHighlightsList.innerHTML = '';
    highlights.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-3';
      li.innerHTML = `
        <span aria-hidden="true" class="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-600"></span>
        <span>${item}</span>
      `;
      modalHighlightsList.appendChild(li);
    });

    // Clona arte visual do card para o cabeçalho do modal
    if (artTemplate && modalVisualArt) {
      modalVisualArt.innerHTML = artTemplate.innerHTML;
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // Aciona modal por botões de "Ficha técnica" ou clique na capa do card
  document.querySelectorAll('.open-modal-trigger').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (card) {
        openProjectModal(card);
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeProjectModal();
    }
  });

  // 6. Botão de Copiar E-mail com feedback visual instantâneo
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-email-text');
  const copyIconNormal = document.getElementById('copy-icon-normal');
  const copyIconSuccess = document.getElementById('copy-icon-success');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'guilherme.emmg@gmail.com';
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(email);
        } else {
          const temp = document.createElement('textarea');
          temp.value = email;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          document.body.removeChild(temp);
        }

        if (copyText) copyText.textContent = 'E-mail copiado';
        if (copyIconNormal) copyIconNormal.classList.add('hidden');
        if (copyIconSuccess) copyIconSuccess.classList.remove('hidden');
        copyEmailBtn.classList.add('border-emerald-300', 'bg-emerald-50/50', 'text-emerald-800');

        setTimeout(() => {
          if (copyText) copyText.textContent = 'Copiar endereço';
          if (copyIconNormal) copyIconNormal.classList.remove('hidden');
          if (copyIconSuccess) copyIconSuccess.classList.add('hidden');
          copyEmailBtn.classList.remove('border-emerald-300', 'bg-emerald-50/50', 'text-emerald-800');
        }, 2500);
      } catch (err) {
        console.error('Erro ao copiar e-mail:', err);
      }
    });
  }
});
