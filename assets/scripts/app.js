const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAl_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife
let currentPlayerHealth = chosenMaxLife

adjustHealthBars(chosenMaxLife)

function endRound(){
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You won!")
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("You lost!")
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert("its a draw")
    }
}

function attackMonster(mode) {
    let maxDamage;
    if (mode === "ATTACK") {
        maxDamage = ATTACK_VALUE;
    } else if (mode === "STRONG_ATTACK") {
        maxDamage = STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(STRONG_ATTACK_VALUE);
    currentMonsterHealth -= damage;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
  endRound();
}

function attackHandler() {
    attackMonster("ATTACK");
}
function strongAttackHandler() {
    attackMonster("STRONG_ATTACK");
}

function healPlayerHandler(){
increasePlayerHealth(HEAl_VALUE);
endRound()
}


attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler)
healBtn.addEventListener('click', healPlayerHandler)
