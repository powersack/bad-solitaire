;(function (bs, $) {

    var FinalSlot = function () {
        var self = this;
        bs.Slot.call(self);
        self.$el = $('<div>', {'class': 'slot final-slot'});
        self._init();
    };

    FinalSlot.prototype = Object.create(bs.Slot.prototype);
    FinalSlot.prototype.constructor = FinalSlot;

    FinalSlot.prototype.onDrop = function (event, ui) {
        var self = this;
        var $ui = $(ui.draggable);
        var card = $ui.data('card');
        var lastCard = self.getCard(self.cards.length - 1);
        if(!lastCard && card.number === 0){
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

    FinalSlot.prototype.checkCardFit = function (card1, card2) {
        var self = this;
        if(!card1 || !card2 || card1.status !== 1 || card2.status !== 1) return false;
        if(!self.cards.length) return true;
        return (card1.color === card2.color ) &&
            ((card1.number === card2.number + 1));
    };



    bs.FinalSlot = FinalSlot;
}(bs, jQuery));