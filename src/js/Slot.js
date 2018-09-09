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
        self.$el.trigger('init', [self]);
    };

    Slot.prototype.onDrop = function (event, ui) {
        var self = this;
        var $ui = $(ui.draggable);
        var card = $ui.data('card');
        self.determineAcception(card);
        self.$el.trigger('drop',[self, card]);
    };

    Slot.prototype.determineAcception = function (card) {
        var self = this;
        var lastCard = self.getCard(self.cards.length - 1);
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
    };

    Slot.prototype.checkCardFit = function (card1, card2) {
        return true;
        // implement rule
    };

    Slot.prototype.rejectCard = function (card) {
        var self = this;
        card.return();
        self.$el.trigger('reject', [self, card]);
    };

    Slot.prototype.acceptCard = function (card) {
        var self = this;
        self.$el.trigger('accept:before', [self, card]);
        if(card.attachedCards.length){
            var cards = card.attachedCards.concat(card);
            self.addCards(cards);
        } else {
            self.addCard(card);
        }
        self.$el.trigger('accept', [self, card]);
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
        self.updateCards();

        self.$el.trigger('addcard', [self, card]);
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
        self.updateCards();
        self.$el.trigger('removecard', [self, card]);
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

    Slot.prototype.hideLastCard = function () {
        var self = this;
        var card = self.getCard(self.cards.length - 1);
        if(card) card.hide();
        return self;
    };

    Slot.prototype.updateCards = function () {
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

        self.$el.trigger('update', [self]);
        return self;
    };

    bs.Slot = Slot;
}(bs, jQuery));