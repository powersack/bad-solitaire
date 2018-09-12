;(function (bs, $) {
    if(!bs.poker) bs.poker = {};

    var Slot = function () {
        var self = this;
        bs.Slot.call(self);
    };

    Slot.prototype = Object.create(bs.Slot.prototype);
    Slot.prototype.constructor = Slot;

    Slot.prototype._init = function () {};
    Slot.prototype.onDrop = function (event, ui) {};
    Slot.prototype.updateCards = function () {};

    bs.poker.PlayerSlot = Slot;
}(bs, jQuery));