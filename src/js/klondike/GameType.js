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


    var GameType = function (game, loadedSlots, opts) {
        var self = this;
        self.game = game;
        self.opts = DEFAULTS;
        self.type = 'klondike';
        self.loadedSlots = loadedSlots || null;

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

        board.addSlots([self._createDeck()], 'deck', 'top');
        board.addSlots([self._createDrawSlot()], 'draw', 'top');
        board.addSlots(self._createFinalSlots(self.opts.cards.colors), 'final', 'top');
        board.addSlots(self._createSlots(self.opts.slots), 'play', 'center');
        self.game.board.$el.addClass('s'+self.opts.slots);

        if(!self.loadedSlots){
            board.slots.deck[0].shuffle();
            board.slots.play.forEach(function (slot, index) {
                var drawnCards = board.slots.deck[0].drawCards(index + 1);
                slot.addCards(drawnCards);
                slot.revealLastCard();
            });
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
        slot.$el.click(function () {
            var drawnCards = slot.drawCards(self.opts.drawCards).reverse();
            var records = [], i;
            if(!drawnCards.length){
                for(i=0 ;i<self.game.board.slots.draw[0].cards.length;i++){
                    records.push(self.game.history.getRecordObject(slot, self.game.board.slots.draw[0].cards[i], true));
                }
                self.game.history.addRecords(records);
                slot.addCards(self.game.board.slots.draw[0].cards);

            } else {
                for(i=0 ;i<drawnCards.length;i++){
                    records.unshift(self.game.history.getRecordObject(self.game.board.slots.draw[0], drawnCards[i], true));
                }
                self.game.history.addRecords(records);
                self.game.board.slots.draw[0].addCards(drawnCards);
            }
        });

        return slot;
    };

    GameType.prototype._createDrawSlot = function () {
        var self = this;
        var slot = new bs.DrawSlot();

        if(self.loadedSlots && self.loadedSlots['draw'] && self.loadedSlots['draw'][0]){
            slot.addCards(self.loadedSlots['draw'][0]);
        }

        return slot;
    };

    GameType.prototype._createSlots = function (n) {
        var self = this;
        var i, slots = [];

        for(i=0;i<n;i++){
            var slot = new bs.klondike.Slot();
            if(self.loadedSlots && self.loadedSlots['play'] && self.loadedSlots['play'][i]){
                slot.addCards(self.loadedSlots['play'][i]);
            }
            slots.push(slot);
            // (function (slot) {
            //     slot.$el.on('reject', function () {
            //         self.game.gfx.text('Rejected', slot.$el.position());
            //     });
            // }(slot));
        }
        return slots;
    };


    GameType.prototype._createFinalSlots = function (n) {
        var self = this;
        var i, slots = [];

        for(i=0;i<n;i++){
            var slot = new bs.klondike.FinalSlot();
            if(self.loadedSlots && self.loadedSlots['final'] && self.loadedSlots['final'][i]){
                slot.addCards(self.loadedSlots['final'][i]);
            }
            slot.$el.on('addcard', self._checkWin.bind(self));
            slots.push(slot);
        }
        return slots;
    };

    GameType.prototype._checkWin = function () {
        var self = this;

        var check = self.game.board.slots.final.every(function (slot) {
            return slot.cards.length === 13
        });
        if(check) self.game.win();
    };


    bs.klondike.GameType = GameType;
}(bs, jQuery));