const formCadastro = document.getElementById('formCadastro');

const emailCadastro = document.getElementById('email');
const confirmarEmail = document.getElementById('confirmarEmail');

const senhaCadastro = document.getElementById('senha');
const confirmarSenha = document.getElementById('confirmarSenha');

const erroEmail = document.getElementById('erroEmail');
const erroSenha = document.getElementById('erroSenha');

const mensagemCadastro = document.getElementById('mensagemCadastro');
const loading = document.getElementById('loading');


confirmarEmail.addEventListener('input', function () {

    if (confirmarEmail.value !== emailCadastro.value) {

        erroEmail.textContent = 'O e-mail está diferente do campo anterior.';

    } else {

        erroEmail.textContent = '';

    }

});


confirmarSenha.addEventListener('input', function () {

    if (confirmarSenha.value !== senhaCadastro.value) {

        erroSenha.textContent = 'A senha está diferente do campo anterior.';

    } else {

        erroSenha.textContent = '';

    }

});


formCadastro.addEventListener('submit', async function (event) {

    event.preventDefault();

    erroEmail.textContent = '';
    erroSenha.textContent = '';
    mensagemCadastro.textContent = '';


    if (emailCadastro.value !== confirmarEmail.value) {

        erroEmail.textContent = 'O e-mail está diferente do campo anterior.';

        confirmarEmail.focus();

        return;

    }


    if (senhaCadastro.value !== confirmarSenha.value) {

        erroSenha.textContent = 'A senha está diferente do campo anterior.';

        confirmarSenha.focus();

        return;

    }


    loading.style.display = 'flex';


    try {

        const nome = document.getElementById('nome').value;

        const resposta = await fetch('/cadastro', {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json'

            },

            body: JSON.stringify({

                nome: nome,

                email: emailCadastro.value,

                senha: senhaCadastro.value

            })

        });


        const dados = await resposta.json();


        loading.style.display = 'none';


        if (resposta.ok) {

            mensagemCadastro.textContent = 'Usuário cadastrado com sucesso!';

            formCadastro.reset();

        } else {

            mensagemCadastro.textContent = dados.mensagem || 'Não foi possível realizar o cadastro.';

        }


    } catch (erro) {

        loading.style.display = 'none';

        mensagemCadastro.textContent = 'Não foi possível conectar ao sistema.';

    }

});
