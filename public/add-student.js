const [form] = document.forms;
const deleteBtns = document.querySelectorAll('.delete-btn');

export function handleAddStudentFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  fetch('/api/student', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(({ studentId }) => {
      addRow({ _id: studentId, ...data });
    })
    .catch((err) => {
      console.log(err);
    });

  cleanCloseForm();
}

function addRow({ _id, name, age }) {
  const tbody = document.querySelector('tbody');
  const tr = tbody.insertRow();
  const index = tbody.rows.length - 1;

  tr.setAttribute("data-id", _id);

  tr.innerHTML = `
    <td>${ index }</td>
    <td>${ _id }</td>
    <td>${ name }</td>
    <td>${ age }</td>
    <td><button class="delete-btn">❌</button></td>
    <td><button class="edit-btn">✏️</button></td>
`;
}

function cleanCloseForm() {
  form.reset();
  form.classList.add('hidden');
}