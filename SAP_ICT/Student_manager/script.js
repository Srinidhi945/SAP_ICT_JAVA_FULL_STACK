let students = [];

function addOrUpdateStudent() {
    const nameInput = document.getElementById('studentName');
    const scoreInput = document.getElementById('studentScore');
    const editIndexInput = document.getElementById('editIndex');
    const submitBtn = document.getElementById('submitBtn');

    const name = nameInput.value.trim();
    const score = parseInt(scoreInput.value);
    const editIndex = parseInt(editIndexInput.value);

    if (name === '' || isNaN(score) || score < 0 || score > 100) {
        alert("Please enter a valid name and score (0-100)");
        return;
    }

    // Grade Logic
    let grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : score >= 50 ? 'D' : 'F';
    let status = score >= 50 ? 'Pass' : 'Fail';

    if (editIndex === -1) {
        // ADD MODE
        const studentObj = { id: Date.now(), name, score, grade, status };
        students.push(studentObj);
    } else {
        // EDIT MODE
        students[editIndex] = { ...students[editIndex], name, score, grade, status };
        editIndexInput.value = "-1";
        submitBtn.innerText = "Add Record";
        submitBtn.style.background = ""; // Reset to primary color
    }

    nameInput.value = '';
    scoreInput.value = '';
    displayStudents();
}

function displayStudents() {
    const list = document.getElementById('studentList');
    list.innerHTML = '';

    students.forEach((s, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${s.name}</td>
                <td>${s.score}</td>
                <td>${s.grade}</td>
                <td class="${s.status === 'Pass' ? 'status-pass' : 'status-fail'}">${s.status}</td>
                <td>
                    <button class="btn-edit" onclick="editStudent(${index})">Edit</button>
                </td>
            </tr>
        `;
        list.innerHTML += row;
    });
}

function editStudent(index) {
    const s = students[index];
    document.getElementById('studentName').value = s.name;
    document.getElementById('studentScore').value = s.score;
    document.getElementById('editIndex').value = index;
    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = "Update Record";
    submitBtn.style.background = "#059669"; // Change color to indicate edit mode
}

// --- Export Functions ---

function downloadCSV() {
    if (students.length === 0) return alert("No data to download");
    
    let csv = "ID,Name,Score,Grade,Status\n";
    students.forEach((s, idx) => {
        csv += `${idx + 1},${s.name},${s.score},${s.grade},${s.status}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'student_records.csv');
    a.click();
}

function downloadPDF() {
    window.print(); // Simple and effective using the @media print CSS
}