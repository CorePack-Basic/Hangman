//Letters 

const letters = "abcdefghijklmnopqrstuvwxyz";


//Get Array From Letters


let lettersArrays = Array.from(letters)

// Select LetterDiv

const letterDiv = document.querySelector(".letters")

lettersArrays.forEach((letter) => {


    let spanLetter = document.createElement("span")

    let spanTextNode = document.createTextNode(letter)

    //Append Child Span to letter

    spanLetter.appendChild(spanTextNode)

    spanLetter.classList.add("span-letter")

    //Append Child Span to letters Div

    letterDiv.appendChild(spanLetter)


})




// Object Of Keys


let words = {
    programming : ["php" , "javascript" , "go" , "scale",  "fortran" , "r" , "mysql" , "python"],
    movies : ["Prestige" , "Inception" , "Parasite" , "Whiplash" , "Interstellar" , "Memento" , "Coco", "Up"],
    people : ["Albert Einstein" , "Hitchcock" , "Alexander" , "Ayman" , "Cleopatra" , "Mahatma Ghandi"],
    countries : ["Syria" , "Palestine" , "Yemen" , "Egypt", "Bahrain" , "Qatar" , "KSA"]
} 


//Keys
let objectOfKeys = Object.keys(words);

let randomValueOfKey = Math.floor(Math.random() * objectOfKeys.length);

let keyOfRandomValue = objectOfKeys[randomValueOfKey];



// Values

let randomValueOfValue = Math.floor(Math.random() * words[keyOfRandomValue].length)

let randomWordOfValue = words[keyOfRandomValue][randomValueOfValue]

//Append Type Of Word in span

document.querySelector(".game-type span").innerHTML = keyOfRandomValue;


//Create Spans referance to word

let letter_guess = document.querySelector(".letter-guess")

//Convert Word to Array


let CovertWord = Array.from(randomWordOfValue)


//Loop on coverter to make spans

CovertWord.forEach((letter) => {
    let spanWord = document.createElement("span")

    if(letter === " ") {
        spanWord.classList.add("with-space")
    }

    letter_guess.appendChild(spanWord)

})


    let upostrof = "";
    // Select Spans in letter guess

     let spanLetterGuess = document.querySelectorAll(".letter-guess span")

    //Set Status 

    // Attempt Wrongs
    let wrongChose = 0;
    // Select the draw 
    let theDrawHang = document.querySelector(".draw-hang")

    // Attempt Success

    let succesChose = 0;

    // Select Score 

    let scorePoint = document.querySelector(".score span");
   

    // Set score point to localStorge
    scorePoint.innerHTML = window.localStorage.getItem("score");

    // AddEventListener
    document.addEventListener("click" , (e) => {
    let theStatus = false;
    if(e.target.className == "span-letter") {

        e.target.classList.add("clicked")

        // Get Clicked Letter 

        let clickedLetter = e.target.innerHTML.toLowerCase()

        //Chosen Word

        let ChosenWord = Array.from(randomWordOfValue.toLowerCase())

        ChosenWord.forEach((word , index) => {

            if(clickedLetter == word) {
           
                //Set Status to correct
                theStatus = true;

                spanLetterGuess.forEach((spanWord , indexSpan) => {


                    if(index == indexSpan) {
    
                        spanWord.innerHTML = clickedLetter
    
                    }

                    
    
                })
            }

        })

        if(theStatus !== true) {

            wrongChose++ 


            theDrawHang.classList.add(`wrong-${wrongChose}`)


            document.getElementById("fail").play()


            if(wrongChose == 11) {


                endGame()

                document.querySelector(".letters").classList.add("stop")

            }

        }else {
            succesChose++
            document.getElementById("success").play()

        }


    }

    let  allSpansFilled = true;
    spanLetterGuess.forEach(function(span) {
        if (!span.textContent.trim()) {
            allSpansFilled = false;
        }
    });

    console.log(spanLetterGuess)
    if (allSpansFilled) {
        if(!document.querySelector(".button-85")) {
            document.querySelector(".letters").classList.add('stop');

            let submitButton = document.createElement("button")
            let textNodeSubmit = document.createTextNode("Submit")
    
            submitButton.className = "button-85"
    
            submitButton.appendChild(textNodeSubmit)
    
            document.body.appendChild(submitButton);
            
           
            
            let stateScore = parseInt(window.localStorage.getItem("score")) || 0; // استرجاع قيمة النقاط من Local Storage إذا كانت موجودة، وإلا استخدام القيمة الافتراضية 0
            submitButton.addEventListener("click", function (e) {
                allSpansFilled = false;
                stateScore += 10;
                window.localStorage.setItem("score", stateScore);
                location.reload();
                submitButton.remove(); 
            }, { once: true });
            
        
    }}

})


function endGame() {

    // Create main div
    let div = document.createElement("div")
    let textNodeOfDiv = document.createTextNode(`Game Over : the word is `)

    div.classList.add("finished")

    // Create Span and append to div
    let spanDiv = document.createElement("span")
    let textNodeOfSpanDiv = document.createTextNode(`${randomWordOfValue}`)
    spanDiv.appendChild(textNodeOfSpanDiv)

    div.appendChild(textNodeOfDiv)

    div.appendChild(spanDiv)

    // Append div to body


    document.body.appendChild(div)

}