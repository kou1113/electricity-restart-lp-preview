'use strict';

document.querySelectorAll('details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('details[open]').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

document.getElementById('contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!event.currentTarget.checkValidity()) {
    event.currentTarget.reportValidity();
    return;
  }
  window.location.href = 'thanks.html';
});

const coverageSection = document.querySelector('.night-coverage');
const stickyCta = document.querySelector('.night-sticky');

if (coverageSection && stickyCta) {
  let ticking = false;

  const updateStickyCta = () => {
    const hasPassedCoverage = coverageSection.getBoundingClientRect().bottom <= 0;
    stickyCta.classList.toggle('is-visible', hasPassedCoverage);
    stickyCta.setAttribute('aria-hidden', String(!hasPassedCoverage));
    ticking = false;
  };

  const requestStickyCtaUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateStickyCta);
  };

  updateStickyCta();
  window.addEventListener('scroll', requestStickyCtaUpdate, { passive: true });
  window.addEventListener('resize', requestStickyCtaUpdate);
}
