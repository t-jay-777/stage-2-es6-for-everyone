import { FlatShading } from 'three';
import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    let fighterOne = {
      fighter: firstFighter,
      health: firstFighter.health,
      attack: firstFighter.attack,
      defense: firstFighter.defense,
      isInAttack: false,
      isInBlock: false,
      criticalHit: false,
      healthIndicator: document.getElementById('left-fighter-indicator')
    };

    let fighterTwo = {
      fighter: secondFighter,
      health: secondFighter.health,
      attack: secondFighter.attack,
      defense: secondFighter.defense,
      isInAttack: false,
      isInBlock: false,
      criticalHit: false,
      healthIndicator: document.getElementById('right-fighter-indicator')
    };

    function fighterAttack(fighter1, fighter2) {
      fighter2.health -= getDamage(fighter1, fighter2);
      fighter2.healthIndicator.style.width = `${(fighter2.health / secondFighter.health) * 100}%`;
      
    }

    window.addEventListener('keydown', event => {
      let code = event.code;

      if (code === controls.PlayerOneAttack && !fighterOne.isInBlock) {
        fighterAttack(fighterOne, fighterTwo);
      }
      if (code === controls.PlayerTwoAttack && !fighterTwo.isInBlock) {
        fighterAttack(fighterTwo, fighterOne);
      }

      if (code === controls.PlayerOneBlock){
        fighterOne.isInBlock = true;
      }

      if (code === controls.PlayerTwoBlock){
        fighterTwo.isInBlock = true;
      }
    });


    // window.addEventListener('keydown', event => {
    //   let code = event.code;

    //   switch (code) {

    //     case controls.PlayerOneAttack:
    //       fighterOne.isInAttack = true;
    //       if (fighterTwo.isInBlock == false && fighterOne.isInBlock == false) {
    //         fighterTwo.health -= getDamage(fighterTwo, fighterOne);
    //         fighterTwo.healthIndicator.style.width = `${(fighterTwo.health / secondFighter.health) * 100}%`;
    //         break;
    //       }
    //       if (fighterTwo.isInBlock == true && fighterOne.isInBlock == false) {
    //         fighterTwo.healthIndicator.style.width = `${fighterTwo.health * 100}%`;
    //         break;
    //       }

    //     case controls.PlayerTwoAttack:
    //       if (fighterOne.isInBlock == false && fighterTwo.isInBlock == false) {
    //         fighterOne.health -= getDamage(fighterOne, fighterTwo);
    //         fighterOne.healthIndicator.style.width = `${(fighterOne.health / firstFighter.health) * 100}%`;
    //         break;
    //       }
    //       if (fighterTwo.isInBlock == false && fighterOne.isInBlock == true) {
    //         fighterTwo.healthIndicator.style.width = `${fighterTwo.health * 100}%`;
    //         break;
    //       }
    //       if (fighterTwo.isInBlock == false && fighterOne.isInBlock == true) {
    //         fighterTwo.healthIndicator.style.width = `${fighterTwo.health * 100}%`;
    //         break;
    //       }

    //     case controls.PlayerOneBlock:
    //       fighterOne.isInBlock = true;
    //       break;

    //     case controls.PlayerTwoBlock:
    //       fighterTwo.isInBlock = true;
    //       break;

    //   };
      
    // })//close switch

  })//close promise
}//close fight()




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
