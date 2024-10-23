//Init readline to register user inputs
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to send a question to user
function ask(message, possibilities, callback) {
    rl.question(message, (resp) => { //Create question with message
        for (r of possibilities) {
            if (resp === r) { // Check if question is good
                callback(resp); // Call reponse
                return;
            }
        }
        console.clear();
        console.log("\n\x1b[31mRéponse invalide\x1b[0m\n")
        ask(message, possibilities, callback); // Question not good, resend question
    })
}

//Send text introduction to user.
function start() {
    console.clear(); //Clear console
    console.log("\n\n\nMorpheus:");
    console.log("\"Pillule \x1b[34mbleu\x1b[0m ou pillule \x1b[31mrouge\x1b[0m ?\"\n");
    ask("Tape:\n\x1b[36m 1 \x1b[0m Pour la bleu\n\x1b[36m 2 \x1b[0m Pour la rouge\n\n > ", ["1", "2"], (resp) => { //Send question
        switch (resp) {
            case "1": {
                console.log("Tu as choisi la pillule bleu");
                blue();
                break;
            }
            case "2": {
                console.log("Tu as choisi la pillule rouge");
                red();
                break;
            }
        }
    })
}

//Follow blue choice
function blue() {
    console.clear();
    console.log("\nTu te reveil d'un rève...\n");
    console.log("En levant les yeux, tu te souviens que tu etais a ton entretient d'embauche chez Google\n\n\n");
    console.log("Smith:");
    console.log("Félicitation ! vous etes qualifié pour ce poste,\nacceptez vous de rejoindre notre entreprise ?\n");

    ask("Tape:\n\x1b[36m 1 \x1b[0m Pour accepter\n\x1b[36m 2 \x1b[0m Pour refuser\n\n > ", ["1", "2"], (resp) => {
        switch (resp) {
            case "1": {
                console.log("Tu as accepté !\n\n\n");
                console.log("\x1b[31m20 ans plus tard, tu te suicide suite a un burnout.");
                restart();
                return;
            }
            case "2": {
                console.log("Tu as refusé...\n\n\n");
                console.log("\x1b[31mSmith ce lève et te tue.");
                restart();
                return;
            }
        }
    })
}

//Follow blue choice
function red() {
    console.clear();
    console.log("\nTu te reveil d'un rève...\n");
    console.log("En levant les yeux, tu te rend compte que tu es dans un monde post-apocaliptique\n\n\n");
    console.log("\x1b[31mTu prend peur tu te suicide");
    restart();
    return;
}

//Restart game after user dead
function restart() {
    ask("Tape:\n\x1b[36m 1 \x1b[0m Pour recommencer\n\x1b[36m 2 \x1b[0m Pour abandonné\n\n > ", ["1", "2"], (resp) => {
        switch (resp) {
            case "1": {
                start();
                break;
            }
            case "2": {
                rl.close();
                return;
            }
        }
    })
}

start();