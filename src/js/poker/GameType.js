;(function (bs, $) {
    if(!bs.poker) bs.poker = {};

    var DEFAULTS = {
        cards: {
            colors: 4,
            numbers: 13
        },
        slots: 5
    };

    var GameType = function (game, loadedSlots, opts) {
        var self = this;
        self.game = game;
        self.opts = DEFAULTS;
        self.type = 'poker';
        self.loadedSlots = loadedSlots || null;

        self.pot = 0;
        self.currentDealer = 0;

        self.setOpts(opts);
        self._init();

    };

    GameType.prototype._init = function () {
        var self = this;
    };

    GameType.prototype.setOpts = function (opts) {
        if(!opts) return;
        var self = this;
        self.opts = {
            cards: {
                colors: opts.cards && opts.cards.colors ? opts.cards.colors : DEFAULTS.cards.colors,
                numbers: opts.cards && opts.cards.numbers ? opts.cards.numbers : DEFAULTS.cards.numbers,
            },
            slots: opts.slots || DEFAULTS.slots
        }
    };

    GameType.prototype.startGame = function () {
        var self = this;
        var board = self.game.board;
        board.addSlots([self._createDeck()], 'deck', 'top');
        board.addSlots(self._createSlots(self.opts.slots), 'play', 'top');
        board.addSlots([self._createPlayer()], 'player', 'bottom');
        board.addSlots([self._createDrawSlot()], 'draw', 'center');

        if(!self.loadedSlots){
            board.slots.deck[0].shuffle();
            board.slots.play.forEach(function (slot, index) {
                var drawnCards = board.slots.deck[0].drawCards(2);
                slot.addCards(drawnCards);
            });

            board.slots.player[0].addCards(board.slots.deck[0].drawCards(2));
            board.slots.player[0].cards.forEach(function (card) {
                card.reveal();
            })
        }

        board.slots.play.forEach(function (slot, index) {
            var drawnCards = board.slots.deck[0].drawCards(2);
            slot.addPokerControls();
        });
        board.slots.player[0].addPokerControls();
    };

    GameType.prototype._createDeck = function () {
        var self = this;
        var slot = new bs.DeckSlot();
        if(self.loadedSlots && self.loadedSlots['deck'] && self.loadedSlots['deck'][0]){
            slot.addCards(self.loadedSlots['deck'][0]);
        } else {
            slot.createCards(self.opts.cards);
        }
        return slot;
    };

    GameType.prototype._createDrawSlot = function () {
        var self = this;
        var slot = new bs.poker.DrawSlot();

        if(self.loadedSlots && self.loadedSlots['draw'] && self.loadedSlots['draw'][0]){
            slot.addCards(self.loadedSlots['draw'][0]);
        }

        return slot;
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

    GameType.prototype._createPlayer = function () {
        var self = this;
        var slot = new bs.poker.PlayerSlot();

        if(self.loadedSlots && self.loadedSlots['player'] && self.loadedSlots['player'][0]){
            slot.addCards(self.loadedSlots['player'][0]);
        }

        return slot;
    };


    bs.poker.GameType = GameType;
}(bs, jQuery));