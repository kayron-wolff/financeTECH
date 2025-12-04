const dp = document.getElementById('dpperfil');
let n = 0;

localStorage.getItem('email');

fetch('http://localhost:3000/home/usr/search', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: localStorage.getItem('email') })
})
.then(response => response.json())
.then(data => {
    dp.textContent = `Olá, ${data.usr_name}`;
})
.catch(error => {
    console.error('Erro ao buscar usuário:', error);
});



const form = document.getElementById('form');
if (form) {
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        async function inserirEntrada(nome, descricao, formattedDate, valor, tipo) {
fetch('http://localhost:3000/home/entrada/add', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        inc_name: nome,
        inc_desc: descricao,
        inc_date: formattedDate,
        inc_value: valor,
        inc_type: tipo
    })
}).then(response => {
    if (response.ok) {
        alert('Entrada cadastrada com sucesso!');
        location.reload();
    } else {
        return response.json().then(errorData => {
            throw new Error(errorData.error);
        });
    }
}).catch(error => {
    alert('Erro ao cadastrar entrada: ' + error.message);
});

}
        const nome = document.getElementById('nome').value;
        const descricao = document.getElementById('desc').value;
        const data = new Date(document.getElementById('dataentry').value);
        const formattedDate = data.toISOString().split('T')[0]; // Formata para 'YYYY-MM-DD'
        const valor = parseFloat(document.getElementById('value').value);
        const tipo = document.getElementById('tipo').value;
        inserirEntrada(nome, descricao, formattedDate, valor, tipo)
    }
    );
}

const btnAddEntry = document.getElementById('btnaddentry');
if (btnAddEntry) {
    btnAddEntry.addEventListener('click', function() {
        const modal = document.getElementById('modal');
        modal.style.display = 'flex';
    });
}


const closeModal = document.getElementById('closemodal');
if (closeModal) {
    closeModal.addEventListener('click', function() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    });
}


const content = document.getElementById('contententry');

fetch('http://localhost:3000/home/entrada/list')
.then(response => response.json())
.then(data => {
    data.forEach(entry => {
        console.log(entry.inc_id);
        const contentEntry = document.createElement('div');
        contentEntry.className = 'content-entry';
        contentEntry.innerHTML = `
        <p id="entryinfo">
            <strong>Nome:</strong> ${entry.inc_name}<br>
            <strong>Descrição:</strong> ${entry.inc_desc}<br>
            <strong>Data:</strong> ${entry.inc_date}<br>
            <strong>Valor:</strong> R$ ${entry.inc_value}<br>
            <strong>Categoria:</strong> ${entry.inc_type}
            <button id="btneditentry" data-id="${entry.inc_id}">Editar</button>
            <button id="btndeleteentry${entry.inc_id}" data-id="${entry.inc_id}">Excluir</button>
        </p>
        `;
        content.appendChild(contentEntry);


        const btns = document.getElementById(`btndeleteentry${entry.inc_id}`);
        btns.addEventListener('click', async function() {
        const entryId = this.getAttribute('data-id');
        try {
            const response = await fetch(`http://localhost:3000/home/entrada/delete/${entryId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('Entrada deletada com sucesso!');
                location.reload();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
        } catch (error) {
            alert('Erro ao deletar entrada: ' + error.message);
        }
    });
    });

    const editButtons = document.getElementById('btneditentry');
    editButtons.addEventListener('click', function() {
            const entryId = this.getAttribute('data-id');
            const modal2 = document.getElementById('editmodal');
            modal2.style.display = 'flex';
            const form2 = document.getElementById('form2');
            form2.addEventListener('submit', async function(event) {
                event.preventDefault();
                const nome2 = document.getElementById('nome2').value;
                const descricao2 = document.getElementById('desc2').value;
                const data2 = new Date(document.getElementById('dataentry2').value);
                const formattedDate2 = data2.toISOString().split('T')[0];
                const valor2 = parseFloat(document.getElementById('value2').value);
                const tipo2 = document.getElementById('tipo2').value;
                atualizarEntrada(entryId, nome2, descricao2, formattedDate2, valor2, tipo2);


})
        }        );    });
        

function atualizarEntrada(entryId, nome2, descricao2, formattedDate2, valor2, tipo2) {
    fetch(`http://localhost:3000/home/entrada/updt/${entryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            inc_name: nome2,
            inc_desc: descricao2,
            inc_date: formattedDate2,
            inc_value: valor2,
            inc_type: tipo2
        })
    }).then(response => {
        if (response.ok) {
            alert('Entrada atualizada com sucesso!');
            location.reload();
        } else {
            return response.json().then(errorData => {
                throw new Error(errorData.error);
            });
        }
    }).catch(error => {
        alert('Erro ao atualizar entrada: ' + error.message);
    });
}
