(function(){
    var addHtmlLineBreaks = function(){
        return function(text){
            var output = text.replace(/\n/g, '<br/>');

            return output;
        };
    };

    angular
        .module('loc8rApp')
        .filter('addHtmlLineBreaks', addHtmlLineBreaks);
})();