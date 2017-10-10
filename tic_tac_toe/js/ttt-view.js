class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
    this.xTurn = true;
  }

  bindEvents() {
    $(".square").on("click", (event) => {
      if (this.xTurn) {
        $(event.target).append($("<h1>X</h1>"));
        this.makeMove($(event.target));
        $(event.target).off();
        this.xTurn = false;
      } else {
        $(event.target).append($("<h1>O</h1>"));
        this.makeMove($(event.target));
        $(event.target).off();
        this.xTurn = true;
      }
      $(event.target).toggleClass("x-square o-square");
    });
  }

  makeMove($square) {
    this.game.playMove($square.data("coord"));
    if (this.game.isOver()) {
      if (this.game.winner()) {
        this.$el.append($(`<h1>Game over!!! Winner: ${this.game.winner().toUpperCase()}</h1>`));
        $($(".grid").children()).off();
      } else {
        this.$el.append($(`<h1>Game over!!! Draw!</h1>`));
        $($(".grid").children()).off();
      }
    }
  }

  setupBoard() {
    const renderGrid = $("<ul>");
    renderGrid.addClass("grid");

    this.$el.append(renderGrid);
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        let newSquare = $("<li>");
        newSquare.addClass("square");
        newSquare.data("coord", [i, j]);
        $(".grid").append(newSquare);
      }
    }
  }

}

module.exports = View;
