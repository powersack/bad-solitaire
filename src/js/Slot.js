;(function (bs, $) {
    var Slot = function () {
        var self = this;
        self.id = bs._id.slot;
        self.$el = $('<div>', {'class': 'slot play-slot'});
        self.cards = [];

        bs._id.slot++;
        self._init();
    };

    Slot.prototype._init = function () {
        var self = this;
        self.$el.droppable({
            accept: '.card',
            drop: self.onDrop.bind(self),
            tolerance: 'touch'
        });
        self.$el.trigger('init');
    };

    Slot.prototype.onDrop = function (event, ui) {
        var self = this;
        var $ui = $(ui.draggable);
        var card = $ui.data('card');
        var lastCard = self.getCard(self.cards.length - 1);
        //TODO: RULE
        if(!lastCard){
            self.acceptCard(card);
        } else if(card.slot && card.slot.id === self.id){
            card.return();
        } else {
            if(self.checkCardFit(card, lastCard)){
                self.acceptCard(card);
            } else {
                self.rejectCard(card);
            }
        }

        self.$el.trigger('drop');
    };

    Slot.prototype.checkCardFit = function (card1, card2) {
        return true;
        // implement rule
    };

    Slot.prototype.rejectCard = function (card) {
        var self = this;
        card.return();
        self.$el.trigger('reject');
    };

    Slot.prototype.acceptCard = function (card) {
        var self = this;
        if(card.attachedCards.length){
            var cards = card.attachedCards.concat(card);
            self.addCards(cards);
        } else {
            self.addCard(card);
        }
        self.$el.trigger('accept');
    };

    Slot.prototype.addCard = function (card) {
        var self = this;
        card.return();
        if(card.slot){
            card.slot.removeCard(card);
            card.slot.revealLastCard();
        }
        card.setSlot(self);
        self.cards.push(card);
        self.$el.append(card.$el);
        self.updateDraggable();

        self.$el.trigger('addcard', [card]);
        return self;
    };

    Slot.prototype.removeCard = function (card) {
        var self = this;
        var i, removedCard;

        for(i=self.cards.length-1;i>=0;i--){
            if(self.cards[i].id === card.id){
                removedCard = self.cards.splice(i,1)[0];
                break;
            }
        }
        self.updateDraggable();
        self.$el.trigger('removecard', [card]);
        return removedCard;
    };

    Slot.prototype.addCards = function (cards) {
        var self = this;
        for(var i=cards.length-1;i>-1;i--){
            self.addCard(cards[i]);
        }
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
        var i, tmpCard, cards = [];

        for(i=self.cards.length - 1;i >= 0;i--){
            self.cards[i].dettachCards();
        }
        for(i=self.cards.length - 1;i >= 0;i--){
            if(i === self.cards.length -1){
                self.cards[i].enableDrag();
            } else if(self.checkCardFit(tmpCard, self.cards[i])){
                self.cards[i].enableDrag();
                self.cards[i].attachCards(cards);
            } else {
                self.cards[i].disableDrag();
            }
            tmpCard = self.cards[i];
            cards.push(self.cards[i]);
        }

        self.$el.trigger('update');
        return self;
    };

    bs.Slot = Slot;
}(bs, jQuery));