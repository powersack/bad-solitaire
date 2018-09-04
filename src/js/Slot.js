;(function (bs, $) {
    var Slot = function (initialCards) {
        var self = this;
        self.$el = $('<div>', {'class': 'slot'});
        self.initialCards = initialCards;

        self.init();
    };

    Slot.prototype.init = function () {
        var self = this;
    };

    bs.newSlot = function (initialCards) {
        return new Slot(initialCards);
    };
}(bs, jQuery));