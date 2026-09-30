const formLogin = document.getElementById("formLogin");
const mensagem = document.getElementById("mensagem");

formLogin.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    mensagem.textContent = "Verificando dados...";

    try {

        const resposta = await fetch("/login", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });

        const dados = await resposta.json();

        if (resposta.ok) {

            window.location.href = "index.html";

        } else {

            mensagem.textContent = dados.mensagem;

        }

    } catch (erro) {

        mensagem.textContent = "Não foi possível conectar ao sistema.";

    }

});

