;(function (bs, $) {
    var Card = function (color, number, status) {
        var self = this;
        self.id = bs._id.card;
        self.$el = $('<div>', {'class': 'card'});
        self._color = color;
        self._number = number;
        self.status = status || 0;
        self.slot = null;
        self.attachedCards = [];
        self._$values = [];

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
        self._$values = self._createValues(self.number, self.color);
        self.$el
            .data('card', self)
            .draggable({
                drag: self.onDrag.bind(self),
                start: self.onDragStart.bind(self),
                stop: self.onDragStop.bind(self)})
            .draggable('disable');
        self.$el.trigger('init', [self]);

        if(self.status === 1){
            self.reveal();
        }
    };


    Card.prototype._createValues = function (color, number) {
        var self = this;
        var values = [];

        values.push($('<div>', {'class': 'card-number top', 'html': bs.strings.cards.numberNames[self.number]}));
        values.push($('<div>', {'class': 'card-color top', 'html': bs.strings.cards.colorNames[self.color]}));
        values.push($('<div>', {'class': 'card-number bottom', 'html': bs.strings.cards.numberNames[self.number]}));
        values.push($('<div>', {'class': 'card-color bottom', 'html': bs.strings.cards.colorNames[self.color]}));
        return values;
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
        self.$el.trigger('drag', [self]);
    };

    Card.prototype.onDragStart = function (e,ui) {
        var self = this;
        self.attachedCards.forEach(function (card) {
            card.$el.addClass('ui-draggable-dragging');
        });
        self.$el.trigger('dragstart', [self]);
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
        self.$el.trigger('return', [self, self.attachedCards]);
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
        self.$el.addClass('revealed flipInY');
        self.$el.addClass('c'+self.color);
        self.$el.addClass('n'+self.number);
        self._appendValues();
        self.$el.trigger('reveal', [self]);
        return self;
    };

    Card.prototype.hide = function () {
        var self = this;
        self.status = 0;
        self.$el.removeClass('revealed');
        self.$el.removeClass('c'+self.color);
        self.$el.removeClass('n'+self.number);
        self._removeValues();
        self.$el.trigger('hide', [self]);
        return self;
    };

    Card.prototype._appendValues = function () {
        var self = this;
        self.$el.append(self._$values);
    };

    Card.prototype._removeValues = function () {
        var self = this;
        self._$values.forEach(function ($value) {
            $value.remove();
         });
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