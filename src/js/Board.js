;(function (bs, $) {
    var Board = function () {
        var self = this;
        self.$el = $('<div>', {'class': 'board'});
        self.$top = $('<div>', {'class': 'board-top'});
        self.$center = $('<div>', {'class': 'board-center'});
        self.$bottom = $('<div>', {'class': 'board-bottom'});

        self.slots = {};
        self.deck = null;
        self.drawSlot = null;

        self._init();
    };

    Board.prototype._init = function () {
        var self = this;
        self.$el.append(self.$top);
        self.$el.append(self.$center);
        self.$el.append(self.$bottom);
        self._initEvents();
    };

    Board.prototype._initEvents = function () {
        var self = this;
        self.$el.droppable({
            accept: '.card',
            drop: self.onDrop.bind(self)
        });
    };

    Board.prototype.clearBoard = function (event, ui) {
        var self = this;

        self.$top.html('');
        self.$bottom.html('');
        self.$center.html('');
        self.slots = {};
        self.deck = null;
        self.drawSlot = null;
    };

    Board.prototype.onDrop = function (event, ui) {
        var self = this;
        var $ui = $(ui.draggable);
        var card = $ui.data('card');
        card.return();
    };

    Board.prototype.addSlots = function (slots, type, position) {
        var self = this;
        if(!self.slots[type]) self.slots[type] = [];

        slots.forEach(function (slot) {
            self.slots[type].push(slot);
            switch (position){
                case 'top':
                    self.$top.append(slot.$el);
                    break;
                case 'center':
                    self.$center.append(slot.$el);
                    break;
                case 'bottom':
                    self.$bottom.append(slot.$el);
                    break;
                default:
                    self.$bottom.append(slot.$el);
            }
        });
        return self;
    };

    Board.prototype.addDrawSlot = function () {
        var self = this;
        var slot = new bs.DrawSlot();
        self.$top.append(slot.$el);
        self.drawSlot = slot;
        return self;
    };

    Board.prototype.addDeck = function (deck) {
        var self = this;
        self.deck = deck;
        self.$top.append(self.deck.$el);
        return self;
    };

    bs.Board = Board;
}(bs, jQuery));