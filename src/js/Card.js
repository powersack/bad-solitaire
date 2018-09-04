;(function (bs, $) {
    var Card = function (color, number) {
        var self = this;
        self.$el = $('<div>', {'class': 'card'});
        self.color = color;
        self.number = number;

        self.init();
    };

    Card.prototype.init = function () {
        var self = this;
    };

    bs.newCard = function (color, number) {
        return new Card(color, number);
    };
}(bs, jQuery));