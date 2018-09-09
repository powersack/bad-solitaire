;(function (bs, $) {
    var DeckSlot = function () {
        var self = this;
        bs.Slot.call(self);
        self.$el = $('<div>', {'class': 'slot deck'});
        self._init();
    };

    DeckSlot.prototype = Object.create(bs.Slot.prototype);
    DeckSlot.prototype.constructor = DeckSlot;


    DeckSlot.prototype._init = function () {
        var self = this;
        self.$el.on('addcard', function () {
            self.$el.removeClass('slot-empty');
        });
    };

    DeckSlot.prototype.createCards = function (cards) {
        if(typeof cards !== "object" || !cards.hasOwnProperty('colors') || !cards.hasOwnProperty('numbers')) {
            return;
        }
        var self = this;
        var c, n;

        for(c = 0; c < cards.colors; c++){
            for(n = 0; n < cards.numbers; n++) {
                var card = new bs.Card(c, n);
                card.setSlot(self);
                self.cards.push(card);
            }
        }
        self.$el.removeClass('slot-empty');
        return self;
    };

    DeckSlot.prototype.shuffle = function () {
        var self = this;
        self.cards = bs.helpers.shuffleArray(self.cards);
        return self;
    };

    DeckSlot.prototype.drawCards = function (n) {
        var self = this;
        var drawnCards = [], i;
        if(n > self.cards.length) n = self.cards.length;
        for(i=0;i<n;i++){
            drawnCards.push(self.cards.pop());
        }
        if(!self.cards.length) self.$el.addClass('slot-empty');
        self.$el.trigger('draw');
        return drawnCards;
    };

    DeckSlot.prototype.updateCards = function (n) {};

    bs.DeckSlot = DeckSlot;
}(bs, jQuery));