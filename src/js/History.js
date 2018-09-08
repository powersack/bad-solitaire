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
        self.records.push({
            card: card,
            fromSlot: card.slot || null,
            toSlot: targetSlot
        });
        self.pointer++;
    };

    History.prototype.undo = function () {
        var self = this;
        if(self.pointer < 0) return;
        var currentRecord = self.records[self.pointer];
        currentRecord.fromSlot.hideLastCard();
        currentRecord.fromSlot.addCards(currentRecord.card.attachedCards.concat(currentRecord.card));
        self.pointer--;
        console.log(self)
    };

    History.prototype.redo = function () {
        var self = this;
        if(self.pointer === self.records.length -1) return;
        self.pointer++;
        var currentRecord = self.records[self.pointer];
        currentRecord.toSlot.addCards(currentRecord.card.attachedCards.concat(currentRecord.card));
        console.log(self)
    };

    bs.History = History;
}(bs, jQuery));