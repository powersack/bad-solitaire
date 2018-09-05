;(function (bs, $) {
    var Board = function (game) {
        var self = this;
        self.$el = $('<div>', {'class': 'board'});
        self.$top = $('<div>', {'class': 'board-top'});
        self.$bottom = $('<div>', {'class': 'board-bottom'});
        self.game = game;
        self.deck = new bs.DeckSlot();
        self.slots = [];
        self.finalSlots = [];
        self.drawSlot = null;
        self._slotID = 1;

        self._init();
    };

    Board.prototype._init = function () {
        var self = this;
        self.$el.append(self.$top);
        self.$el.append(self.$bottom);
        self._initEvents();
        self.$el.droppable({
            accept: '.card',
            drop: self.onDrop.bind(self)
        });
    };

    Board.prototype.onDrop = function (event, ui) {
        var self = this;
        var $ui = $(ui.draggable);
        var card = $ui.data('card');
        card.return();
    };


    Board.prototype._initEvents = function () {
        var self = this;
        self.deck.$el.click(function () {
            var drawnCards = self.deck.drawCards(bs.opts.drawCards);
            if(!drawnCards.length){
                self.deck.addCards(self.drawSlot.cards);
            } else {
                self.drawSlot.addCards(drawnCards);
            }
        });
    };

    Board.prototype.addDeck = function (cards) {
        var self = this;
        self.$top.append(self.deck.$el);
        self.deck.createCards(cards);
        return self;
    };

    Board.prototype.addSlots = function (n) {
        var self = this;
        var i;

        for(i=0;i<n;i++){
            var slot = new bs.Slot(self._slotID, i+1);
            self.slots.push(slot);
            self.$bottom.append(slot.$el);
            self._slotID++;
        }
        return self;
    };

    Board.prototype.addFinalSlots = function (n) {
        var self = this;
        var i;

        for(i=0;i<n;i++){
            var slot = new bs.FinalSlot(self._slotID);
            self.finalSlots.push(slot);
            self.$top.append(slot.$el);
            self._slotID++;
        }
        return self;
    };


    Board.prototype.addDrawSlot = function () {
        var self = this;
        var slot = new bs.DrawSlot(self._slotID);
        self.$top.append(slot.$el);
        self._slotID++;
        self.drawSlot = slot;
        return self;
    };

    Board.prototype.addInitialCardsToSlots = function (n) {
        var self = this;
        var i;
        self.slots.forEach(function (slot) {
            var initialCardsNumber = slot.initialCardsNumber;
            var drawnCards = self.deck.drawCards(initialCardsNumber);
            slot.addCards(drawnCards);
            slot.revealLastCard();
            slot.updateDraggable();
        });
        return self;
    };

    bs.Board = Board;
}(bs, jQuery));