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
        async function inserirEntrada(nome, descricao, formattedDate, valor, tipo, vencimentoform) {
fetch('http://localhost:3000/home/saida/add', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        bill_name: nome,
        bill_desc: descricao,
        bill_due_date: vencimentoform,
        bill_date: formattedDate,
        bill_value: valor,
        bill_type: tipo,
        
    })
}).then(response => {
    if (response.ok) {
        alert('Saída cadastrada com sucesso!');
        location.reload();
    } else {
        return response.json().then(errorData => {
            throw new Error(errorData.error);
        });
    }
}).catch(error => {
    alert('Erro ao cadastrar sáida: ' + error.message);
});

}
        const nome = document.getElementById('nome').value;
        const descricao = document.getElementById('desc').value;
        const data = new Date(document.getElementById('dataentry').value);
        const formattedDate = data.toISOString().split('T')[0]; // Formata para 'YYYY-MM-DD'
        const valor = parseFloat(document.getElementById('value').value);
        const tipo = document.getElementById('tipo').value;
        const vencimento = new Date(document.getElementById('vencimento').value);
        const vencimentoform = vencimento.toISOString().split('T')[0];
        inserirEntrada(nome, descricao, formattedDate, valor, tipo, vencimentoform);
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

fetch('http://localhost:3000/home/saida/list')
.then(response => response.json())
.then(data => {
    data.forEach(entry => {
        console.log(entry.bill_id);
        const contentEntry = document.createElement('div');
        contentEntry.className = 'content-entry';
        contentEntry.innerHTML = `
        <p id="entryinfo">
            <strong>Nome:</strong> ${entry.bill_name}<br>
            <strong>Descrição:</strong> ${entry.bill_desc}<br>
            <strong>Data:</strong> ${entry.bill_date}<br>
            <strong>Vencimento:</strong> ${entry.bill_due_date}<br>
            <strong>Valor:</strong> R$ ${entry.bill_value}<br>
            <strong>Categoria:</strong> ${entry.bill_type}
            <button id="btneditentry${entry.bill_id}" data-id="${entry.bill_id}">Editar</button>
            <button id="btndeleteentry${entry.bill_id}" data-id="${entry.bill_id}">Excluir</button>
        </p>
        `;
        content.appendChild(contentEntry);

        const editButtons = document.getElementById(`btneditentry${entry.bill_id}`);
    
        editButtons.addEventListener('click', async function() {
            const entryId = this.getAttribute('data-id');
            const modal2 = document.getElementById('editmodal');
            modal2.style.display = 'flex';
            const form2 = document.getElementById('form2');
            form2.addEventListener('submit', function(event) {
                event.preventDefault();
                const nome2 = document.getElementById('nome3').value;
                const descricao2 = document.getElementById('desc3').value;
                const data2 = new Date(document.getElementById('datasaida2').value);
                const formattedDate2 = data2.toISOString().split('T')[0];
                const valor2 = parseFloat(document.getElementById('value3').value);
                const tipo2 = document.getElementById('tipo3').value;
                const vencimento2 = new Date(document.getElementById('vencimento2').value);
                const vencimento2form = vencimento2.toISOString().split('T')[0];
                 atualizarEntrada(entryId, nome2, descricao2, formattedDate2, valor2, tipo2, vencimento2form);
                 console.log(nome2, descricao2, data2, formattedDate2, vencimento2form, tipo2, valor2);


})
        }        );
        const btns = document.getElementById(`btndeleteentry${entry.bill_id}`);
        btns.addEventListener('click', async function() {
        const entryId = this.getAttribute('data-id');
        try {
            const response = await fetch(`http://localhost:3000/home/saida/delete/${entryId}`, {
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

    
    });
        

function atualizarEntrada(entryId, nome2, descricao2, formattedDate2, valor2, tipo2, vencimento2form) {
    fetch(`http://localhost:3000/home/saida/updt/${entryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bill_name: nome2,
            bill_desc: descricao2,
            bill_date: formattedDate2,
            bill_value: valor2,
            bill_type: tipo2,
            bill_due_date: vencimento2form

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

const closeedit = document.getElementById('closemodal1');
const modal2 = document.getElementById('editmodal')
if(closeedit){
    closeedit.addEventListener('click', function (){
        modal2.style.display = 'none';
    })
}