function parser(string){
  const arrayFormaProposicional = [
    "a terra é de queijo", 
    " a lua é uma batata", 
    "azul é cor",
    "Unesp é top",
    "Unesp > Usp > Unicamp",
    "Xusp",
    "Praça da paz > São Paulo",
    "Minecraft",
    "Python <> JS",
    "Corona virus é uma mentira"
  ]
  
  let indexArraySelected = []

  let arrString = string.split("")
  
  let resultados = []
  
  let ehEntao = false
  let ehSeSomenteSe = false
  
  let ehVariavel = true
  
  for (let index = 0; index < arrString.length; index++) {
    let result = ""
    let caracter = arrString[index].toUpperCase()
    
    if(ehVariavel){
      let indexVetor
      indexVetor = Math.floor(Math.random() * arrayFormaProposicional.length)
      /*
      do{
        console.log(indexVetor)
        if(indexArraySelected.length === arrayFormaProposicional.length)
          break;
      }while(indexArraySelected.includes(indexVetor))
      */

      indexArraySelected.push(indexVetor)
      
      if(caracter >= 'A' && caracter <= 'Z'){
        result += " " + arrayFormaProposicional[indexVetor]
        ehVariavel = false
      }
    }else{
      let resultadoConectivo = ""
    
      switch(caracter){
        case "^" :
          resultadoConectivo += " e " 
          break;
        
        case "V": 
          resultadoConectivo += " ou " 
          break;

        case ">":
          if(ehEntao){
            resultadoConectivo += " implica "
            ehEntao = false
          }else{
            resultadoConectivo += " se somente se "
            ehSeSomenteSe = false
          }
          break;
    
        case "-":
          ehEntao = ehSeSomenteSe? false:true;
          break;
    
        case "!":
          resultadoConectivo += " não "
          break;
    
        case "<":
          ehSeSomenteSe = true;
          break;
      }

      if(resultadoConectivo != ""){
        result += resultadoConectivo
        ehVariavel = true;
      }
    }
    let span = document.createElement('span')
    span.textContent = result
    span.classList.add(!ehVariavel?"variavel":"conectivo")
    resultados.push(span)
  } 


  setResultSpan(resultados)
}


function formaProposicional() {
  let value = document.getElementById('input-forma-proposicional').value
  
  parser(value)
}


function setResultSpan(result){
  let resultDiv = document.getElementById('result-div')
  
  
  result.forEach(element => {
    resultDiv.append(element)
  });
}

function setResult(result){
  let resultLabel = document.getElementById('result-forma')
  resultLabel.textContent = result
}
