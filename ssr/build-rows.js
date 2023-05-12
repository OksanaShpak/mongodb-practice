module.exports = { buildRows };

function buildRows(students) {
  return students.map((student, index) => `
    <tr data-id="${ student._id }">
      <td>${ index }</td>
      <td>${ student._id }</td>
      <td>${ student.name }</td>
      <td>${ student.age }</td>
      <td><button class="delete-btn">❌</button></td>
      <td><button class="edit-btn">✏️</button></td>
    </tr>
  `).join('');
}