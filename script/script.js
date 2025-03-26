// Exibe no console que o JavaScript está conectado
console.log("JS CONECTADO!");

// Captura elementos do formulário pelo ID
const formulario = document.getElementById("cadastroForm"); // Obtém o formulário pelo ID
const nome = document.getElementById("nome"); // Obtém o campo de nome
const email = document.getElementById("email"); // Obtém o campo de e-mail
const senha = document.getElementById("senha"); // Obtém o campo de senha
const confirmarSenha = document.getElementById("confirmarSenha"); // Obtém o campo de confirmação de senha
const celular = document.getElementById("celular"); // Obtém o campo de celular
const cpf = document.getElementById("cpf"); // Obtém o campo de CPF
const rg = document.getElementById("rg"); // Obtém o campo de RG
const msgError = document.getElementsByClassName("msgError"); // Obtém os elementos com a classe "msgError" (para exibir mensagens de erro)

// Função para exibir mensagens de erro no formulário
const createDisplayMsgError = (mensagem) => {
  msgError[0].textContent = mensagem; // Define o texto da primeira mensagem de erro encontrada
};

// Função para validar o nome (apenas letras e espaços permitidos)
const checkNome = () => {
  const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/; // Expressão regular que permite apenas letras e espaços
  return nomeRegex.test(nome.value); // Retorna true se o nome for válido, senão false
};

// Função para validar o e-mail (apenas domínios específicos permitidos)
const checkEmail = (email) => {
  const partesEmail = email.split("@"); // Divide o e-mail em duas partes: antes e depois do "@"
  return (
    partesEmail.length === 2 && // Verifica se há exatamente duas partes
    ["gmail.com", "outlook.com", "hotmail.com"].includes(
      partesEmail[1].toLowerCase()
    ) // Verifica se o domínio é permitido
  );
};

// Função para verificar se as senhas coincidem
function checkPasswordMatch() {
  return senha.value === confirmarSenha.value; // Retorna true se as senhas forem iguais, senão false
}

// Função para formatar número de telefone com máscara
function maskPhoneNumber(event) {
  let celular = event.target.value.replace(/\D/g, ""); // Remove todos os caracteres que não são números

  if (celular.length > 11) {
    celular = celular.substring(0, 11); // Limita o número a 11 caracteres
  }

  if (celular.length > 2) {
    celular = `(${celular.substring(0, 2)}) ${celular.substring(2)}`; // Adiciona o DDD entre parênteses
  }

  if (celular.length > 10) {
    celular = celular.replace(/(\(\d{2}\)) (\d{5})(\d{1,4})/, "$1 $2-$3"); // Formata corretamente o número com traço
  }

  event.target.value = celular; // Atualiza o valor do campo com a formatação
}

// Função para verificar a força da senha
function checkPasswordStrength(senha) {
  if (!/[a-z]/.test(senha))
    return "A senha deve ter pelo menos uma letra minúscula!";
  if (!/[A-Z]/.test(senha))
    return "A senha deve ter pelo menos uma letra maiúscula!";
  if (!/\W/.test(senha))
    return "A senha deve ter pelo menos um caractere especial!";
  if (!/\d/.test(senha)) return "A senha deve ter pelo menos um número!";
  if (senha.length < 8) return "A senha deve ter pelo menos 8 caracteres!";
  return null; // Retorna null se a senha atender a todos os critérios
}

// Função para validar e enviar os dados do formulário
function fetchDatas(event) {
  event.preventDefault(); // Impede o envio do formulário

  if (!checkNome()) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
    return;
  }

  if (!checkEmail(email.value)) {
    createDisplayMsgError("O e-mail digitado não é válido!");
    return;
  }

  if (!checkPasswordMatch()) {
    createDisplayMsgError("As senhas digitadas não coincidem!");
    return;
  }

  const senhaError = checkPasswordStrength(senha.value);
  if (senhaError) {
    createDisplayMsgError(senhaError);
    return;
  }

  // Cria um objeto com os dados do formulário
  const formData = {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
    celular: celular.value,
    cpf: cpf.value,
    rg: rg.value,
  };

  console.log("Formulário Enviado: ", JSON.stringify(formData, null, 2)); // Exibe os dados no console
}

// Função para criar efeito de "chuva" na interface
const rainFunction = () => {
  let rain = document.createElement("span"); // Cria um novo elemento <span> para representar a gota
  let cont_rain = document.querySelector(".container_rain"); // Seleciona o contêiner da chuva
  let left = Math.floor(Math.random() * (310 - 65) + 65); // Define uma posição aleatória para a gota
  let duration = Math.random() * 5; // Define uma duração aleatória para a animação

  rain.classList.add("rain"); // Adiciona a classe "rain" ao elemento
  cont_rain.appendChild(rain); // Adiciona a gota ao contêiner
  rain.style.left = left + "px"; // Posiciona a gota horizontalmente
  rain.style.animationDuration = 1 + duration; // Define a duração da animação

  setTimeout(() => {
    cont_rain.removeChild(rain); // Remove a gota após 1,5 segundos
  }, 1500);
};

setInterval(() => {
  rainFunction(); // Cria novas gotas a cada 250ms
}, 250);

// Eventos para validar entradas em tempo real
nome.addEventListener("input", () => {
  createDisplayMsgError(
    checkNome() ? "" : "O nome não pode conter números ou caracteres especiais!"
  );
});

email.addEventListener("input", () => {
  createDisplayMsgError(
    checkEmail(email.value) ? "" : "O e-mail digitado não é válido!"
  );
});

senha.addEventListener("input", () => {
  createDisplayMsgError(checkPasswordStrength(senha.value) || "");
});

formulario.addEventListener("submit", fetchDatas); // Adiciona evento de submit ao formulário

// Máscara para CPF
function maskCPF(event) {
  let cpf = event.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  if (cpf.length > 11) cpf = cpf.substring(0, 11); // Limita o CPF a 11 dígitos
  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); // Aplica a formatação
  event.target.value = cpf; // Atualiza o valor do campo
}

// Máscara para RG
function maskRG(event) {
  let rg = event.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  if (rg.length > 9) rg = rg.substring(0, 9); // Limita o RG a 9 dígitos
  rg = rg.replace(/(\d{2})(\d{3})(\d{3})([\dX])/, "$1.$2.$3-$4"); // Aplica a formatação
  event.target.value = rg; // Atualiza o valor do campo
}

// Adiciona eventos de input para mascarar os campos correspondentes
celular.addEventListener("input", maskPhoneNumber);
cpf.addEventListener("input", maskCPF);
rg.addEventListener("input", maskRG);
