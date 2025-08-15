// Simulated admin data
let admin = {
  name: "John Doe",
  email: "admin@example.com"
};

// Show admin name in sidebar
document.getElementById("adminName").innerText = admin.name;

// Clock function
function updateClock() {
  const now = new Date();
  document.getElementById("clock").innerText =
    now.toLocaleDateString() + " " + now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Employee data storage
let employees = JSON.parse(localStorage.getItem("employees")) || [];

// Add Employee
function addEmployee() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let position = document.getElementById("position").value.trim();
  let salary = document.getElementById("salary").value.trim();

  if (!name || !email || !position || !salary) {
    alert("Please fill all fields!");
    return;
  }

  employees.push({ name, email, position, salary });
  localStorage.setItem("employees", JSON.stringify(employees));
  renderTable();
  clearFields();
}

// Clear input fields
function clearFields() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("position").value = "";
  document.getElementById("salary").value = "";
}

// Render Employee table
function renderTable() {
  const tableBody = document.getElementById("employeeTable");
  tableBody.innerHTML = "";
  employees.forEach((emp, index) => {
    let row = `<tr>
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.position}</td>
      <td>₹${emp.salary}</td>
      <td><button onclick="deleteEmployee(${index})" style="background:#ff4d4d;color:white;">Delete</button></td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

// Delete Employee
function deleteEmployee(index) {
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  renderTable();
}

// Logout
function logout() {
  localStorage.removeItem("employees");
  localStorage.removeItem("loggedInUser");
  sessionStorage.clear();
  alert("You have been logged out!");
  window.location.href = "index.html";
}

renderTable();
