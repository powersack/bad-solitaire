;(function (bs, $) {
    if(!bs.klondike) bs.klondike = {};
    var DEFAULTS = {
        cards: {
            colors: 4,
            numbers: 13
        },
        slots: 7,
        drawCards: 3
    };


    var GameType = function (game, opts) {
        var self = this;
        self.game = game;
        self.opts = DEFAULTS;
        // self.board.$el.addClass('gametype-klondike');

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
            slots: opts.slots || DEFAULTS.slots,
            drawCards: opts.drawCards || DEFAULTS.drawCards
        }
    };

    GameType.prototype.startGame = function () {
        var self = this;
        var board = self.game.board;
        board.addDeck(self._createDeck());
        board.addDrawSlot();
        board.addSlots(self._createFinalSlots(self.opts.cards.colors), 'final', 'top');
        board.addSlots(self._createSlots(self.opts.slots), 'play', 'center');
        board.deck.shuffle();

        board.slots.play.forEach(function (slot, index) {
            var drawnCards = board.deck.drawCards(index + 1);
            slot.addCards(drawnCards);
            slot.revealLastCard();
        });
    };

    GameType.prototype._createDeck = function () {
        var self = this;
        var deck = new bs.DeckSlot();

        deck.createCards(self.opts.cards);
        deck.$el.click(function () {
            var drawnCards = deck.drawCards(self.opts.drawCards);
            if(!drawnCards.length){
                deck.addCards(self.game.board.slots.draw[0].cards);
            } else {
                self.game.board.drawSlot.addCards(drawnCards);
            }
        });

        return deck;
    };

    GameType.prototype._createSlots = function (n) {
        var self = this;
        var i, slots = [];

        for(i=0;i<n;i++){
            slots.push(new bs.klondike.Slot());
        }
        return slots;
    };


    GameType.prototype._createFinalSlots = function (n) {
        var self = this;
        var i, slots = [];

        for(i=0;i<n;i++){
            var slot = new bs.klondike.FinalSlot();
            slot.$el.on('add:card', self._checkWin.bind(self));
            slots.push(slot);
        }
        return slots;
    };

    GameType.prototype._checkWin = function () {
        var self = this;

        var check = self.game.board.slots.final.every(function (slot) {
            return slot.cards.length === 13
        });
        console.log('win' + check)
        if(check) self.game.win();
    };


    bs.klondike.GameType = GameType;
}(bs, jQuery));