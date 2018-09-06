;(function (bs, $) {
    var Board = function () {
        var self = this;
        self.$el = $('<div>', {'class': 'board'});
        self.$top = $('<div>', {'class': 'board-top'});
        self.$bottom = $('<div>', {'class': 'board-bottom'});
        self.deck = null;
        self.slots = [];
        self.finalSlots = [];
        self.drawSlot = null;
        self._checkWin = null;

        self._init();
    };

    Board.prototype._init = function () {
        var self = this;
        self.$el.append(self.$top);
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

    Board.prototype.setCheckWinFunc = function (checkWin) {
        var self = this;
        self._checkWin = checkWin;
    };

    Board.prototype.checkWin = function (checkWin) {
        var self = this;
        if(typeof self._checkWin === "function"){
            self._checkWin();
        }
    };
    Board.prototype.clearBoard = function (event, ui) {
        var self = this;

        self.$top.html('');
        self.$bottom.html('');
        self.deck = null;
        self.slots = [];
        self.finalSlots = [];
        self.drawSlot = null;
    };

    Board.prototype.onDrop = function (event, ui) {
        var self = this;
        var $ui = $(ui.draggable);
        var card = $ui.data('card');
        card.return();
    };

    Board.prototype.addDeck = function (deck) {
        var self = this;
        self.deck = deck;
        self.$top.append(self.deck.$el);
        return self;
    };

    Board.prototype.addSlots = function (slots) {
        var self = this;
        slots.forEach(function (slot) {
            self.slots.push(slot);
            self.$bottom.append(slot.$el);
        });
        return self;
    };

    Board.prototype.addFinalSlots = function (slots) {
        var self = this;
        slots.forEach(function (slot) {
            self.finalSlots.push(slot);
            self.$top.append(slot.$el);
            slot.$el.on('check:win', self.checkWin.bind(self));
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


    Board.prototype.win = function () {
        var self = this;
        alert('you win');
    };

    bs.Board = Board;
}(bs, jQuery));