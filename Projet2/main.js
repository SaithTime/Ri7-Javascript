//Init readline to register user inputs
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let badResponses = []; //Registered bad responses
let goodResponses = 0; //Good Responses
const questions = [ //Questions
    {
        question: "Trouve l'intru",
        possibilities: ["JavaScript", "TypeScript", "HTML", "AssemblyScript"],
        resp: 2,
        why: "HTML n'est pas un language de programation !"
    },
    {
        question: "En informatique combien font 0.1 + 0.2 ?",
        possibilities: ["0.3", "0.30000000000000004", "3", "0.333333333333333"],
        resp: 1,
        why: "Flemme d'expliquer cherche sur google"
    },
    {
        question: "Quel est le résultat de l'expression 3 + 2 + '7' ?",
        possibilities: ["12", "57", "32", "Autre"],
        resp: 3,
        why: "'7' n'est pas un nombre !"
    },
    {
        question: "Quel est le résultat de l'expression 1 == '1' ?",
        possibilities: ["true", "false", "undefined", "NaN"],
        resp: 0,
        why: "'==' ne vérifie pas le type"
    },
    {
        question: "Quelle est la fonction préférer de thomas ?",
        possibilities: ["alert()", "alert()", "alert()", "alert()"],
        resp: -1,
        why: "Les gouts, les couleurs..."
    }
]

//Start game
async function start() {
    console.clear();
    for (let i = 0; i < questions.length; i++) {

        console.log("\nPère fourras:");
        console.log("\x1b[34m" + questions[i].question + "\x1b[0m\n\n"); //Print the question

        let possibilities = questions[i].possibilities;
        for (let j = 0; j < possibilities.length; j++) {
            console.log("\x1b[32m" + (j + 1) + "\x1b[0m - " + possibilities[j]); //Print possibilities
        }

        let rep = await ask(); //Wait response and check result
        if ((rep - 1 === questions[i].resp) || i === questions.length - 1) {
            console.log("\n\x1b[32mBonne réponse !\x1b[0m\n");
            goodResponses++;
        } else {
            console.log("\n\x1b[31mMauvaise réponse !\x1b[0m\n");
            badResponses.push(questions[i]);
        }

    }
    result(); // Print final result
}

function ask() {
    return new Promise((resolve) => {
        rl.question("\n > ", (resp) => {
            let num = Number(resp);
            if (!isNaN(num) && num > 0 && num < 5) {
                resolve(num);
            } else {
                console.log("\n\x1b[31mRéponse invalide\x1b[0m\n");
                resolve(ask());
            }
        });
    });
}

function result() {
    console.clear();
    console.log("\n\n\nNote: " + goodResponses + "/" + questions.length);
    for (q of badResponses) { // Show result of questions with bad responses
        console.log("Question: \"" + q.question + "\"");
        console.log("La bonne réponse etais: " + q.possibilities[q.resp]);
        console.log("Car: " + q.why);
    }
    rl.close();
}
start();