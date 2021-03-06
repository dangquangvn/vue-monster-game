new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [],
  },
  getters: {},
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack() {
      let damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits Monster for " + damage,
      });
      if (this.checkWin()) {
        return;
      }
      //   damage = Math.round((max * (Math.random() + min)) / (1 + min));
      //   let damege = Math.max(Math.floor(Math.random() * max) + 1, min);
      this.monsterAttack();
    },
    specialAttack() {
      let damage = this.calculateDamage(10, 15);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player special hits Monster" + damage,
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();
    },
    heal() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "Player heal for 10",
      });
      this.monsterAttack();
    },
    giveUp() {
      this.gameIsRunning = false;
      this.turns.unshift({
        isPlayer: true,
        text: "You lost for give up monster. What a shame!",
      });
    },

    // helper function
    monsterAttack() {
      let damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits Player for " + damage,
      });
    },
    calculateDamage(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm("You won! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You lost! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
  },
});
