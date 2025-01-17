document.getElementById("calculate").addEventListener("click", function() {
    const name = document.getElementById("name").value;
    const grade1 = parseFloat(document.getElementById("grade1").value);
    const grade2 = parseFloat(document.getElementById("grade2").value);
    const grade3 = parseFloat(document.getElementById("grade3").value);
  
    const resultDiv = document.getElementById("result");
  
    
    if (!name || isNaN(grade1) || isNaN(grade2) || isNaN(grade3)) {
      resultDiv.innerHTML = `<p style="color: red;">Preencha todos os campos corretamente.</p>`;
      return;
    }
  
    
    function calculateMedia (n1,n2,n3){
        const media = (n1 +n2 + n3) / 3;
        return media;
    }
    // const calculateMedia = (n1, n2, n3) => (n1 + n2 + n3) / 3;
  
    const media = calculateMedia(grade1, grade2, grade3);
  
    
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
  