class Character {
  constructor(builder) {
    this.race = builder.race
    this.name = builder.name
    this.height = builder.height
    this.weight = builder.weight
    this.age = builder.age
    this.health = builder.health
    this.maxHealth = builder.health
    this.strength = builder.strength
    this.weapon = null
    this.armor = {
      helmet: null,
      chestplate: null,
      pants: null,
    }
    this.totalArmor = 0
  }
  putOnArmor(armorType, armorPiece) {
    this.armor[armorType] = armorPiece
    this.calculateTotalArmor()
    console.log(
      `${this.name} надел ${armorPiece.name} [+${armorPiece.defense} единиц защиты]`
    )
  }

  calculateTotalArmor() {
    this.totalArmor = Object.values(this.armor)
      .filter((item) => item !== null)
      .reduce((total, armor) => total + armor.defense, 0)

    console.log(`${this.name} общая защита: ${this.totalArmor}`)
  }

  takeWeapon(weapon) {
    this.weapon = weapon
    console.log(
      `${this.name} взял оружие ${weapon.name} [Урон: ${weapon.damage}]`
    )
  }
  attack(target) {
    if (!this.isAlive() || !target.isAlive()) return

    // Базовый урон = сила персонажа + урон оружия
    const baseDamage = this.strength + this.weapon.damage

    // Финальный урон = базовый урон - защита цели (минимум 1 урон)
    const finalDamage = Math.max(baseDamage - target.totalArmor, 1)

    // Наносим урон
    target.health -= finalDamage

    console.log(`⚔️ ${this.name} атакует ${target.name}`)
    console.log(
      `Урон: ${this.strength} (сила) + ${this.weapon.damage} (${this.weapon.name}) = ${baseDamage}`
    )
    console.log(`Броня блокирует: ${target.totalArmor}`)
    console.log(`${target.name} получает ${finalDamage} урона`)
    console.log(
      `Здоровье ${target.name}: ${Math.max(target.health, 0)}/${
        target.maxHealth
      }`
    )

    if (!target.isAlive()) {
      console.log(`💀 ${target.name} умер в бою`)
    }
    console.log(`---`)
  }

  isAlive() {
    return this.health > 0
  }
}

class CharacterBuilder {
  // стандартные значения персонажей
  constructor(race, name) {
    this.race = race
    this.name = name
    this.height = 170
    this.weight = 70
    this.age = 25
    this.health = 100
    this.strength = 10
  }

  setHeight(height) {
    this.height = height
    return this
  }

  setWeight(weight) {
    this.weight = weight
    return this
  }

  setAge(age) {
    this.age = age
    return this
  }

  setHealth(health) {
    this.health = health
    return this
  }

  setStrength(strength) {
    this.strength = strength
    return this
  }

  build() {
    return new Character(this)
  }
}

class Orc extends Character {
  constructor(name) {
    super(
      new CharacterBuilder('Орк', name)
        .setHeight(180)
        .setWeight(90)
        .setAge(30)
        .setHealth(120)
        .setStrength(14)
    )
  }
}

class Dward extends Character {
  constructor(name) {
    super(
      new CharacterBuilder('Гном', name)
        .setHeight(120)
        .setWeight(60)
        .setAge(150)
        .setHealth(105)
        .setStrength(18)
    )
  }
}

class Human extends Character {
  constructor(name) {
    super(
      new CharacterBuilder('Человек', name)
        .setHeight(175)
        .setWeight(75)
        .setAge(25)
        .setHealth(100)
        .setStrength(14)
    )
  }
}

class Elf extends Character {
  constructor(name) {
    super(
      new CharacterBuilder('Эльф', name)
        .setHeight(185)
        .setWeight(65)
        .setAge(200)
        .setHealth(80)
        .setStrength(16)
    )
  }
}

class Helmet {
  constructor() {
    this.type = 'helmet'
    this.defense = 3
    this.name = 'Шлем'
  }
}

class Chestplate {
  constructor() {
    this.type = 'chestplate'
    this.defense = 5
    this.name = 'Нагрудник'
  }
}

class Pants {
  constructor() {
    this.type = 'pants'
    this.defense = 2
    this.name = 'Штаны'
  }
}
class Sword {
  constructor() {
    this.name = 'Меч'
    this.damage = 12
  }
}

class Halberd {
  constructor() {
    this.name = 'Алебарда'
    this.damage = 16
  }
}

function battleRoyale(characters) {
  console.log('НАЧАЛО КОРОЛЕВСКОЙ БИТВЫ!')
  console.log('====================')

  let round = 0
  const aliveCharacters = [...characters]

  while (aliveCharacters.length > 1) {
    round++
    console.log(`\n РАУНД ${round}`)
    console.log('Живые бойцы: ' + aliveCharacters.map((c) => c.name).join(', '))

    for (let i = 0; i < aliveCharacters.length; i++) {
      const attacker = aliveCharacters[i]

      for (let j = 0; j < aliveCharacters.length; j++) {
        if (i !== j) {
          const target = aliveCharacters[j]
          if (attacker.isAlive() && target.isAlive()) {
            attacker.attack(target)
          }
        }
      }
    }

    for (let i = aliveCharacters.length - 1; i >= 0; i--) {
      if (!aliveCharacters[i].isAlive()) {
        console.log(`${aliveCharacters[i].name} выбывает из битвы`)
        aliveCharacters.splice(i, 1)
      }
    }

    if (aliveCharacters.length === 1) break
  }

  if (aliveCharacters.length === 1) {
    console.log(`\n ПОБЕДИТЕЛЬ - ${aliveCharacters[0].name}!`)
    console.log(
      `${aliveCharacters[0].name} выжил с ${aliveCharacters[0].health} HP`
    )
  } else {
    console.log('\n Ничья, все мертвы')
  }
}

const boby = new Orc('Боби')
const dory = new Dward('Дори')
const benny = new Human('Бэнни')
const evi = new Elf('Эви')

const sword = new Sword()
const halberd = new Halberd()

const helmet = new Helmet()
const chestplate = new Chestplate()
const pants = new Pants()

console.log('ЭКИПИРОВКА:')

boby.putOnArmor('helmet', helmet)
boby.putOnArmor('chestplate', chestplate)
boby.putOnArmor('pants', pants)
boby.takeWeapon(halberd)

dory.putOnArmor('chestplate', chestplate)
dory.takeWeapon(sword)

benny.putOnArmor('helmet', helmet)
benny.putOnArmor('chestplate', chestplate)
benny.putOnArmor('pants', pants)
benny.takeWeapon(sword)

evi.putOnArmor('helmet', helmet)
evi.takeWeapon(sword)

battleRoyale([boby, dory, benny, evi])
