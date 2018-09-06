;(function (bs, $) {
    var SpiderSlot = function () {
        var self = this;
        bs.Slot.call(self);
    };

    SpiderSlot.prototype = Object.create(bs.Slot.prototype);
    SpiderSlot.prototype.constructor = SpiderSlot;

    //TODO: RULE
    SpiderSlot.prototype.checkCardFit = function (card1, card2) {
        var self = this;
        if(!card1 || !card2 || card1.status !== 1 || card2.status !== 1) return false;
        if(!self.cards.length) return true;

        return card1.number === card2.number - 1;
    };


    bs.SpiderSlot = SpiderSlot;
}(bs, jQuery));