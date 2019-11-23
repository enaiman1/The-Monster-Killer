const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAl_VALUE = 20;

const MODE_ATTACK = 'ATTACK'; //MODE_ATTAK = 0
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';//MODE_STRONG_ATTACK =1
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';


let battleLog = []
let lastLoggedEntry

//validation for user max life choice
function getMaxLifeValues () {
    // allows user to enter how much life they want to start with 
const enteredValue = prompt('Maxium life for you and the monster', '100');

// take entered value which is a string and turns it into a number
const parsedValue = parseInt(enteredValue);

//this condition validates to check if what the user input can be used as a maxium life
if (isNaN(parsedValue) || parsedValue <= 0) {
    // if it is not a number we through this message 
    throw {message: 'Invalid user inoput, not a number!'}
}
return parsedValue;
}

let chosenMaxLife
//for error handling. When user input a wrong value, 
// it will alert the user of the error and set the max life to a default of 100 
try{
 chosenMaxLife = getMaxLifeValues()
} catch(error) {
    console.log(error);
    chosenMaxLife = 100;
    alert('You entered something wrong, default value of 100 was used. ');
}

let currentMonsterHealth = chosenMaxLife
let currentPlayerHealth = chosenMaxLife
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife)

function writeToLog(ev, val, monsterHealth, playerHealth) {
    let logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    }
    switch (ev) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry.target = 'PLAYER';
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry.target = 'PLAYER';
            break;
       case LOG_EVENT_GAME_OVER:
            logEntry;
            break;
            default:
                logEntry = {}


    }
    // if (ev === LOG_EVENT_PLAYER_ATTACK) {
    //     logEntry.target = 'MONSTER'
    // } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    //     logEntry.target = 'MONSTER'
    // } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    //     logEntry.target = 'PLAYER'
    // } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    //     logEntry.target = 'PLAYER'

    // } else if (ev === LOG_EVENT_GAME_OVER) {
    //     logEntry;
        //     event: ev,
        //     value: val,
        //     finalMonsterHealth: monsterHealth,
        //     finalPlayerHealth: playerHealth
        // };
    // }
    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth)

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth)
        alert("You would be dead, but the bonus life saved you!");
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You won!")
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth
        )
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("You lost!")
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'MONSTER WON',
            currentMonsterHealth,
            currentPlayerHealth
        )
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert("its a draw")
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'BATTLE IS A DRAW',
            currentMonsterHealth,
            currentPlayerHealth
        )
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

function attackMonster(mode) {
    const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_HEAL : LOG_EVENT_PLAYER_STRONG_ATTACK;
    // if (mode === MODE_ATTACK) {
    //     maxDamage = ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_ATTACK;
    // } else if (mode === MODE_STRONG_ATTACK) {
    //     maxDamage = STRONG_ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK
    // }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    )
    endRound();
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}
function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAl_VALUE) {
        alert("You can't heal to more thrn your max initial health.");
        healValue = chosenMaxLife - currentPlayerHealth
    } else {
        healValue = HEAl_VALUE
    }
    increasePlayerHealth(HEAl_VALUE);
    currentPlayerHealth += HEAl_VALUE
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    )
    endRound()
}

function printLogHandler() {
    for(let i = 0; i < 3; i++){
        console.log('--------------')
    }
    let j = 0;
    outerWhile: do {
        console.log("outer loop ", j)
      innerFor:  for (let k = 0; k < 5; k++){
          if (k === 3) {
              break outerWhile;
          }
            console.log("inner loop ", k)
        }
        j++
    }
    while (j < 3);

    //standard for loop
    /*for (let i = 0; i< battleLog.length; i++){
        console.log(battleLog[i]);
    }*/

    //this for-of loop adds to index each move
    let i = 0
    for (const logEntry of battleLog){
        if(!lastLoggedEntry && lastLoggedEntry !==0|| lastLoggedEntry < i) {
            console.log(`#${i}`);
            // for-in this will have to run before the for of loop fo to the next iteration
           for(const key in logEntry) {
            console.log(`${key} => ${logEntry[key]}`);
            console.log(logEntry[key])
           }
           lastLoggedEntry = i
           break;
        }
       i++
       
    }
    
}


attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler)
healBtn.addEventListener('click', healPlayerHandler)
logBtn.addEventListener('click', printLogHandler)
