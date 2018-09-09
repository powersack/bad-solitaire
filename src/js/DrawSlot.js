;(function (bs, $) {

    var DrawSlot = function (id) {
        var self = this;
        bs.Slot.call(self, id);
        self.$el = $('<div>', {'class': 'slot draw-slot'});
        self._init();
    };

    DrawSlot.prototype = Object.create(bs.Slot.prototype);
    DrawSlot.prototype.constructor = DrawSlot;

    DrawSlot.prototype._init = function () {
        var self = this;
        self.$el.trigger('init', [self]);
    };

    DrawSlot.prototype.determineAcception = function () {
        return false;
    };

    DrawSlot.prototype.updateCards = function () {
        var self = this;
        var i;

        for(i=self.cards.length - 1;i >= 0;i--){
            self.cards[i].reveal(); //reveal all cards
            if(i === self.cards.length -1){
                self.cards[i].enableDrag();
            } else {
                self.cards[i].disableDrag();
            }
        }

        return self;
    };

    bs.DrawSlot = DrawSlot;
}(bs, jQuery));