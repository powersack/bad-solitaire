;(function (bs, $) {
    if(!bs.spider) bs.spider = {};

    var DEFAULTS = {
        cards: {
            colors: 2,
            numbers: 13
        },
        slots: 10
    };

    var GameType = function (game, opts) {
        var self = this;
        self.game = game;
        self.board = game.board;
        self.opts = DEFAULTS;
        self.setOpts(opts);
        self.deckNo = 104 / (self.opts.cards.colors * self.opts.cards.numbers);
        self._init();
    };

    GameType.prototype._init = function () {
        var self = this;
        // self.board.$el.addClass('gametype-spider');
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
        var board = self.board;
        board.addDeck(self._createDeck());
        board.addSlots(self._createSlots(self.opts.slots), 'play', 'center');
        board.deck.shuffle();

        board.slots.play.forEach(function (slot, index) {
            var n = index < 4 ? 6 : 5;
            var drawnCards = board.deck.drawCards(n);
            slot.addCards(drawnCards);
            slot.revealLastCard();
        });
    };

    GameType.prototype._createDeck = function () {
        var self = this;
        var deck = new bs.DeckSlot();
        var i;

        for(i=0;i<self.deckNo;i++){
            deck.createCards(self.opts.cards);
        }

        deck.$el.click(function () {
            var drawnCards = deck.drawCards(self.opts.slots);
            var i;
            if(drawnCards.length){
                for(i=drawnCards.length-1;i>-1;i--){
                    self.board.slots.play[i].addCard(drawnCards[i]);
                    self.board.slots.play[i].revealLastCard();
                }
            }
        });

        return deck;
    };

    GameType.prototype._createSlots = function (n) {
        var self = this;
        var i, slots = [];

        for(i=0;i<n;i++){
            var slot = new bs.spider.Slot();
            slot.$el.on('whole_family', self._onWholeFamily.bind(self))
            slots.push(slot);
        }
        return slots;
    };


    GameType.prototype._onWholeFamily = function (e, cards) {
        var self = this;
        var slot = new bs.spider.FinalSlot();
        var i;
        self.game.board.addSlots([slot], 'final', 'bottom');

        slot.addCards(cards);

        for(i=cards.length - 1;i >= 0;i--){
            cards[i].dettachCards();
            cards[i].disableDrag();
        }
        self._checkWin();
    };

    GameType.prototype._checkWin = function () {
        var self = this;
        var check = self.board.slots.final.length === 104 / self.opts.cards.numbers;

        console.log('win' + check)
        if(check) self.game.win();
    };



    bs.spider.GameType = GameType;
}(bs, jQuery));