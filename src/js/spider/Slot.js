;(function (bs, $) {
    if(!bs.spider) bs.spider = {};

    var Slot = function () {
        var self = this;
        bs.Slot.call(self);
    };

    Slot.prototype = Object.create(bs.Slot.prototype);
    Slot.prototype.constructor = Slot;

    Slot.prototype.checkCardFit = function (card1, card2) {
        var self = this;
        if(!card1 || !card2 || card1.status !== 1 || card2.status !== 1) return false;
        if(!self.cards.length) return true;

        return card1.number === card2.number - 1;
    };

    Slot.prototype.checkCardFitDrag = function (card1, card2) {
        var self = this;
        if(!card1 || !card2 || card1.status !== 1 || card2.status !== 1) return false;
        if(!self.cards.length) return true;

        return (card1.color === card2.color) && (card1.number === card2.number - 1) ;
    };

    Slot.prototype.updateDraggable = function () {
        var self = this;
        var i, tmpCard, cards = [];

        for(i=self.cards.length - 1;i >= 0;i--){
            self.cards[i].dettachCards();
            self.cards[i].disableDrag();
        }
        for(i=self.cards.length - 1;i >= 0;i--){
            if(i === self.cards.length -1){
                self.cards[i].enableDrag();
            } else if(self.checkCardFitDrag(tmpCard, self.cards[i])){
                self.cards[i].enableDrag();
                self.cards[i].attachCards(cards);
                if(cards.length === 12){
                    self.$el.trigger('whole_family', [cards.concat(self.cards[i])]);
                };
            } else {
                self.cards[i].disableDrag();
                break;
            }
            tmpCard = self.cards[i];
            cards.push(self.cards[i]);
        }

        self.$el.trigger('update', [self]);
        return self;
    };

    bs.spider.Slot = Slot;
}(bs, jQuery));