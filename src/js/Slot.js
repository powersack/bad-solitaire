;(function (bs, $) {
    var Slot = function (id, initialCardsNumber) {
        var self = this;
        self.id = id;
        self.$el = $('<div>', {'class': 'slot play-slot'});
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
        var $ui = $(ui.draggable);
        var card = $ui.data('card');
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
        var self = this;
        if(!card1 || !card2 || card1.status !== 1 || card2.status !== 1) return false;
        if(!self.cards.length) return true;
        return (card1.color % 2 !== card2.color % 2) && (card1.number === card2.number - 1) ;
    };

    Slot.prototype.rejectCard = function (card) {
        var self = this;
        card.return();

    };

    Slot.prototype.acceptCard = function (card) {
        var self = this;
        if(card.attachedCards.length){
            self.addCards(card.attachedCards);
        }
        self.addCard(card);
        if(card.slot){
            card.slot.updateDraggable();
        }
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
        return removedCard;
    };

    Slot.prototype.addCards = function (cards) {
        var self = this;
        // cards = cards.reverse();
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
            cards.unshift(self.cards[i]);
        }

        return self;
    };

    bs.Slot = Slot;
}(bs, jQuery));