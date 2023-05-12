export function handleClickOut(e) {
  if (!e.target.closest('form') && !e.target.closest('.toggle-form-btn') && !e.target.closest('.edit-btn')) {
    for (const form of document.forms) {
      form.classList.add('hidden');
    }
  }
}