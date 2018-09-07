;(function (bs, $) {
    if(!bs.spider) bs.spider= {};

    var FinalSlot = function () {
        var self = this;
        bs.Slot.call(self);
        self.$el = $('<div>', {'class': 'slot final-slot'});
    };

    FinalSlot.prototype = Object.create(bs.Slot.prototype);
    FinalSlot.prototype.constructor = FinalSlot;

    FinalSlot.prototype._init = function () {};
    FinalSlot.prototype.onDrop = function (event, ui) {};
    FinalSlot.prototype.updateDraggable = function () {};

    bs.spider.FinalSlot = FinalSlot;
}(bs, jQuery));