;(function (bs, $) {
    var DragGroup = function (cards) {
        var self = this;
        self.$el = $('<div>', {'class': 'drag-group'});
        self.cards = cards;
        self._init();
    };

    DragGroup.prototype._init = function () {
        var self = this;
        var i;
        for(i=0;i<self.cards.length;i++){
            self.cards[i].disableDrag();
            self.$el.append(self.cards[i].$el);
        }
        self.$el.draggable();
        self.$el.data('dragGroup', self);
    };

    DragGroup.prototype.appendTo = function ($container) {
        var self = this;
        $container.append(self.$el);
    };

    bs.DragGroup = DragGroup;
}(bs, jQuery));
