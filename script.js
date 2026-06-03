// ==========================================
// BANCO DE DADOS LOCAL (LocalStorage)
// ==========================================
if (!localStorage.getItem('usuarios_muianga_tech')) {
    const usuariosIniciais = [
        { name: "Admin Muianga", email: "admin@muianga.tech", password: "123" }
    ];
    localStorage.setItem('usuarios_muianga_tech', JSON.stringify(usuariosIniciais));
}

// Elementos da Interface
const loginBox = document.getElementById('loginBox');
const registerBox = document.getElementById('registerBox');
const toRegister = document.getElementById('toRegister');
const toLogin = document.getElementById('toLogin');

const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const rememberMe = document.querySelector('.options input[type="checkbox"]');

const registerForm = document.getElementById('registerForm');
const regName = document.getElementById('regName');
const regEmail = document.getElementById('regEmail');
const regPassword = document.getElementById('regPassword');

// Verificar se o "Lembrar-me" estava ativo ao abrir a página
window.addEventListener('DOMContentLoaded', () => {
    const emailSalvo = localStorage.getItem('muianga_tech_remembered_email');
    if (emailSalvo) {
        loginEmail.value = emailSalvo;
        rememberMe.checked = true;
    }
});

// Alternar entre as Telas de Login e Cadastro
toRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginBox.classList.add('hidden');
    registerBox.classList.remove('hidden');
});

toLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
});

// Lógica de Cadastro de Usuário Verdadeiro
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = regName.value.trim();
    const email = regEmail.value.trim().toLowerCase();
    const senha = regPassword.value;

    // Deixei mais simples: aceita qualquer senha com 4 ou mais dígitos
    if (senha.length < 4) {
        alert("A senha precisa ter pelo menos 4 caracteres!");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios_muianga_tech'));
    const usuarioExiste = usuarios.find(user => user.email === email);
    
    if (usuarioExiste) {
        alert("Atenção: Este e-mail já está cadastrado no sistema!");
        return;
    }

    // Adiciona o novo usuário
    usuarios.push({ name: nome, email: email, password: senha });
    localStorage.setItem('usuarios_muianga_tech', JSON.stringify(usuarios));

    alert("Conta criada com sucesso! Faça o login agora.");
    registerForm.reset();
    
    // Volta para a tela de login automaticamente
    registerBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
});

// Lógica de Login com Redirecionamento para o Dashboard
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = loginEmail.value.trim().toLowerCase();
    const passwordInput = loginPassword.value;
    const usuarios = JSON.parse(localStorage.getItem('usuarios_muianga_tech'));

    // Procura o usuário no banco de dados
    const usuarioValido = usuarios.find(user => user.email === emailInput && user.password === passwordInput);

    if (usuarioValido) {
        // Salva ou remove o e-mail se o "Lembrar-me" estiver marcado
        if (rememberMe.checked) {
            localStorage.setItem('muianga_tech_remembered_email', emailInput);
        } else {
            localStorage.removeItem('muianga_tech_remembered_email');
        }

        // Guarda a sessão do usuário conectado
        sessionStorage.setItem('usuario_current_muianga', JSON.stringify(usuarioValido));

        alert(`Bem-vindo, ${usuarioValido.name}!`);
        
        // Manda direto para o painel de informática
        window.location.href = "https://muianga-tech.github.io/portal/teoria/index.html";
 else {
        alert("Erro: E-mail ou Senha incorretos! Tente novamente.");
    }
});

// Lógica de Recuperação de Senha
document.querySelector('.forgot-pass').addEventListener('click', (e) => {
    e.preventDefault();
    const emailInformado = prompt("Digite o seu e-mail cadastrado:");
    if (!emailInformado) return;

    const usuarios = JSON.parse(localStorage.getItem('usuarios_muianga_tech'));
    const usuarioEncontrado = usuarios.find(user => user.email === emailInformado.trim().toLowerCase());

    if (usuarioEncontrado) {
        alert(`Sua senha atual é: ${usuarioEncontrado.password}`);
    } else {
        alert("E-mail não encontrado no sistema!");
    }
});
