;(function (bs, $) {
    var Card = function (id, color, number) {
        var self = this;
        self.id = id;
        self.$el = $('<div>', {'class': 'card'});
        self._color = color;
        self._number = number;
        self.status = 0;
        self.slot = null;

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
            .draggable()
            .draggable('disable');
        self.$number = $('<div>', {'class': 'card-number', 'html': 'n:' + self.number});
        self.$color = $('<div>', {'class': 'card-color', 'html': 'c:' + self.color});
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
        })
    };

    Card.prototype.reveal = function () {
        var self = this;
        self.status = 1;
        self.$el.addClass('revealed');
        self._appendValues();
        return self;
    };

    Card.prototype.hide = function () {
        var self = this;
        self.status = 0;
        self.$el.removeClass('revealed');
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

    bs.newCard = function (id, color, number) {
        return new Card(id, color, number);
    };
}(bs, jQuery));