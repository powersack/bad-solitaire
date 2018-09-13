(function (bs, $) {
    if(!bs.gfx) bs.gfx = {};
    var Entity = function ($el, pos, color, duration) {
        var self = this;
        self.$el = $el;
        self._pos = pos || {left: 0, top: 0};
        self.color = color || 'red';
        self.duration = typeof duration === 'number' ? duration : 0;

        self._init();
    };


    Entity.prototype._init = function () {
        var self = this;
        self.setPos(self._pos);
        self.$el.css({color: self.color});
    };

    Entity.prototype.show = function () {
        var self = this;
        self.$el.show();
        window.setTimeout(function () {
            self.$el.remove();
        }, self.duration);
    };


    Entity.prototype.setPos = function (left, top) {
        var pos;
        if(typeof left === 'object'){
            pos = left;
        } else if(typeof left === 'number' || typeof top === 'number'){
            pos = {
                left: left,
                top: top
            }
        } else {
            return;
        }
        var self = this;
        self._pos = pos;

        self.$el.css(pos);
        return self;
    };

    Entity.prototype.setDuration = function (duration) {
        if (typeof duration !== 'number') return;
        var self = this;
        self.duration = duration;
    };


    bs.gfx.Entity = Entity;
}(bs, jQuery));