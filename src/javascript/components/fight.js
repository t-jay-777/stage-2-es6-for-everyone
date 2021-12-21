import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    let fighterOne = {
      fighter: firstFighter,
      health: firstFighter.health,
      isInAttack: false,
      isInBlock: false,
      criticalHit: false,
      healthIndicator: document.getElementById('left-fighter-indicator')
    };

    let fighterTwo = {
      fighter: secondFighter,
      health: secondFighter.health,
      isInAttack: false,
      isInBlock: false,
      criticalHit: false,
      healthIndicator: document.getElementById('right-fighter-indicator')
    };

    window.addEventListener('keydown', event => {
      let code = event.code;

      if (controls.PlayerOneCriticalHitCombination.every(code => pressed.has(code))){
        if (playerOne.isCriticalHitAllowed) {
          playerTwo.health -= getCriticalHit(playerOne);       
          playerOne.isCriticalHitAllowed = false;     
          setTimeout(function () {
            playerOne.isCriticalHitAllowed = true;
          }, 10000);
        }
      }

      if (controls.PlayerTwoCriticalHitCombination.every(code => pressed.has(code))){
        if (playerTwo.isCriticalHitAllowed) {
          playerOne.health -= getCriticalHit(playerTwo);
          playerTwo.isCriticalHitAllowed = false;  
          setTimeout(function () {
            playerTwo.isCriticalHitAllowed = true;
          }, 10000);
        }
      }

      switch(code) {

        case controls.PlayerOneAttack:
          fighterOne.isInAttack = true;
          if (fighterTwo.isInBlock == false && fighterOne.isInBlock == false) {
            fighterTwo.health -= getDamage(fighterTwo);
            fighterTwo.healthIndicator.style.width = `${(fighterTwo.health / secondFighter.health)*100}%`;
            break;
          }

          case controls.PlayerTwoAttack:
            if (fighterOne.isInBlock == false && fighterTwo.isInBlock == false) {
              fighterOne.health -= getDamage(fighterOne);
              fighterOne.healthIndicator.style.width = `${(fighterOne.health / firstFighter.health)*100}%`;
              break;
            }

          case controls.PlayerOneBlock:
            fighterOne.isInBlock = true;
            break;
          
          case controls.PlayerTwoBlock:
            fighterTwo.isInBlock = true;
            break;
          }

    });

  });
}

export function getDamage(attacker, defender) {
  const damage = getHitPower(attacker) - getBlockPower(defender);
  if (damage <= 0) {
    return 0;
  }
  return damage;

  //return (getHitPower - getBlockPower > 0 ? getHitPower - getBlockPower : 0)
}

export function getHitPower(fighter) {
  const criticalHitChance = getRandomNumber(1, 2);
  const power = fighter.attack * criticalHitChance;
  return power;
}

export function getCriricalHit(fighter) {
  return fighter.attack * 2;
}

export function getBlockPower(fighter) {
  const dodgeChance = getRandomNumber(1, 2);
  const power = fighter.defense * dodgeChance;
  return power;
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
