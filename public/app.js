import { toggleFormVisibility } from './form-visibility.js';
import { handleClickOut } from './click-out.js';
import { handleAddStudentFormSubmit } from './add-student.js';
import { handleTableButtons } from './table-buttons.js';
import { handleEditFormSubmit } from './edit-student.js';

const toggleFormBtn = document.querySelector('.toggle-form-btn');
const [addStudentForm] = document.forms;
const studentsTable = document.querySelector('.students-table');
const [addForm, editForm] = document.forms;
const cancelBtn = document.querySelector('.cancel');

toggleFormBtn.addEventListener('click', () => {
  toggleFormVisibility(addForm);
});

document.body.addEventListener('click', handleClickOut);

addStudentForm.addEventListener('submit', handleAddStudentFormSubmit);

studentsTable.addEventListener('click', handleTableButtons);

editForm.addEventListener('submit', handleEditFormSubmit);

cancelBtn.addEventListener('click', () => {
  toggleFormVisibility(editForm);
});