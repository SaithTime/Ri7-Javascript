//Init readline to register user inputs
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


class Action {
    constructor(name, strength, accuracy, damage) {
        this.name = name;
        this.strength = strength;
        this.accuracy = accuracy;
        this.damage = damage;
    }
}

class Entity {
    constructor(name, vitality) {
        this.name = name;
        this.vitality = vitality;
        this.lastAction = "";
    }
}

//Add and store actions
let attacks = [
    new Action("Frappe Rapide", 10, 50, true),
    new Action("Soin Léger", -15, 33, false),
    new Action("Coup puissant", 20, 33, true),
    new Action("Frappe Dévastatrice", 30, 25, true),
]


let player = new Entity("Guerrier du Feu", 50); //Create player
let bot = new Entity("Sombre Lutin", 50); //Create bot

let lastPlayerAction;
let lastBotAction;

//Main game loop
async function loop() {
    while (player.vitality > 0 && bot.vitality > 0) { //While player and bot are alive
        printInterface();
        let rep = await ask(); //Wait user input
        let attack = attacks[rep - 1]; //Get attack from input
        handleAction(player, attack, bot);
        handleAction(bot, attacks[random(0, 3)], player);
    }
    //After loop, check if player is alive and print loose or win message
    if (player.vitality <= 0) {
        console.log("\n\nVous avez perdu !\n\n");
    } else {
        console.log("\n\nVous avez gagné !\n\n");
    }
    rl.close();
}

function printInterface() { //WTF
    const boxWidth = 20;
    const playerHp = `${player.vitality}pv`.padStart(2).padEnd(boxWidth - 1);
    const botHp = `${bot.vitality}pv`.padStart(2).padEnd(boxWidth - 1);
    const playerName = "\x1b[32m" + player.name.padEnd(boxWidth - 1) + "\x1b[0m";
    const botName = "\x1b[31m" + bot.name.padEnd(boxWidth - 1) + "\x1b[0m";

    console.clear();
    console.log("\x1b[32m" + "(You)" + "\x1b[0m")
    console.log("┌" + "─".repeat(boxWidth) + "┐           ┌" + "─".repeat(boxWidth) + "┐");
    console.log(`│ ${playerName}│           │ ${botName}│`);
    console.log(`│ ${playerHp}│           │ ${botHp}│`);
    console.log("└" + "─".repeat(boxWidth) + "┘           └" + "─".repeat(boxWidth) + "┘");
    console.log("\n\n");

    if (bot.lastAction && player.lastAction != "") {
        console.log("Guerrier du Feu: " + player.lastAction); //Print last player action if exist
    }
    if (bot.lastAction && bot.lastAction != "") {
        console.log("Sombre Lutin: " + bot.lastAction); //Print last bot action if exist
    }

    console.log("\n");
    console.log("┌────────────────────────────────────────────────────────┐");
    console.log("│  Choisissez une action:                                │");
    console.log("│                                                        │");
    console.log("│    \x1b[34m1)\x1b[0m Frappe Rapide  \x1b[34m2)\x1b[0m Soin Léger                     │");
    console.log("│    \x1b[34m3)\x1b[0m Coup puissant  \x1b[34m4)\x1b[0m Frappe Dévastatrice            │");
    console.log("│                                                        │");
    console.log("└────────────────────────────────────────────────────────┘");
}

function handleAction(entity, action, other) {
    if (random(1, 100) > action.accuracy) { //Attack
        let strength = action.strength;
        if (action.damage) { //Action are an attack
            other.vitality -= strength;
            entity.lastAction = "\x1b[31mÀ infligé " + strength + " dégats à " + other.name + ".\x1b[0m";
        } else { //Action are healthy
            entity.vitality += strength;
            entity.lastAction = "\x1b[32mS'est soigné de " + strength + " pv" + ".\x1b[0m";
        }
    } else {
        entity.lastAction = "À raté son action.";
    }
}

function ask() {
    return new Promise((resolve) => {
        rl.question("\n > ", (resp) => {
            let num = Number(resp);
            if (!isNaN(num) && num > 0 && num < 5) {
                resolve(num);
            } else {
                console.log("\n\x1b[31mAttaque invalide\x1b[0m\n");
                resolve(ask());
            }
        });
    });
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

loop();