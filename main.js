let numberGrades = 2;
document.getElementById("calculate").addEventListener("click", function() {
    const name = document.getElementById("name").value;
    const grades = document.querySelectorAll('#grades .grade');
    const resultDiv = document.getElementById("result");
    let verifyInputs = false;

    function calculateMedia(grades){
      let sumGrades = 0;
      grades.forEach(grade => {
        const gradeValue = parseFloat(grade.value);
        if(isNaN(gradeValue) || gradeValue < 0 || gradeValue > 10 || gradeValue === ''){
          resultDiv.innerHTML = `<p style="color: red;">Preencha todos os campos corretamente.</p>`;
          verifyInputs = true;
          return;
        }
        sumGrades += gradeValue;
      });
      return sumGrades / grades.length;
    }

    const media = calculateMedia(grades);

    if (verifyInputs){
      return;
    }
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



  document.getElementById('addGrade').addEventListener('click', function() {
    const div = document.getElementById('grades');
    numberGrades += 1;

    const htmlForm = `
    <label for="grade${numberGrades}">Nota ${numberGrades}:</label>
    <input type="number" id="grade${numberGrades}" class="grade"placeholder="Digite a ${numberGrades}ª nota" min="0" max="10" required>`;

    div.innerHTML += htmlForm;
  })
  