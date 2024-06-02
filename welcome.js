
document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addStudent();
});

function addStudent() {
    const formData = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        address: document.getElementById('address').value,
        email: document.getElementById('email').value,
    };

    fetch('http://localhost:8081/api/student/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(response => response.json())
        .then(data => {
            alert('Student data submitted successfully!');
            //forward to another page
            window.location.href = "studentView.html";
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to submit student data.');
        });
}