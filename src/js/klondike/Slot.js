;(function (bs, $) {
    if(!bs.klondike) bs.klondike = {};

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
        return (card1.color % 2 !== card2.color % 2) && (card1.number === card2.number - 1) ;
    };


    bs.klondike.Slot = Slot;
}(bs, jQuery));