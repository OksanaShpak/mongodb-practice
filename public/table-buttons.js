export function handleTableButtons(e) {
  if (e.target.localName !== 'button') {
    return;
  }

  const btn = e.target;

  if (btn.classList.contains('edit-btn')) {
    const tr = btn.closest('tr');
    const studentId = tr.children[1].textContent;
    const name = tr.children[2].textContent;
    const age = tr.children[3].textContent;

    showEditForm({ studentId, name, age });
  } else if (btn.classList.contains('delete-btn')) {
    const tr = btn.closest('tr');
    tr.remove();

    fetch('/api/student', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentId: tr.children[1].textContent }),
    })
  }

  function showEditForm({ studentId, name, age }) {
    const form = document.getElementById('edit-form');
    form.classList.remove('hidden');

    form.studentId.value = studentId;
    form.name.value = name;
    form.age.value = age;
  }
}
