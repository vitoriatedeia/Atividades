// Exibe no console que o JavaScript está conectado
console.log("JS CONECTADO!");

// Captura elementos do formulário pelo ID
const formulario = document.getElementById("cadastroForm");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");
const celular = document.getElementById("celular");
const cpf = document.getElementById("cpf");
const rg = document.getElementById("rg");
const msgError = document.getElementsByClassName("msgError");

// Função para exibir mensagens de erro no formulário
const createDisplayMsgError = (mensagem) => {
  msgError[0].textContent = mensagem;
};

// Função para validar o nome (apenas letras e espaços permitidos)
const checkNome = () => {
  const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
  return nomeRegex.test(nome.value);
};

// Função para validar o e-mail (apenas domínios específicos permitidos)
const checkEmail = (email) => {
  const partesEmail = email.split("@");
  return (
    partesEmail.length === 2 &&
    ["gmail.com", "outlook.com", "hotmail.com"].includes(
      partesEmail[1].toLowerCase()
    )
  );
};

// Função para verificar se as senhas coincidem
function checkPasswordMatch() {
  return senha.value === confirmarSenha.value;
}

// Função para formatar número de telefone com máscara
function maskPhoneNumber(event) {
  let celular = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (celular.length > 11) {
    celular = celular.substring(0, 11);
  }

  if (celular.length > 2) {
    celular = `(${celular.substring(0, 2)}) ${celular.substring(2)}`;
  }

  if (celular.length > 10) {
    celular = celular.replace(/(\(\d{2}\)) (\d{5})(\d{1,4})/, "$1 $2-$3");
  }

  event.target.value = celular;
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
  return null;
}

// Função para validar e enviar os dados do formulário
function fetchDatas(event) {
  event.preventDefault();

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

  const formData = {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
    celular: celular.value,
    cpf: cpf.value,
    rg: rg.value,
  };

  console.log("Formulário Enviado: ", JSON.stringify(formData, null, 2));
}

// Função para criar efeito de "chuva" na interface
const rainFunction = () => {
  let rain = document.createElement("span");
  let cont_rain = document.querySelector(".container_rain");
  let left = Math.floor(Math.random() * (310 - 65) + 65);
  let duration = Math.random() * 5;

  rain.classList.add("rain");
  cont_rain.appendChild(rain);
  rain.style.left = left + "px";
  rain.style.animationDuration = 1 + duration;

  setTimeout(() => {
    cont_rain.removeChild(rain);
  }, 1500);
};

setInterval(() => {
  rainFunction();
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

formulario.addEventListener("submit", fetchDatas);

// Máscara para CPF
function maskCPF(event) {
  let cpf = event.target.value.replace(/\D/g, "");
  if (cpf.length > 11) cpf = cpf.substring(0, 11);
  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  event.target.value = cpf;
}

// Máscara para RG
function maskRG(event) {
  let rg = event.target.value.replace(/\D/g, "");
  if (rg.length > 9) rg = rg.substring(0, 9);
  rg = rg.replace(/(\d{2})(\d{3})(\d{3})([\dX])/, "$1.$2.$3-$4");
  event.target.value = rg;
}

// Adiciona eventos de input para mascarar os campos correspondentes
celular.addEventListener("input", maskPhoneNumber);
cpf.addEventListener("input", maskCPF);
rg.addEventListener("input", maskRG);
