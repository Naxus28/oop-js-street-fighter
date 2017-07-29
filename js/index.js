/*Constructor functions*/
function Person(name, age, nationality) {
  this.name = name;
  this.age = age;
  this.nationality = nationality;
}

/*Defining methods on the prototype is the pattern suggest on https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes*/
// name
Person.prototype.getName = function() { return this.name; }
Person.prototype.setName = function(name) { this.name = name; }

//age
Person.prototype.getAge = function() { return this.age; }
Person.prototype.setAge = function(age) { this.age = age; } 

// nationality
Person.prototype.getNationality = function() { return this.nationality; }
Person.prototype.setNationality = function(nationality) { this.nationality = nationality; } 


function Player(Person, attackLevel, defenseLevel, healthLevel, playerNumber) {
  this.name = Person.name;
  this.age = Person.age;
  this.attackLevel = attackLevel;
  this.defenseLevel = defenseLevel;
  this.healthLevel = healthLevel;
  this.DOM = new DOM(playerNumber);
}

// name
Player.prototype.getName = function() {return this.name; }
Player.prototype.setName = function(name) { this.name = name; }

// attack
Player.prototype.getAttackLevel = function() { return this.attackLevel; }
Player.prototype.setAttackLevel = function(attackLevel) { this.attackLevel = attackLevel; }

// defense
Player.prototype.getDefenseLevel = function() { return this.defenseLevel; }
Player.prototype.setDefenseLevel = function(defenseLevel) { this.defenseLevel = defenseLevel; } 

// health
Player.prototype.getHealthLevel = function() { return this.healthLevel; } 
Player.prototype.setHealthLevel = function(healthLevel) { this.healthLevel = healthLevel; }

// attack function
Player.prototype.attack = function(player) { player.healthLevel -= this.attackLevel - player.defenseLevel; }

function DOM(playerNumber) {
  this.players = document.querySelectorAll('.player');
  this.button = this.players[playerNumber].getElementsByTagName('button')[0];
  this.name = this.players[playerNumber].getElementsByTagName('span')[0];
  this.healthLevel = document.getElementsByClassName('health_level')[playerNumber];
}

// instantiate playerOne
var ryu = new Person('Ryu', 25, 'Chinese');
var playerOne = new Player(ryu, 5, 3, 100, 0);

// instantiate playerTwo
var ken = new Person('Ken', 25, 'American');
var playerTwo = new Player(ken, 6, 2, 100, 1);

/* initialize DOM values */
// name
playerOne.DOM.name.innerHTML = playerOne.getName();
playerTwo.DOM.name.innerHTML = playerTwo.getName();

// health
playerOne.DOM.healthLevel.style.width = playerOne.getHealthLevel() + '%'; 
playerTwo.DOM.healthLevel.style.width = playerTwo.getHealthLevel() + '%';

// event listeners 
playerOne.DOM.button.addEventListener('click', () => attack(playerOne, playerTwo));
playerTwo.DOM.button.addEventListener('click', () => attack(playerTwo, playerOne));

// helper functions
function attack(attacker, defender) {
  attacker.attack(defender);
  defender.DOM.healthLevel.style.width = defender.getHealthLevel() + '%';
  setDefenderHealthBarColor(defender);
}

function setDefenderHealthBarColor(defender) {
  var healthLevel = defender.getHealthLevel();
  var healthLevelDOM = defender.DOM.healthLevel;
  var healthLevelDOMClasses = 'health_level ';
 
  if (healthLevel < 10) {
     healthLevelDOMClasses += 'red';
  } else if (healthLevel < 25) {
    healthLevelDOMClasses += 'red_orange_gradient_two';
  } else if (healthLevel < 45) {
     healthLevelDOMClasses += 'red_orange_gradient_one';
  } else if (healthLevel < 65) {
     healthLevelDOMClasses += 'orange_green_gradient_two';
  } else if (healthLevel < 85) {
     healthLevelDOMClasses += 'orange_green_gradient_one';
  }

  healthLevelDOM.setAttribute('class', healthLevelDOMClasses);
}





