document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();


    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    if (email === "") {
        alert("Please enter your email.");
        return;
    } else if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (message === "") {
        alert("Please enter your message.");
        return;
    }

    alert("Thank you, " + name + "! Your message has been sent successfully.");
    document.getElementById("contactForm").reset();
});
