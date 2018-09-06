;(function (bs, $) {
    var DEFAULTS = {
        cards: {
            colors: 4,
            numbers: 13
        },
        slots: 7,
        drawCards: 3
    };


    var Klondike = function (game, opts) {
        var self = this;
        self.game = game;
        self.opts = DEFAULTS;
        // self.board.$el.addClass('gametype-klondike');

        self.setOpts(opts);
        self._init();
    };

    Klondike.prototype._init = function () {
        var self = this;
    };

    Klondike.prototype.setOpts = function (opts) {
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

    Klondike.prototype.startGame = function () {
        var self = this;
        var board = self.game.board;
        board.addDeck(self._createDeck());
        board.addDrawSlot();
        board.addFinalSlots(self._createFinalSlots(self.opts.cards.colors));
        board.addSlots(self._createSlots(self.opts.slots));
        board.deck.shuffle();

        board.slots.forEach(function (slot, index) {
            var drawnCards = board.deck.drawCards(index + 1);
            slot.addCards(drawnCards);
            slot.revealLastCard();
        });

        board.setCheckWinFunc(function () {
            var check = board.finalSlots.every(function (slot) {
                return slot.cards.length === 13
            });
            if(check) self.game.win();
        });
    };

    Klondike.prototype._createDeck = function () {
        var self = this;
        var deck = new bs.DeckSlot();

        deck.createCards(self.opts.cards);
        deck.$el.click(function () {
            var drawnCards = deck.drawCards(self.opts.drawCards);
            if(!drawnCards.length){
                deck.addCards(self.game.board.drawSlot.cards);
            } else {
                self.game.board.drawSlot.addCards(drawnCards);
            }
        });

        return deck;
    };

    Klondike.prototype._createSlots = function (n) {
        var self = this;
        var i, slots = [];

        for(i=0;i<n;i++){
            slots.push(new bs.Slot());
        }
        return slots;
    };


    Klondike.prototype._createFinalSlots = function (n) {
        var self = this;
        var i, slots = [];

        for(i=0;i<n;i++){
            slots.push(new bs.FinalSlot());
        }
        return slots;
    };


    bs.Klondike = Klondike;
}(bs, jQuery));