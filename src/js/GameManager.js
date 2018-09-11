;(function (bs, $) {
    var GameManager = function () {
        var self = this;
        self.$el = $('#games');
        self.games = [];
    };

    GameManager.prototype._init = function () {
        var self = this;
    };

    GameManager.prototype._buildTopBar = function () {
        var self = this;
        self.$topBar = $('<div>', {'class': 'gamemanager-topbar', 'html': '+'});
        var $newGame = $('<button>', {'class': 'button', 'html': '+'}).click(self.createGame.bind(self));
        self.$topBar.append($newGame);
    };

    GameManager.prototype.createGame = function () {
        var self = this;

        var $game = $('<div class="game">');
        $('#games').append($game);
        var game = new bs.Game($game);
        self.games.push(game);
    };

    bs.GameManager = GameManager;
}(bs, jQuery));