;(function (bs, $) {
    var Game = function ($el) {
        var self = this;
        self.$el = $el;
        self.board = new bs.Board();
        self.GUI = new bs.GUI(self);
        self.gfx = new bs.gfx.Gfx();

        self.gameType = null;
        self.history = null;

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
            if(self.history){
                if(e.keyCode === 90 && e.ctrlKey){
                    self.history.undo();
                }
                if(e.keyCode === 89 && e.ctrlKey){
                    self.history.redo();
                }
            }
        });
        $(window).on('beforeunload', function(){
            setTimeout( self.save.bind(self), 0 );
            // return "speichern?";
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
        self.history = new bs.History(self);
        for(var type in self.board.slots){
            self.board.slots[type].forEach(function (slot) {
                slot.$el.on('accept:before', function(e, targetSlot, card){
                    self.history.addRecord(e, targetSlot, card)
                });
            });
        }
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