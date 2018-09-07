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
        self.$topBar.append($toggleMenu);
    };

    GUI.prototype._buildMenu = function () {
        var self = this;
        var $inner = $('<div>', {'class': 'menu-inner'});

        var $startKlondike = $('<button>', {'class': 'button', 'html': 'Klondike'})
            .click(function () {
                self.game.startKlondike();
                self.hideMenu();
            });

        var $startSpider = $('<button>', {'class': 'button', 'html': 'Spider'})
            .click(function () {
                self.game.startSpider();
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
        self.$menu.show();
    };

    GUI.prototype.hideMenu = function () {
        var self = this;
        self.$menu.hide();
    };


    bs.GUI = GUI;
}(bs, jQuery));