;(function (bs, $) {
    var GUI = function (game) {
        var self = this;
        self.$el = $('<div>', {'class': 'gui'});
        self.$menu = $('<div>', {'class': 'menu'});
        self.$topBar = $('<div>', {'class': 'top-bar'});
        self.game = game;

        self._init();
    };

    GUI.prototype._init = function () {
        var self = this;
        self._buildTopBar();
        self._buildMenu();
    };

    GUI.prototype._buildTopBar = function () {
        var self = this;
        var $toggleMenu =  $('<button>', {'class': 'button', 'html': 'Menü'}).click(self.showMenu.bind(self));
        var $save =  $('<button>', {'class': 'button', 'html': 'Speichern'}).click(self.game.save.bind(self.game));

        var themes = 'excel mac';

        var $theme = $('<select>').change(function () {
            var $select = $(this);
            var $game = self.game.$el;
            var val = $select.val();
            $game.removeClass(themes);
            if(val !== 'reset'){
                $game.addClass(val);
            }
        });
        $theme.append($('<option>', {value: 'reset', html: 'Windows'}));
        themes.split(' ').forEach(function (theme) {
            var $opt = $('<option>', {value: theme, html: theme[0].toUpperCase() + theme.substring(1)});
            $theme.append($opt);
        });

        self.$topBar.append($toggleMenu, $save, $theme);
    };

    GUI.prototype._buildMenu = function () {
        var self = this;
        var $inner = $('<div>', {'class': 'menu-inner'});

        var $startKlondike = $('<button>', {'class': 'button', 'html': 'Klondike'})
            .click(function () {
                self.game.startGame('klondike');
                self.hideMenu();
            });

        var $startSpider = $('<button>', {'class': 'button', 'html': 'Spider'})
            .click(function () {
                self.game.startGame('spider');
                self.hideMenu();
            });

        var $close = $('<button>', {'class': 'button', 'html': 'schliessen'})
            .click(function () {
                self.hideMenu();
            });

        $inner.append($startKlondike, $startSpider, $close);
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