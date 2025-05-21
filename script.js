// 🔧 Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAY-kp7wEdNiKW46406RSRZjWVkSVHJkmc",
    authDomain: "galeria-8d76a.firebaseapp.com",
    databaseURL: "https://galeria-8d76a-default-rtdb.firebaseio.com",
    projectId: "galeria-8d76a",
    storageBucket: "galeria-8d76a.firebasestorage.app",
    messagingSenderId: "471373911564",
    appId: "1:471373911564:web:60a4c32fbecde771588029",
    measurementId: "G-6BMRFRZN25"
};

// 🔥 Inicialização do Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Dados de fotos (simulados)
const photos = [
    { id: "foto1", url: "imagens/foto1.jpg", nome: "Foto 1 - Praia" },
    { id: "foto2", url: "imagens/foto2.jpg", nome: "Foto 1 - Praia" },
    { id: "foto3", url: "imagens/foto3.jpg", nome: "Foto 1 - Praia" },
    { id: "foto4", url: "imagens/foto4.jpg", nome: "Foto 1 - Praia" },
    { id: "foto5", url: "imagens/foto5.jpg", nome: "Foto 1 - Praia" },
    { id: "foto6", url: "imagens/foto6.jpg", nome: "Foto 1 - Praia" },
    { id: "foto7", url: "imagens/foto7.jpg", nome: "Foto 1 - Praia" },
    { id: "foto8", url: "imagens/foto8.jpg", nome: "Foto 1 - Praia" },
    { id: "foto9", url: "imagens/foto9.jpg", nome: "Foto 1 - Praia" },
    { id: "foto10", url: "imagens/foto10.jpg", nome: "Foto 1 - Praia" },
    { id: "foto11", url: "imagens/foto11.jpg", nome: "Foto 1 - Praia" },
    { id: "foto12", url: "imagens/foto12.jpg", nome: "Foto 1 - Praia" },
    { id: "foto13", url: "imagens/foto13.jpg", nome: "Foto 1 - Praia" },
    { id: "foto14", url: "imagens/foto14.jpg", nome: "Foto 1 - Praia" },
    { id: "foto15", url: "imagens/foto15.jpg", nome: "Foto 1 - Praia" },
    { id: "foto16", url: "imagens/foto16.jpg", nome: "Foto 1 - Praia" },
    { id: "foto17", url: "imagens/foto17.jpg", nome: "Foto 1 - Praia" },
    { id: "foto18", url: "imagens/foto18.jpg", nome: "Foto 1 - Praia" },
    { id: "foto19", url: "imagens/foto19.jpg", nome: "Foto 1 - Praia" },
    { id: "foto20", url: "imagens/foto20.jpg", nome: "Foto 1 - Praia" },
];

let userCPF = "";

// Renderiza galeria
function renderGallery() {
    const container = document.getElementById("gallery");
    container.innerHTML = "";

    photos.forEach(photo => {
        const div = document.createElement("div");
        div.className = "photo";
        div.innerHTML = `
      <img src="${photo.url}" alt="${photo.id}">
      <p class="photo-name">${photo.nome}</p>
      <button class="vote-btn" onclick="vote('${photo.id}')">Votar</button>
    `;
        container.appendChild(div);
    });
}

renderGallery();



let selectedPhotoId = null;

// Adiciona a máscara ao CPF
document.getElementById("cpfInput").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    e.target.value = value;
});

// Mostra o modal com CPF ao clicar em votar
function vote(photoId) {
    selectedPhotoId = photoId;
    document.getElementById("cpfInput").value = "";
    document.getElementById("cpfModal").style.display = "flex";
}

// Confirma o CPF e registra o voto
document.getElementById("confirmCpfBtn").addEventListener("click", function () {
    const cpf = document.getElementById("cpfInput").value.trim();
    const cpfLimpo = cpf.replace(/\D/g, '');

    if (cpfLimpo.length !== 11) {
        alert("CPF inválido.");
        return;
    }

    const voteRef = db.ref("votos/" + cpfLimpo);
    voteRef.once("value", snapshot => {
        if (snapshot.exists()) {
            alert("Você já votou!");
        } else {
            db.ref("votos/" + cpfLimpo).set(selectedPhotoId);
            alert("Voto registrado com sucesso!");
        }
        document.getElementById("cpfModal").style.display = "none";
    });
});

// Fecha o modal de CPF ao clicar fora da caixa
document.getElementById("cpfModal").addEventListener("click", function (e) {
    if (e.target === this) {
        this.style.display = "none";
    }
});

// Botão "X" para fechar o modal
document.querySelector(".cpf-close").addEventListener("click", function () {
    document.getElementById("cpfModal").style.display = "none";
});

// Função de zoom ao clicar na imagem
function enableImageZoom() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("zoomedImg");
    const closeBtn = document.querySelector(".close");

    document.querySelectorAll(".photo img").forEach(img => {
        img.addEventListener("click", () => {
            modal.style.display = "block";
            modalImg.src = img.src;
        });
    });

    closeBtn.onclick = () => {
        modal.style.display = "none";
    };

    modal.onclick = (e) => {
        if (e.target === modal) modal.style.display = "none";
    };
}

// Ative o zoom após renderizar as imagens
renderGallery();
enableImageZoom();
