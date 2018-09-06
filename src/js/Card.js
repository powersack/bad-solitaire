;(function (bs, $) {
    var Card = function (color, number) {
        var self = this;
        self.id = bs._id.card;
        self.$el = $('<div>', {'class': 'card'});
        self._color = color;
        self._number = number;
        self.status = 0;
        self.slot = null;
        self.attachedCards = [];

        bs._id.card++;
        self._init();
    };

    Object.defineProperty(Card.prototype, 'color',{
        get: function () {
            return this._color;
        }
    });

    Object.defineProperty(Card.prototype, 'number',{
        get: function () {
            return this._number;
        }
    });

    Card.prototype._init = function () {
        var self = this;
        self.$el
            .data('card', self)
            .draggable({
                drag: self.onDrag.bind(self),
                start: self.onDragStart.bind(self),
                stop: self.onDragStop.bind(self)})
            .draggable('disable');
        self.$number = $('<div>', {'class': 'card-number', 'html': bs.strings.cards.numberNames[self.number]});
        self.$color = $('<div>', {'class': 'card-color', 'html': bs.strings.cards.colorNames[self.color]});
    };

    Card.prototype.onDrag = function (e,ui) {
        var self = this;
        self.attachedCards.forEach(function (card) {
            card.$el.css({
                position: 'relative',
                top: ui.position.top,
                left: ui.position.left
            });
        });
    };

    Card.prototype.onDragStart = function (e,ui) {
        var self = this;
        self.attachedCards.forEach(function (card) {
            card.$el.addClass('ui-draggable-dragging');
        });
    };

    Card.prototype.onDragStop = function (e,ui) {
        var self = this;
        self.attachedCards.forEach(function (card) {
            card.$el.removeClass('ui-draggable-dragging');
        });
    };

    Card.prototype.setSlot = function (slot) {
        var self = this;
        self.slot = slot;
    };

    Card.prototype.return = function () {
        var self = this;
        self.$el.css({
            top: 0,
            left: 0
        });

        self.attachedCards.forEach(function (card) {
            card.$el.css({
                top: 0,
                left: 0
            });
        });
    };

    Card.prototype.attachCard = function (card) {
        var self = this;
        self.attachedCards.push(card);
    };
    Card.prototype.attachCards = function (cards) {
        var self = this;
        self.attachedCards = self.attachedCards.concat(cards);
    };

    Card.prototype.dettachCards = function () {
        var self = this;
        self.attachedCards = [];
    };

    Card.prototype.reveal = function () {
        var self = this;
        self.status = 1;
        self.$el.addClass('revealed');
        self.$el.addClass('c'+self.color);
        self.$el.addClass('n'+self.number);
        self._appendValues();
        return self;
    };

    Card.prototype.hide = function () {
        var self = this;
        self.status = 0;
        self.$el.removeClass('revealed');
        self.$el.removeClass('c'+self.color);
        self.$el.removeClass('n'+self.number);
        self._removeValues();
        return self;
    };

    Card.prototype._appendValues = function () {
        var self = this;
        self.$el.append(self.$number);
        self.$el.append(self.$color);
    };

    Card.prototype._removeValues = function () {
        var self = this;
        self.$number.remove();
        self.$color.remove();
    };

    Card.prototype.enableDrag = function () {
        var self = this;
        self.$el.draggable('enable');
    };

    Card.prototype.disableDrag = function () {
        var self = this;
        self.$el.draggable('disable');
    };

    bs.Card = Card;
}(bs, jQuery));