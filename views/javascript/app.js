const registerForm = document.getElementById('cadastro');
if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        usrCad(); // Chama a função de cadastro
    });
}

const loginForm = document.getElementById('log-in');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        login(); // Chama a função de login
    });
}




  async function usrCad() {
    const user = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('senha').value;
    const confirmPassword = document.getElementById('confirmar');
    const confirmPasswordValue = confirmPassword ? confirmPassword.value : null;
    if (confirmPasswordValue && password !== confirmPasswordValue) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
    }
    try{
    const response = await fetch('http://localhost:3000/home/usr', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usr_name: user, email: email, passwd: password })
    });
    if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
        window.location.href = 'login.html';
    } else {
        const errorData = await response.json();
        alert('Erro ao cadastrar usuário: ' + errorData.error);
        console.log(errorData);
    }
} catch (error) {
    alert('Erro ao conectar com o servidor: ' + error.message);
}
}

async function login() {
    const email = document.getElementById('logemail').value;
    const password = document.getElementById('logsenha').value;
    try{
    const response = await fetch('http://localhost:3000/home/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, passwd: password })
    });
    if (response.ok) {
        alert('Login realizado com sucesso!');
        window.location.href = 'index.html';
    } else {
        const errorData = await response.json();
        alert('Erro ao realizar login: ' + errorData.error);
    }
} catch (error) {
    alert('Erro ao conectar com o servidor: ' + error.message);

}
}