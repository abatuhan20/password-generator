const  resultEl= document.getElementById("result");
const  copyEl= document.getElementById("copy");
const  lenEl= document.getElementById("len");
const  upperEl= document.getElementById("upper");
const  lowerEl= document.getElementById("lower");
const  numberEl= document.getElementById("number");
const  symbolEl= document.getElementById("symbol");
const  generateEl= document.getElementById("generate");

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerLetters = upperLetters.toLowerCase();
const numbers = '0123456789';
const symbols = "!@#$%^&*()_+=";
const generatedPass = JSON.parse(localStorage.getItem('passwords')) || [];



function getLowerCase() {
    return lowerLetters[Math.floor(Math.random()* lowerLetters.length)];
}

function getUpperCase() {
    return upperLetters[Math.floor(Math.random()* upperLetters.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random()* numbers.length)];
}

function getSymbol() {
    return symbols[Math.floor(Math.random()* symbols.length)];
}


function generatePassword () {
    const len = lenEl.value;
    let password = "";

    for(let i = 0; i<len; i++) {
        const x = generateX();
        password += x;
    }



    resultEl.innerText = password;
    updateLS(resultEl.innerText);
}


function generateX() {
    const xs = [];
    if(upperEl.checked) {
        xs.push(getUpperCase());
    }
    if(lowerEl.checked) {
        xs.push(getLowerCase());
    }
    if(numberEl.checked) {
        xs.push(getNumber());
    }
    if(symbolEl.checked) {
        xs.push(getSymbol());
    }
    
    return xs[Math.floor(Math.random()* xs.length)];
}

generateEl.addEventListener('click', (e) => {
    e.preventDefault();
    if (upperEl.checked || lowerEl.checked || numberEl.checked || symbolEl.checked) {
        generatePassword();
        if (!null) {
            updateLS();
        }
        
    } else {
        alert("You need to choose options!");
    }
    
});

copyEl.addEventListener('click', async () => {
    const copyText = resultEl.innerText;
    console.log(copyText);
    try {
        await navigator.clipboard.writeText(copyText);
        console.log('Content copied to clipboard');
        /* Resolved - text copied to clipboard successfully */
      } catch (err) {
        console.error('Failed to copy: ', err);
        /* Rejected - text failed to copy to the clipboard */
      }
  });
// Örnek copy to clipboard CLIPBOARD API den faydalandım.

function updateLS(password) {
    if(password !=null) {
    generatedPass.push(password);
    localStorage.setItem('passwords', JSON.stringify(generatedPass));
}
    
}
//Yukarıda constant array tanımladım local storage a ekliyorum bu şekilde

function showPass() {
    const passwordsContainer = document.getElementById('passwords-container');
    passwordsContainer.innerHTML = '';
    generatedPass.forEach((password, index) => {
        if(password == null) {
            console.log("there is null element");
            // buradaki if satırı null elementlerin local storageye gitmesini engelledi
        }else {
        const passwordElement = document.createElement('div');
        passwordElement.textContent = `Password ${index + 1}: ${password}`;
        passwordsContainer.appendChild(passwordElement);
    }
    });
    
}
// Örnek Local storagedan data gösterimi

const showBtn = document.getElementById("btn2");

showBtn.addEventListener('click', () => {
    showPass();
});



upperEl.addEventListener('click', () => {});
lowerEl.addEventListener('click', () => {});
numberEl.addEventListener('click',() => {} );
symbolEl.addEventListener('click',() => {} );
