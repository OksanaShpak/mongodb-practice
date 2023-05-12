const editForm = document.querySelector('#edit-form');

export function handleEditFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(editForm);
  const data = Object.fromEntries(formData);

  fetch('/api/student', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(({ studentId }) => {
      updateRow({ _id: studentId, ...data });
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateRow({ _id, name, age }) {

  const tr = document.querySelector(`tr[data-id="${ _id }"]`);

  tr.children[2].textContent = name;
  tr.children[3].textContent = age;
}

