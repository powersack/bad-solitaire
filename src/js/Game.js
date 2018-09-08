;(function (bs, $) {
    var Game = function ($el) {
        var self = this;
        self.$el = $el;
        self.board = new bs.Board();
        self.GUI = new bs.GUI(self);
        self.gfx = new bs.gfx.Gfx();

        self.gameType = null;

        self.history = {
            pointer: -1,
            records: []
        };

        self._init();
    };

    Game.prototype._init = function () {
        var self = this;
        self.$el.append(self.GUI.$topBar);
        self.$el.append(self.GUI.$menu);
        self.$el.append(self.gfx.$el);
        self.$el.append(self.board.$el);
        self.load();
        $(document).on('keydown', function (e) {
            if(e.keyCode === 90 && e.ctrlKey){
                self.undo();
            }
            if(e.keyCode === 89 && e.ctrlKey){
                self.redo();
            }
        });
        $(window).on('beforeunload', function(){
            setTimeout( self.save.bind(self), 0 );
            return "speichern?";
        });
    };


    Game.prototype.startGame = function (type, loadedSlots) {
        if(!type) return;
        var self = this;
        self.board.clearBoard();
        self.gameType = new bs[type].GameType(self, loadedSlots);
        self.gameType.startGame();
        self.initHistory();
    };

    Game.prototype.initHistory = function () {
        var self = this;
        for(var type in self.board.slots){
            self.board.slots[type].forEach(function (slot) {
                slot.$el.on('accept:before', self.historyAddRecord.bind(self));
            });
        }
    };

    Game.prototype.historyAddRecord = function (e, targetSlot, card) {
        var self = this;
        if(self.history.pointer < self.history.records.length -1){
            self.history.records.length = self.history.pointer +1;
        }
        self.history.records.push({
            card: card,
            fromSlot: card.slot || null,
            toSlot: targetSlot
        });
        self.history.pointer++;
    };

    Game.prototype.undo = function () {
        var self = this;
        if(self.history.pointer < 0) return;
        var currentRecord = self.history.records[self.history.pointer];
        currentRecord.fromSlot.hideLastCard();
        currentRecord.fromSlot.addCards(currentRecord.card.attachedCards.concat(currentRecord.card));
        self.history.pointer--;
        console.log(self.history)
    };

    Game.prototype.redo = function () {
        var self = this;
        if(self.history.pointer === self.history.records.length -1) return;
        self.history.pointer++;
        var currentRecord = self.history.records[self.history.pointer];
        currentRecord.toSlot.addCards(currentRecord.card.attachedCards.concat(currentRecord.card));
        console.log(self.history)
    };

    Game.prototype.save = function () {
        var self = this;
        var jsonObj = {gameType: self.gameType.type, slots: {}};
        for(var type in self.board.slots) {
            jsonObj.slots[type] = [];
            self.board.slots[type].forEach(function (slot, index) {
                jsonObj.slots[type][index] = [];
                slot.cards.forEach(function (card) {
                    jsonObj.slots[type][index].push({
                        color: card.color,
                        number: card.number,
                        status: card.status
                    });
                });
            });
        }
        window.localStorage.setItem('saved-game', JSON.stringify(jsonObj));
    };

    Game.prototype.load = function () {
        var self = this;
        var json = window.localStorage.getItem('saved-game');
        if(!json) return;
        var jsonObj = $.parseJSON(json);
        var gameType = jsonObj.gameType;
        var slots = jsonObj.slots;
        var slotsFilled = {};

        for(var type in slots) {
            slotsFilled[type] = [];
            slots[type].forEach(function (slot, index) {
                slotsFilled[type][index] = [];
                slot.forEach(function (card) {
                    var c = new bs.Card(card.color, card.number, card.status);
                    slotsFilled[type][index].unshift(c);
                });
            });
        }
        self.startGame(gameType, slotsFilled);
    };


    Game.prototype.win = function () {
        var self = this;
        alert('you win ')
    };

    bs.Game = Game;
}(bs, jQuery));