// For random stuff

module.exports = {
    num: function(min, max) {
        return Math.round((Math.random() * max) + min);
    },
    choose: function(array) {
        return array[this.num(0, 1)];
    }
};