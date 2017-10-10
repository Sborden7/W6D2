class View{
  constructor(HanoiGame, $el){
    this.game = HanoiGame;
    this.$el = $el;
    this.setupTowers();
    this.render();
    this.from = null;
    this.setupClickers();
  }

  setupTowers() {
    for (var i = 0; i < 3; i++) {
      let tower = $("<ul>");
      tower.addClass(`tower-${i+1}`);
      tower.data("towerNumber", i);
      this.$el.append(tower);
    }
  }

  render() {
    $("ul").empty();

    for (var i = 0; i < this.game.towers.length; i++) {
      for (var j = this.game.towers[i].length - 1; j >= 0; j--) {
        let disc = $("<li>");
        disc.addClass(`disc-${this.game.towers[i][j]}`);
        $(`.tower-${i+1}`).append(disc);
      }
    }
  }

  setupClickers() {
    $("ul").on("click", (event) => {
      if (this.from === null) {
        this.from = $(event.currentTarget).data("towerNumber");
        $(event.currentTarget).toggleClass("selected-tower");
      } else {
        // debugger;
        if (!this.game.move(this.from, $(event.currentTarget).data("towerNumber"))) {
          alert("Invalid move");
        }
        this.from = null;
        $("ul").removeClass("selected-tower");
        // debugger;
        this.render();
        if (this.game.isWon()) {
          this.render();
          setTimeout(function() { alert("You Died!"); }, 300);
          $("ul").off();
        }
        // this.setupClickers();
      }
    });
  }
}

module.exports = View;
