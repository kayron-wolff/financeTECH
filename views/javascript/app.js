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
        localStorage.setItem('email', email);
        

        window.location.href = 'entrada.html';
    } else {
        const errorData = await response.json();
        alert('Erro ao realizar login: ' + errorData.error);
    }
} catch (error) {
    alert('Erro ao conectar com o servidor: ' + error.message);

}
}

/*const form = document.getElementById('form');
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        const email = document.getElementById('mail').value;
        buscarUsuarioPorEmail(email); // Chama a função de busca
    });
    }

function buscarUsuarioPorEmail(email) {
fetch('http://localhost:3000/home/usr/search', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email })
})
.then(response => {
    if (!response.ok) {
        throw new Error('Erro ao buscar usuário: ' + response.statusText);
    }
    return response.json();
},)
.then(data => {
    if (!data || Object.keys(data).length === 0) {
        throw new Error('Usuário não encontrado');
    }
    // Aqui você pode fazer algo com os dados do usuário, como exibi-los na tela
    //alert('Usuário encontrado: ' + JSON.stringify(data[0].usr_name) + '\nSenha: ' + JSON.stringify(data[0].passwd));
    alert('Usuário encontrado: ' + data.usr_name + '\nSenha: ' + data.passwd);
})
.catch(error => {
    console.error('Erro ao buscar usuário:', error);
});
}*/