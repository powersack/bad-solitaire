;(function (bs, $) {
    var Game = function ($el) {
        var self = this;
        self.$el = $el;
        self.board = new bs.Board();
        self.GUI = new bs.GUI(self);
        self.gfx = new bs.gfx.Gfx();

        self.gameType = null;
        self.history = new bs.History(self);

        self._score = 0;

        self._init();
    };

    Game.prototype._init = function () {
        var self = this;
        var $window = $(window);
        var $document = $(document);
        self.$el.append(self.GUI.$topBar);
        self.$el.append(self.GUI.$menu);
        self.$el.append(self.gfx.$el);
        self.$el.append(self.board.$el);
        self.load();
        // self.initTouchControls();
        $document.on('keydown', function (e) {
            if(self.history && e.ctrlKey){
                switch(e.keyCode){
                    case 90: self.history.undo(); break; //z
                    case 89: self.history.redo(); break; //y
                    case 71: if(self.gameType) self.startGame(self.gameType.type); break; //g
                }
            }
        });
        $window.on('beforeunload', function(){
            setTimeout( self.save.bind(self), 0 );
            // return "save?";
        });
    };

    Game.prototype.startGame = function (type, loadedSlots, gameOpts) {
        if(!type) return;
        var self = this;
        var opts = gameOpts || self.GUI.getGameOpts(type);
        self._score = 0;
        self.addScore(500);
        self.board.clearBoard();
        self.gameType = new bs[type].GameType(self, loadedSlots, opts);
        self.gameType.startGame();
        self.initHistory();
        self.initScore();
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

        self.$el.append(self.GUI.getBottomBar());
    };

    Game.prototype.initTouchControls = function () {
        var self = this;
        bs.touchControls = true;
        for(var type in self.board.slots) {
            self.board.slots[type].forEach(function (slot, index) {
                if(slot.$el.droppable('instance')) slot.$el.droppable('disable');
                slot.$el.click(function () {
                    if(self._selectedCard){
                        if(slot.determineAcception(self._selectedCard)){
                            self._selectedCard.deselect();
                            self._selectedCard = null;
                        }
                    }
                });

                slot.cards.forEach(function (card) {
                    if(card.$el.draggable('instance')) card.$el.draggable('disable');
                    card.$el.click(function(){
                        if(card.status !== 1 || !card.canMove) return;
                        if(self._selectedCard){
                            self._selectedCard.deselect();
                            if(!card.slot.determineAcception(self._selectedCard)){
                                self._selectedCard = card;
                                card.select();
                            } else {
                                card.deselect();
                                self._selectedCard = null;
                            }
                        } else {
                            self._selectedCard = card;
                            card.select();
                        }
                    })
                })
            })
        }
    };

    Game.prototype.addScore = function (score) {
        var self = this;
        self._score += score;
        self.GUI.$pointDisplay.html(self._score);
    };

    Game.prototype.setScore = function (score) {
        var self = this;
        self._score = score;
        self.GUI.$pointDisplay.html(self._score);
    };

    Game.prototype.initScore = function () {
        var self = this;
        console.log(self.history.$el)
        self.history.$el.on('undo redo add', function () {
            self.addScore(-1);
        });
        // for(var type in self.board.slots) {
        //     self.board.slots[type].forEach(function (slot, index) {
        //         slot.cards.forEach(function (card) {
        //             card.$el.on('reveal', function () {
        //                 if(card.virgin) self.addScore(1);
        //             });
        //         });
        //     });
        // }
    };

    Game.prototype.save = function () {
        var self = this;
        var jsonObj = {
            gameType: self.gameType.type,
            slots: {},
            gameOpts: self.gameType.opts,
            score: self._score,
            theme: self.GUI.$themeSelect.val()
        };
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
        var theme = jsonObj.theme;
        var score = jsonObj.score;
        var gameOpts = jsonObj.gameOpts;

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

        self.startGame(gameType, slotsFilled, gameOpts);
        if(theme) self.GUI.$themeSelect.val(theme).trigger('change');
        if(score) self.setScore(parseInt(score));
    };


    Game.prototype.win = function () {
        var self = this;
        alert('you win ')
    };

    bs.Game = Game;
}(bs, jQuery));