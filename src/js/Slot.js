;(function (bs, $) {
    var Slot = function (id, initialCardsNumber) {
        var self = this;
        self.id = id;
        self.$el = $('<div>', {'class': 'slot'});
        self.initialCardsNumber = initialCardsNumber;
        self.cards = [];

        self._init();
    };

    Slot.prototype._init = function () {
        var self = this;
        self.$el.droppable({
            accept: '.card',
            drop: self.onDrop.bind(self)
        });
    };

    Slot.prototype.onDrop = function (event, ui) {
        var self = this;
        var $card = $(ui.draggable);
        var card =  $card.data('card');
        var lastCard = self.getCard(self.cards.length - 1);
        console.info(card.slot.id, card.color, card.number, lastCard.color, lastCard.number);
        if((card.color !== lastCard.color) && (card.number < lastCard.number)){
            self.acceptCard(card);
        } else {
            self.rejectCard(card);
        }
    };

    Slot.prototype.rejectCard = function (card) {
        var self = this;
        card.return();

    };

    Slot.prototype.acceptCard = function (card) {
        var self = this;

    };

    Slot.prototype.addCard = function (card) {
        var self = this;
        if(card.slot){
            //TODO: remove from slot
        }
        card.setSlot(self);
        self.cards.push(card);
        self.$el.append(card.$el);
        return self;
    };

    Slot.prototype.removeCard = function (card) {
        var self = this;
    };

    Slot.prototype.addCards = function (cards) {
        var self = this;
        cards.forEach(function (card) {
            self.addCard(card);
        });
        return self;
    };

    Slot.prototype.getCard = function (n) {
        var self = this;
        if(n < 0 || n > self.cards.length) return false;
        return self.cards[n];
    };

    Slot.prototype.revealLastCard = function () {
        var self = this;
        var card = self.getCard(self.cards.length - 1);
        if(card) card.reveal();
        return self;
    };

    Slot.prototype.updateDraggable = function () {
        var self = this;
        self.cards.forEach(function (card, index) {
            if(index === self.cards.length -1){
                card.enableDrag();
            } else {
                card.disableDrag();
            }
        });
        return self;
    };

    bs.newSlot = function (id, initialCardsNumber) {
        return new Slot(id, initialCardsNumber);
    };
}(bs, jQuery));