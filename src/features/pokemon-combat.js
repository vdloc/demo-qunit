// pokemon-combat.js

class Pokemon {
  constructor(name, type, hp, attack, defense) {
    this.name = name;
    this.type = type;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
  }

  takeDamage(damage) {
    const actualDamage = Math.max(damage - this.defense, 0);
    this.hp -= actualDamage;
    console.log(
      `${this.name} takes ${actualDamage} damage. Remaining HP: ${this.hp}`
    );
  }

  isAlive() {
    return this.hp > 0;
  }
}

function typeEffectiveness(attackerType, defenderType) {
  const effectivenessChart = {
    fire: { water: 0.5, grass: 2.0, fire: 1.0 },
    water: { fire: 2.0, grass: 0.5, water: 1.0 },
    grass: { fire: 0.5, water: 2.0, grass: 1.0 },
  };

  return effectivenessChart[attackerType][defenderType] || 1.0;
}

function simulateBattle(pokemon1, pokemon2) {
  console.log(`Battle between ${pokemon1.name} and ${pokemon2.name} begins!`);

  let round = 1;
  while (pokemon1.isAlive() && pokemon2.isAlive()) {
    console.log(`\nRound ${round}:`);

    // Pokemon 1 attacks Pokemon 2
    let damage =
      pokemon1.attack * typeEffectiveness(pokemon1.type, pokemon2.type);
    pokemon2.takeDamage(damage);

    if (!pokemon2.isAlive()) {
      console.log(`${pokemon2.name} has fainted! ${pokemon1.name} wins!`);
      break;
    }

    // Pokemon 2 attacks Pokemon 1
    damage = pokemon2.attack * typeEffectiveness(pokemon2.type, pokemon1.type);
    pokemon1.takeDamage(damage);

    if (!pokemon1.isAlive()) {
      console.log(`${pokemon1.name} has fainted! ${pokemon2.name} wins!`);
      break;
    }

    round++;
  }
}

// Example usage
const charmander = new Pokemon('Charmander', 'fire', 39, 52, 43);
const squirtle = new Pokemon('Squirtle', 'water', 44, 48, 65);

simulateBattle(charmander, squirtle);
