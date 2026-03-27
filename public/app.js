const registerForm = document.getElementById("formulario-registro");
const loginForm = document.getElementById("formulario-login");
const mensajeElement = document.getElementById("mensaje");

const botonAccesoProtegido = document.getElementById("acceso-protegido");
const parrafoMensajeProtegido = document.getElementById("mensaje-protegidos");

const API_URL = window.location.hostname === "localhost"
               ? "http://localhost:3000"
               : "https://registrologinserver-production.up.railway.app";

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  const res = await fetch(`${API_URL}/registrar`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });   

    const data = await res.json();
    mensajeElement.textContent = data.message || data.error;
    if (res.ok) {
        registerForm.reset();
    }       
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

    const res = await fetch(`${API_URL}/login`, {  
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

    const data = await res.json();
    mensajeElement.textContent = data.message || data.error;
    if (res.ok) {
        localStorage.setItem("token", data.token);
        loginForm.reset();
        alert("¡Inicio de sesión exitoso!");
    }   
});

botonAccesoProtegido.addEventListener("click", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        parrafoMensajeProtegido.textContent = "Por favor, inicia sesión para acceder a esta información.";
        parrafoMensajeProtegido.style.color = "red";
        return;
    }

    try{
        const res = await fetch(`${API_URL}/protegido`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
            parrafoMensajeProtegido.textContent = data.message + " - " + data.data;
            parrafoMensajeProtegido.style.color = "green";
        } else {
            parrafoMensajeProtegido.textContent = data.error || "Error al acceder a la información protegida.";
            parrafoMensajeProtegido.style.color = "red";
        }
    } catch (error) {
        console.error("Error al acceder a la información protegida:", error);
        parrafoMensajeProtegido.textContent = "Error al acceder a la información protegida.";
        parrafoMensajeProtegido.style.color = "red";
    }
}); 