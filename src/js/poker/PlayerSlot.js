;(function (bs, $) {
    if(!bs.poker) bs.poker = {};

    var Slot = function () {
        var self = this;
        bs.Slot.call(self);

        self.dealer = false;
        self.money = 0;
        self.betMoney = 0;
        self.folded = false;

        self.$pokerControls = $('<div>', {'class': 'poker-controls'});
        self.$dealerButton = $('<div>', {'class': 'dealer-button'});
        self.$moneyDisplay = $('<div>', {'class': 'money-display', 'html': self.money});
        self.$betMoneyDisplay = $('<div>', {'class': 'betmoney-display', 'html': self.betMoney});
    };

    Slot.prototype = Object.create(bs.Slot.prototype);
    Slot.prototype.constructor = Slot;

    Slot.prototype._init = function () {
        var self = this;
        self.$el.addClass('poker-player');
    };

    Slot.prototype.addPokerControls = function () {
        var self = this;
        self.$el.addClass('poker-player');
        self.$pokerControls.append(self.$dealerButton, self.$moneyDisplay, self.$betMoneyDisplay);
        self.$el.append(self.$pokerControls);
    };

    Slot.prototype.onDrop = function () {};
    Slot.prototype.updateCards = function () {};
    Slot.prototype.addCard = function (card) {
        var self = this;
        card.return();
        card.deselect();
        if(card.slot){
            card.slot.removeCard(card);
        }
        card.setSlot(self);
        card.index = self.cards.length;
        self.cards.push(card);
        self.$el.append(card.$el);
        self.updateCards();

        self.$el.trigger('addcard', [self, card]);
        return self;
    };

    Slot.prototype.bet = function (n) {
        var self = this;
        self.money -= n;
        self.betMoney += n;
    };

    bs.poker.PlayerSlot = Slot;
}(bs, jQuery));