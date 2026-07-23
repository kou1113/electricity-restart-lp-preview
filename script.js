'use strict';

document.querySelectorAll('details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('details[open]').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const startDate = document.querySelector('[name="start_date"]');
if (startDate) {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  startDate.min = localDate.toISOString().slice(0, 10);
}

document.getElementById('contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!event.currentTarget.checkValidity()) {
    event.currentTarget.reportValidity();
    return;
  }
  alert('現在はデザイン確認用です。公開時に送信処理を接続します。');
});

const cancelModal = document.getElementById('cancel-guide');
const modalOpenButton = document.querySelector('.modal-open');
const modalCloseButtons = cancelModal?.querySelectorAll('[data-modal-close]');

const closeCancelModal = () => {
  if (!cancelModal) return;
  cancelModal.classList.remove('is-open');
  cancelModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-active');
  modalOpenButton?.focus();
};

modalOpenButton?.addEventListener('click', () => {
  if (!cancelModal) return;
  cancelModal.classList.add('is-open');
  cancelModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-active');
  cancelModal.querySelector('.cancel-modal-close')?.focus();
});

modalCloseButtons?.forEach((button) => button.addEventListener('click', closeCancelModal));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && cancelModal?.classList.contains('is-open')) closeCancelModal();
});
