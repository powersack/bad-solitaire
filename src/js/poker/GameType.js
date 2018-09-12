;(function (bs, $) {
    if(!bs.poker) bs.poker = {};

    var DEFAULTS = {
        cards: {
            colors: 4,
            numbers: 13
        },
        players: 5
    };

    var GameType = function (game) {
        var self = this;
        self.game = game;
        self.opts = DEFAULTS;
        self.type = 'poker';
        self.loadedSlots = loadedSlots || null;

        self.setOpts(opts);
        self._init();

    };

    GameType.prototype._init = function () {
        var self = this;
    };

    GameType.prototype.startGame = function () {
        var self = this;
        var board = self.board;
        board.addSlots([self._createDeck()], 'deck', 'top');
        board.addSlots(self._createSlots(self.opts.players), 'play', 'top');

        board.addSlots([new bs.poker.PlayerSlot()], 'player', 'bottom');
        if(!self.loadedSlots){
            board.slots.deck[0].shuffle();
            board.slots.play.forEach(function (slot, index) {
                var drawnCards = board.slots.deck[0].drawCards(2);
                slot.addCards(drawnCards);
            });

            board.slots.player.addCards(board.slots.deck[0].drawCards(2));
        }
    };

    GameType.prototype._createDeck = function () {
        var self = this;
        var slot = new bs.DeckSlot();
        if(self.loadedSlots && self.loadedSlots['deck'] && self.loadedSlots['deck'][0]){
            slot.addCards(self.loadedSlots['deck'][0]);
        } else {
            slot.createCards(self.opts.cards);
        }
    };

    GameType.prototype._createSlots = function (n) {
        var self = this;
        var i, slots = [];

        for(i=0;i<n;i++){
            var slot = new bs.poker.PlayerSlot();
            if(self.loadedSlots && self.loadedSlots['play'] && self.loadedSlots['play'][i]){
                slot.addCards(self.loadedSlots['play'][i]);
            }
            slots.push(slot);
        }
        return slots;
    };

    bs.poker.GameType = GameType;
}(bs, jQuery));