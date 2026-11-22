(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !window.IntersectionObserver) return;

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  const targets = document.querySelectorAll([
    '.visit > *', '#services > h2', '.prices', '.owner-inner > *',
    '#photos > h2', '.gallery figure', '.reviews-heading', '.review-pair',
    '.review-controls', '.faq > *', '.cta > .wrap', '.policy > *',
    '.footer-grid > *', '.footer-credit'
  ].join(', '));

  targets.forEach(element => {
    if (element.getBoundingClientRect().top <= window.innerHeight) return;
    const index = Array.prototype.indexOf.call(element.parentElement.children, element);
    element.style.setProperty('--reveal-delay', (index % 3) * 90 + 'ms');
    element.classList.add('scroll-reveal');
    observer.observe(element);
  });

  motion.addEventListener('change', () => {
    if (motion.matches) {
      observer.disconnect();
      targets.forEach(element => element.classList.remove('scroll-reveal'));
    }
  });
})();
