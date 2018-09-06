;(function (bs, $) {

    var DrawSlot = function (id) {
        var self = this;
        bs.Slot.call(self, id);
        self.$el = $('<div>', {'class': 'slot draw-slot'});
        self._init();
    };

    DrawSlot.prototype = Object.create(bs.Slot.prototype);
    DrawSlot.prototype.constructor = DrawSlot;

    DrawSlot.prototype.onDrop = function (event, ui) {
        var self = this;
        var $ui = $(ui.draggable);
        var card = $ui.data('card');
        self.rejectCard(card);
    };

    DrawSlot.prototype.updateDraggable = function () {
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