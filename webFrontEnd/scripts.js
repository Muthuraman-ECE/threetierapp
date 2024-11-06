const backendUrl = "http://127.0.0.1:8000"; // Update this to match your Django server's URL

// Automatically fetch and display employees on page load
$(document).ready(function() {
    fetchEmployees();

    // Handle form submission to add a new employee
    $('#add-employee').submit(function(event) {
        event.preventDefault();
        let formData = $(this).serialize();

        $.ajax({
            url: `${backendUrl}/emp`,
            type: 'POST',
            data: formData,
            success: function(response) {
                $('#upload-status').text(response.status);
                $('#add-employee')[0].reset();
                fetchEmployees(); // Reload employee list after adding
            },
            error: function() {
                $('#upload-status').text("Failed to add employee.");
            }
        });
    });
});

// Fetch and display employees in table format
function fetchEmployees() {
    $.ajax({
        url: `${backendUrl}/show`,
        type: 'POST',
        success: function(response) {
            let employeeTable = $('#employees');
            employeeTable.empty();

            response.employees.forEach(employee => {
                employeeTable.append(
                    `<tr>
                        <td>${employee.eid}</td>
                        <td>${employee.ename}</td>
                        <td>${employee.eemail}</td>
                        <td>${employee.econtact}</td>
                        <td><button onclick="deleteEmployee(${employee.eid})">Delete</button></td>
                    </tr>`
                );
            });
        },
        error: function() {
            alert("Failed to load employees.");
        }
    });
}

// Delete an employee by ID
function deleteEmployee(id) {
    $.ajax({
        url: `${backendUrl}/delete/${id}`,
        type: 'DELETE',
        success: function(response) {
            alert(response.status);
            fetchEmployees(); // Reload employee list after deletion
        },
        error: function() {
            alert("Failed to delete employee.");
        }
    });
}
