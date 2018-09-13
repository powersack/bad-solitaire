;(function (bs, $) {
    var GUI = function (game) {
        var self = this;
        self.$el = $('<div>', {'class': 'gui'});
        self.$menu = $('<div>', {'class': 'menu'});
        self.$topBar = $('<div>', {'class': 'top-bar'});
        self.$bottomBar = $('<div>', {'class': 'bottom-bar'});
        self.$pointDisplay = null;
        self.game = game;

        self._init();
    };

    GUI.prototype._init = function () {
        var self = this;
        self._buildTopBar();
        self._buildMenu();
    };

    GUI.prototype.getGameOpts = function (type) {
        var self = this;
        switch (type){
            case 'klondike':
                return { drawCards: self.$optKlondikeCards.val() };
            case 'spider':
                return { cards: {colors: self.$optSpiderColors.val()}};
        }
        return null;
    };

    GUI.prototype._buildTopBar = function () {
        var self = this;
        var $toggleMenu =  $('<button>', {'class': 'button', 'html': 'Neu'}).click(self.showMenu.bind(self));
        var $save =  $('<button>', {'class': 'button', 'html': 'Speichern'}).click(self.game.save.bind(self.game));
        self.$pointDisplay = $('<span>', {'class': 'point-display'});


        self.$themeSelect = $('<select class="theme-select">').change(function () {
            var $select = $(this);
            var $game = self.game.$el;
            var val = $select.val();
            $game.removeClass(bs.themes);
            if(val !== 'reset'){
                $game.addClass(val);
            }
        });
        self.$themeSelect.append($('<option>', {value: 'reset', html: 'Windows'}));
        bs.themes.split(' ').forEach(function (theme) {
            var $opt = $('<option>', {value: theme, html: theme[0].toUpperCase() + theme.substring(1)});
            self.$themeSelect.append($opt);
        });

        self.$topBar.append($toggleMenu, $save, self.$pointDisplay, self.$themeSelect);
        if(document.webkitFullscreenEnabled){
            var $fs = $('<button>', {'class': 'button fullscreen', 'html': '[ ]'});
            $fs.click(function () {
                if (document.webkitFullscreenElement) {
                    document.webkitExitFullscreen();
                } else {
                    document.documentElement.webkitRequestFullscreen();
                }
            });
            self.$topBar.append($fs);
        }
    };

    GUI.prototype.getBottomBar = function () {
        var self = this;
        self.$undoButton =  $('<button>', {'class': 'button', 'html': '<'}).click(self.game.history.undo.bind(self.game.history));
        self.$redoButton =  $('<button>', {'class': 'button', 'html': '>'}).click(self.game.history.redo.bind(self.game.history));
        self.$bottomBar.html('').append(self.$redoButton, self.$undoButton);
        return self.$bottomBar;
    };

    GUI.prototype._buildMenu = function () {
        var self = this;
        var $inner = $('<div>', {'class': 'menu-inner'});

        self.$optKlondikeCards = $('<select>', {'class': 'menu-opt-klondike-cards'});
        self.$optKlondikeCards.append($('<option>', {'value': '1', 'html': '1'}));
        self.$optKlondikeCards.append($('<option>', {'value': '3', 'html': '3', 'selected': true}));

        self.$startKlondike = $('<button>', {'class': 'button menu-gamemode', 'html': 'Klondike'})
            .click(function () {
                self.game.startGame('klondike');
                self.hideMenu();
            });

        self.$optSpiderColors = $('<select>', {'class': 'menu-opt-klondike-cards'});
        self.$optSpiderColors.append($('<option>', {'value': '1', 'html': '1'}));
        self.$optSpiderColors.append($('<option>', {'value': '2', 'html': '2', 'selected': true}));
        self.$optSpiderColors.append($('<option>', {'value': '4', 'html': '4'}));

        self.$startSpider = $('<button>', {'class': 'button menu-gamemode', 'html': 'Spider'})
            .click(function () {
                self.game.startGame('spider');
                self.hideMenu();
            });

        self.$startPoker = $('<button>', {'class': 'button menu-gamemode', 'html': 'Poker'})
            .click(function () {
                self.game.startGame('poker');
                self.hideMenu();
            });

        self.$menuClose = $('<button>', {'class': 'button menu-close', 'html': 'x'})
            .click(function () {
                self.hideMenu();
            });

        $inner.append(self.$optKlondikeCards, self.$startKlondike, self.$optSpiderColors, self.$startSpider, self.$startPoker, self.$menuClose);
        self.$menu.append($inner);
    };

    GUI.prototype.showMenu = function () {
        var self = this;
        self.$menu.css({display: 'flex'});
    };

    GUI.prototype.hideMenu = function () {
        var self = this;
        self.$menu.hide();
    };


    bs.GUI = GUI;
}(bs, jQuery));