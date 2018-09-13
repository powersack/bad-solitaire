;(function (bs, $) {
    if(!bs.poker) bs.poker = {};

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

    DrawSlot.prototype.updateCards = function () {};

    bs.poker.DrawSlot = DrawSlot;
}(bs, jQuery));