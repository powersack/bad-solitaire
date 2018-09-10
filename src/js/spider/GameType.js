;(function (bs, $) {
    if(!bs.spider) bs.spider = {};

    var DEFAULTS = {
        cards: {
            colors: 2,
            numbers: 13
        },
        slots: 10
    };

    var GameType = function (game, loadedSlots, opts) {
        var self = this;
        self.game = game;
        self.board = game.board;
        self.opts = DEFAULTS;
        self.type = 'spider';
        self.loadedSlots = loadedSlots || null;

        self.setOpts(opts);
        self.deckNo = 104 / (self.opts.cards.colors * self.opts.cards.numbers);
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
        var board = self.board;

        board.addSlots([self._createDeck()], 'deck', 'top');
        board.addSlots(self._createSlots(self.opts.slots), 'play', 'center');
        self.game.board.$el.addClass('s'+self.opts.slots);

        //TODO: load final slots
        if(self.loadedSlots && self.loadedSlots['final']){
            self.loadedSlots['final'].forEach(function (slot) {
                self.createFinalSlot(null, slot);
            });
        }

        if(!self.loadedSlots) {
            board.slots.deck[0].shuffle();
            board.slots.play.forEach(function (slot, index) {
                var n = index < 4 ? 6 : 5;
                var drawnCards = board.slots.deck[0].drawCards(n);
                slot.addCards(drawnCards);
                slot.revealLastCard();
            });
        }
    };

    GameType.prototype._createDeck = function () {
        var self = this;
        var slot = new bs.DeckSlot();
        var i;

        if(self.loadedSlots && self.loadedSlots['deck'] && self.loadedSlots['deck'][0]){
            slot.addCards(self.loadedSlots['deck'][0]);
        } else {
            for(i=0;i<self.deckNo;i++){
                slot.createCards(self.opts.cards);
            }
        }

        slot.$el.click(function () {
            var drawnCards = slot.drawCards(self.opts.slots);
            var i;
            if(drawnCards.length){
                for(i=0 ;i<drawnCards.length;i++){
                    self.game.history.addRecord(null, self.board.slots.play[i], drawnCards[i]);
                }
                for(i=drawnCards.length-1;i>-1;i--){
                    self.board.slots.play[i].addCard(drawnCards[i]);
                    self.board.slots.play[i].revealLastCard();
                }
            }
        });

        return slot;
    };

    GameType.prototype._createSlots = function (n) {
        var self = this;
        var i, slots = [];

        for(i=0;i<n;i++){
            var slot = new bs.spider.Slot();
            if(self.loadedSlots && self.loadedSlots['play'] && self.loadedSlots['play'][i]){
                slot.addCards(self.loadedSlots['play'][i]);
            }
            slot.$el.on('whole_family', self.createFinalSlot.bind(self));
            slots.push(slot);
        }
        return slots;
    };


    GameType.prototype.createFinalSlot = function (e, cards) {
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

        if(check) self.game.win();
    };



    bs.spider.GameType = GameType;
}(bs, jQuery));