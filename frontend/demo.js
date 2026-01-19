// Initialize doctors array in localStorage if it doesn't exist
if (!localStorage.getItem('doctors')) {
    localStorage.setItem('doctors', JSON.stringify([]));
}

function addDoctor(event) {
    event.preventDefault();

    let username = document.querySelector("#username").value;
    let email = document.querySelector("#email").value;
    let phone = document.querySelector("#phone").value;
    let specialty = document.querySelector("#specialty").value;
    let password = document.querySelector("#password").value;
    let confirmPassword = document.querySelector("#confirmPassword").value;

    if (username === '' || email === '' || phone === '' || specialty === '' || password === '' || confirmPassword === '') {
        alert("Please fill all the fields");
        return;
    } else if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // Get existing doctors from localStorage
    let doctors = JSON.parse(localStorage.getItem('doctors'));

    // Check if email already exists
    const existingDoctor = doctors.find(doctor => doctor.email === email);
    if (existingDoctor) {
        alert("Doctor with this email already exists");
        return;
    }

    // Create new doctor
    const newDoctor = {
        id: Date.now().toString(),
        username: username,
        email: email,
        phone: phone,
        specialty: specialty,
        password: password
    };

    // Add to doctors array
    doctors.push(newDoctor);

    // Save back to localStorage
    localStorage.setItem('doctors', JSON.stringify(doctors));

    alert("Doctor registered successfully");
    document.getElementById("doctorsignupForm").reset();
    window.location.href = "doctorlogin.html";
}

// Only add event listener if the form exists
if (document.getElementById("doctorsignupForm")) {
    document.getElementById("doctorsignupForm").addEventListener("submit", addDoctor);
}

function loginDoctor(event) {
    event.preventDefault();

    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    // Get doctors from localStorage
    let doctors = JSON.parse(localStorage.getItem('doctors') || '[]');

    // Find doctor with matching credentials
    const doctor = doctors.find(doc => doc.username === username && doc.password === password);

    if (doctor) {
        localStorage.setItem('doctorName', doctor.username);
        alert("Login successful");
        window.location.href = "doctordashboard.html";
    } else {
        alert("Invalid username or password");
    }
}

// Only add event listener if the form exists
if (document.getElementById("doctorloginForm")) {
    document.getElementById("doctorloginForm").addEventListener("submit", loginDoctor);
}

function addPatient(event) {
    event.preventDefault();
    // This function is already handled in patientsignup.html
}

function handleAdminLogin(event) {
    event.preventDefault();

    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    if (username === '' || password === '') {
        alert("Please fill all the fields");
        return;
    }

    // For admin login, you can use a simple check or store admin data in localStorage
    // For now, let's use a simple admin check
    if (username === 'admin' && password === 'admin123') {
        alert("Login successful!");
        window.location.href = "admin-dashboard.html";
    } else {
        alert("Invalid username or password");
    }
}

// Only add event listener if the form exists
if (document.getElementById("adminLoginForm")) {
    document.getElementById("adminLoginForm").addEventListener("submit", handleAdminLogin);
}
