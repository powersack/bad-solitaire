;(function (bs, $) {
    var Card = function (color, number, status) {
        var self = this;
        self.id = bs._id.card;
        self.$el = $('<div>', {'class': 'card hidden'});
        self._color = color;
        self._number = number;
        self.status = status || 0;
        self.slot = null;
        self.attachedCards = [];
        self._$values = [];
        self.index = 0;
        self.canMove = false;
        self.virgin = true;

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
        self.$el.data('card', self)
            .draggable({
                drag: self.onDrag.bind(self),
                start: self.onDragStart.bind(self),
                stop: self.onDragStop.bind(self)})
            .draggable('disable');

        if(self.status === 1){
            self.reveal();
        }
        self.$el.trigger('init', [self]);
    };

    Card.prototype.select = function () {
        var self = this;
        self.$el.addClass('selected');

        self.attachedCards.forEach(function (card) {
            card.$el.addClass('selected');
        });
        self.$el.trigger('select', [self]);
        return self;
    };

    Card.prototype.deselect = function () {
        var self = this;
        self.$el.removeClass('selected');

        self.attachedCards.forEach(function (card) {
            card.$el.removeClass('selected');
        });
        self.$el.trigger('deselect', [self]);
        return self;
    };


    Card.prototype._createValues = function (color, number) {
        var self = this;
        var values = [];

        values.push($('<div>', {'class': 'card-number top', 'html': bs.strings.cards.numberNames[self.number]}));
        values.push($('<div>', {'class': 'card-color top', 'html': bs.strings.cards.colorNames[self.color]}));
        if(bs.strings.cards.icons[self.number] !== ''){
            values.push($('<div>', {'class': 'card-icon top', 'html': bs.strings.cards.icons[self.number]}));
        }

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
            if(card.$el) card.$el.addClass('ui-draggable-dragging');
        });
        self.$el.trigger('dragstart', [self]);
    };

    Card.prototype.onDragStop = function (e,ui) {
        var self = this;
        self.attachedCards.forEach(function (card) {
            if(card.$el) card.$el.removeClass('ui-draggable-dragging');
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
        self.$el.addClass('revealed');
        self.$el.removeClass('hidden');
        self.$el.addClass('c'+self.color);
        self.$el.addClass('n'+self.number);
        self._appendValues();
        self.$el.trigger('reveal', [self]);
        self.virgin = false;
        return self;
    };

    Card.prototype.hide = function () {
        var self = this;
        self.status = 0;
        self.$el.removeClass('revealed');
        self.$el.addClass('hidden');
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
        if(!self.$el.draggable) return;
        self.$el.draggable('enable');
        self.$el.addClass('can-move');
        self.canMove = true;
    };

    Card.prototype.disableDrag = function () {
        var self = this;
        if(!self.$el.draggable) return;
        self.$el.draggable('disable');
        self.$el.removeClass('can-move');
        self.canMove = false;
    };

    bs.Card = Card;
}(bs, jQuery));