;(function (bs, $) {
    var History = function (game) {
        var self = this;

        self.game = game;
        self.pointer =  -1;
        self.records = [];
    };

    History.prototype.addRecord = function (e, targetSlot, card) {
        var self = this;
        if(self.pointer < self.records.length -1){
            self.records.length = self.pointer +1;
        }
        //TODO get the previous card status easier. eg by index
        var fromSlotLastCardStatus =
            card.slot.cards.length > 1 + card.attachedCards.length ?
                card.slot.cards[card.slot.cards.length - (card.attachedCards.length + 2)].status : 2;
        // var fromSlotLastCardStatus = card.index !== 0 ? card.slot.cards[card.index - 1].status : 2;
        self.records.push({
            card: card,
            fromSlot: card.slot,
            toSlot: targetSlot,
            fromSlotLastCardStatus: fromSlotLastCardStatus
        });

        self.pointer++;
    };

    History.prototype.undo = function () {
        var self = this;
        if(self.pointer < 0) return;
        var currentRecord = self.records[self.pointer];
        if(currentRecord.fromSlotLastCardStatus === 0){
            currentRecord.fromSlot.hideLastCard();
        }
        currentRecord.fromSlot.addCards(currentRecord.card.attachedCards.concat(currentRecord.card));
        self.pointer--;
    };

    History.prototype.redo = function () {
        var self = this;
        if(self.pointer === self.records.length -1) return;
        self.pointer++;
        var currentRecord = self.records[self.pointer];
        currentRecord.toSlot.addCards(currentRecord.card.attachedCards.concat(currentRecord.card));
    };

    bs.History = History;
}(bs, jQuery));