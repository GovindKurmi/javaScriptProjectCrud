//get data from server
fetch('http://localhost:8081/api/student/fetch')
    .then(response => response.json())
    .then(data => {
        //sent on html page
        const studentTable = document.getElementById('studentTable');
        data.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.address}</td>
                <td>${student.email}</td>
                <td><button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button></td>
                <td><button onclick="updateStudent(${student.id})">Update</button></td>
            `;
            studentTable.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });


// Modal handling
var modal = document.getElementById('updateStudentModal');
var span = document.getElementsByClassName('close')[0];

span.onclick = function () {
    modal.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function updateStudent(id) {
    // Fetch the student data
    fetch(`http://localhost:8081/api/student/fetch/${id}`)
        .then(response => response.json())
        .then(student => {
            // Populate the form with student data
            document.getElementById('updateId').value = student.id;
            document.getElementById('updateName').value = student.name;
            document.getElementById('updateAge').value = student.age;
            document.getElementById('updateAddress').value = student.address;
            document.getElementById('updateEmail').value = student.email;

            // Show the modal
            modal.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch student data.');
        });
}

document.getElementById('updateStudentForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const updateData = {
        id: document.getElementById('updateId').value,
        name: document.getElementById('updateName').value,
        age: document.getElementById('updateAge').value,
        address: document.getElementById('updateAddress').value,
        email: document.getElementById('updateEmail').value,
    };

    fetch('http://localhost:8081/api/student/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })
        .then(response => response.json())
        .then(data => {
            alert('Student data updated successfully!');
            modal.style.display = 'none';
            // Refresh the student list or forward to another page
            window.location.href = "studentView.html";
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to update student data.');
        });
});


function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        fetch(`http://localhost:8081/api/student/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Student deleted successfully!');
                window.location.href = "studentView.html"; // Refresh the page or update the student list
            } else {
                throw new Error('Failed to delete student.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to delete student.');
        });
    }
}