document.getElementById("nome").addEventListener("input", function (event) {
  let inputValue = event.target.value;

  // Se o último caractere for um espaço, transforme a primeira letra de cada palavra em maiúscula
  event.target.value = inputValue.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
});

document
  .getElementById("doutorResponsavel")
  .addEventListener("input", function (event) {
    let inputValue = event.target.value;

    // Se o último caractere for um espaço, transforme a primeira letra de cada palavra em maiúscula
    event.target.value = inputValue.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  });

document.getElementById("telefone").addEventListener("input", function (event) {
  let inputValue = event.target.value;

  // Remove qualquer caractere que não seja número
  inputValue = inputValue.replace(/\D/g, "");

  // Limita o número de caracteres ao máximo necessário
  if (inputValue.length > 11) {
    inputValue = inputValue.substring(0, 11);
  }

  // Aplica a formatação de acordo com o tamanho do número
  if (inputValue.length > 6) {
    inputValue = `(${inputValue.substring(0, 2)}) ${inputValue.substring(
      2,
      7
    )}-${inputValue.substring(7, 11)}`;
  } else if (inputValue.length > 2) {
    inputValue = `(${inputValue.substring(0, 2)}) ${inputValue.substring(
      2,
      7
    )}`;
  } else if (inputValue.length > 0) {
    inputValue = `(${inputValue}`;
  }

  // Define o valor formatado no campo de input
  event.target.value = inputValue;
});

let hospitais = []; // Variável para armazenar os dados do JSON

// Carrega o JSON de um arquivo externo
fetch("./hospitais.json")
  .then((response) => response.json())
  .then((data) => {
    hospitais = data.hospitais;
  })
  .catch((error) => console.error("Erro ao carregar o JSON:", error));

// Função de autocompletar
document.getElementById("hospital").addEventListener("input", function () {
  const input = this.value.toLowerCase();
  const suggestions = hospitais.filter((hospital) =>
    hospital.nome.toLowerCase().includes(input)
  );

  // Limpa as sugestões anteriores
  const hospitalList = document.getElementById("hospitalList");
  hospitalList.innerHTML = "";

  // Exibe novas sugestões
  suggestions.forEach((hospital) => {
    const suggestionItem = document.createElement("a");
    suggestionItem.classList.add("list-group-item", "list-group-item-action");
    suggestionItem.textContent = hospital.nome;
    suggestionItem.href = "#";

    // Preenche o input e endereço ao clicar na sugestão
    suggestionItem.addEventListener("click", function (e) {
      e.preventDefault();
      document.getElementById("hospital").value = hospital.nome;
      document.getElementById("endereco").value = hospital.endereco;
      hospitalList.innerHTML = ""; // Limpa a lista de sugestões após a seleção
    });

    hospitalList.appendChild(suggestionItem);
  });

  // Se não houver entrada, limpe a lista de sugestões
  if (input === "") {
    hospitalList.innerHTML = "";
  }
});
