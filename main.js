document.getElementById("calculate").addEventListener("click", function () {
  const name = document.getElementById("name").value;
  const grades = document.querySelectorAll("#grades .grade");
  const resultDiv = document.getElementById("result");
  let verifyInputs = false;

  function calculateMedia(grades) {
    let sumGrades = 0;
    let gradePositioned = 0;
    resultDiv.innerHTML = "";
    const nameClassmate = document.querySelector("#grades .name");
    nameClassmate.style.background = '';
    if (nameClassmate.value === "") {
      resultDiv.innerHTML += `<p style="color: red;">Campo nome sem preenchimento</p>`;
      nameClassmate.style.background = "red";
      verifyInputs = true;
      gradePositioned += 1;
    }
    
    grades.forEach((grade) => {
      const gradeValue = parseFloat(grade.value);
      if (isNaN(gradeValue)) {
        resultDiv.innerHTML += `<p style="color: red;">Campo Nota ${gradePositioned} com valor inválido. Digite apenas números.</p>`;
        grade.style.background = "red";
        verifyInputs = true;
        gradePositioned += 1;
        return;
      } else if (gradeValue < 0 || gradeValue > 10) {
        resultDiv.innerHTML += `<p style="color: red;">Campo Nota ${gradePositioned} com valor inválido. As notas devem estar entre 0 e 10.</p>`;
        grade.style.background = "red";
        verifyInputs = true;
        gradePositioned += 1;
        return;
      } else if (grade.value === "") {
        resultDiv.innerHTML += `<p style="color: red;">Campo Nota ${gradePositioned} com valor inválido. O campo deve estar preenchido.</p>`;
        grade.style.background = "red";
        verifyInputs = true;
        gradePositioned += 1;
        return;
      }

      grade.style.background = "";
      sumGrades += gradeValue;
      gradePositioned += 1;
    });
    return sumGrades / grades.length;
  }

  const media = calculateMedia(grades);

  if (verifyInputs) {
    return;
  }

  grades.forEach((grade) => {
    grade.style.background = "";
  });

  const determineStatus = (media) => {
    if (media >= 7) return "Aprovado";
    if (media >= 5) return "Recuperação";
    return "Reprovado";
  };

  const status = determineStatus(media);

  resultDiv.innerHTML = `
      <p><strong>Aluno:</strong> ${name}</p>
      <p><strong>Média:</strong> ${media.toFixed(2)}</p>
      <p><strong>Status:</strong> ${status}</p>
    `;
});

document.getElementById("addGrade").addEventListener("click", function () {
  let updatedHtml = "";
  const existingInputs = document.querySelectorAll("#grades .grade");
  const name = document.querySelector("#grades .name");
  const div = document.getElementById("grades");
  let numberGrades = 1;
  updatedHtml = ` 
  <label for="name">Nome do Aluno:</label>
  <input type="text" id="name" class="name" placeholder="Digite o nome" required value="${name.value}">`;

  existingInputs.forEach((input) => {
    const inputValue = input.value;
    updatedHtml += `
      <div class="input-container">
        <label for="grade${numberGrades}">Nota ${numberGrades}:</label>
        <input type="number" id="grade${numberGrades}" class="grade" placeholder="Digite a ${numberGrades}ª nota" min="0" max="10" required value="${inputValue}">
        <button type="button" class="remove-btn" onclick="removeInput(this)">×</button>
      </div>
    `;
    numberGrades += 1;
  });

  updatedHtml += `
    <div class="input-container">
        <label for="grade${numberGrades}">Nota ${numberGrades}:</label>
        <input type="number" id="grade${numberGrades}" class="grade" placeholder="Digite a ${numberGrades}ª nota" min="0" max="10" required">
        <button type="button" class="remove-btn" onclick="removeInput(this)">×</button>
      </div>`;

  div.innerHTML = updatedHtml;
});

function removeInput(button) {
  let gradePositioned = 1;
  const divInput = button.parentElement;
  divInput.remove();
  const labels = document.querySelectorAll(".input-container label");

  labels.forEach((label) => {
    label.setAttribute("for", `grade${gradePositioned}`);
    label.textContent = `Nota ${gradePositioned}`;
    gradePositioned += 1;
  });
}
const removeButtons = document.getElementsByClassName("remove-btn");

removeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    removeInput(this);
  });
});
