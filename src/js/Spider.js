;(function (bs, $) {
    var DEFAULTS = {
        cards: {
            colors: 2,
            numbers: 13
        },
        slots: 10
    };


    var Spider = function (game, opts) {
        var self = this;
        self.game = game;
        self.board = game.board;
        self.opts = DEFAULTS;
        // self.board.$el.addClass('gametype-klondike');

        self.setOpts(opts);
        self._init();
    };

    Spider.prototype._init = function () {
        var self = this;
    };

    Spider.prototype.setOpts = function (opts) {
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

    Spider.prototype.startGame = function () {
        var self = this;
        var board = self.board;
        board.addDeck(self._createDeck());
        board.addSlots(self._createSlots(self.opts.slots));
        board.deck.shuffle();

        board.slots.forEach(function (slot, index) {
            var n = index < 4 ? 6 : 5;
            var drawnCards = board.deck.drawCards(n);
            slot.addCards(drawnCards);
            slot.revealLastCard();
        });
    };

    Spider.prototype._createDeck = function () {
        var self = this;
        var deck = new bs.DeckSlot();
        var i, deckNo = 104 / (self.opts.cards.colors * self.opts.cards.numbers);

        for(i=0;i<deckNo;i++){
            deck.createCards(self.opts.cards);
        }

        deck.$el.click(function () {
            var drawnCards = deck.drawCards(self.opts.slots);
            var i;
            if(drawnCards.length){
                for(i=drawnCards.length-1;i>-1;i--){
                    self.board.slots[i].addCard(drawnCards[i]);
                    self.board.slots[i].revealLastCard();
                }
            }
        });

        return deck;
    };

    Spider.prototype._createSlots = function (n) {
        var self = this;
        var i, slots = [];

        for(i=0;i<n;i++){
            slots.push(new bs.SpiderSlot());
        }
        return slots;
    };


    bs.Spider = Spider;
}(bs, jQuery));