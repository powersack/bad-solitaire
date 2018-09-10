;(function (bs, $) {
    var History = function (game) {
        var self = this;
        self.$el = $('<div>', {'class': 'pseudo'});

        self.game = game;
        self.pointer =  -1;
        self.records = [];
    };
    History.prototype.getRecordObject = function (targetSlot, card, forceShow) {
        var self = this;
        //TODO get the previous card status easier. eg by index
        var fromSlotLastCardStatus =
            card.slot.cards.length > 1 + card.attachedCards.length ?
                card.slot.cards[card.slot.cards.length - (card.attachedCards.length + 2)].status : -1;
        //doesnt work because of remove loop :(
        // var fromSlotLastCardStatus = card.index !== 0 ? card.slot.cards[card.index - 1].status : -1;
        return {
            card: card,
            fromSlot: card.slot,
            toSlot: targetSlot,
            fromSlotLastCardStatus: forceShow ? 1 :fromSlotLastCardStatus
        };
    };

    History.prototype.addRecord = function (e, targetSlot, card) {
        var self = this;
        if(self.pointer < self.records.length -1){
            self.records.length = self.pointer +1;
        }
        self.records.push([self.getRecordObject(targetSlot, card)]);

        self.pointer++;
    };

    History.prototype.addRecords = function (records) {
        if(!$.isArray(records)) return;
        var self = this;
        self.records.push(records);
        self.pointer++;
    };

    History.prototype.undo = function () {
        var self = this;
        if(self.pointer < 0) return;
        var currentRecords = self.records[self.pointer];
        currentRecords.forEach(function (record) {
            if(record.fromSlotLastCardStatus === 0){
                record.fromSlot.hideLastCard();
            }
            record.fromSlot.addCards(record.card.attachedCards.concat(record.card));
        });
        self.pointer--;
        self.$el.trigger('undo', [self, self.pointer]);
    };

    History.prototype.redo = function () {
        var self = this;
        if(self.pointer === self.records.length -1) return;
        self.pointer++;
        var currentRecords = self.records[self.pointer];
        currentRecords.forEach(function (record) {
            record.toSlot.addCards(record.card.attachedCards.concat(record.card));
        });
        self.$el.trigger('redo', [self, self.pointer]);
    };

    bs.History = History;
}(bs, jQuery));