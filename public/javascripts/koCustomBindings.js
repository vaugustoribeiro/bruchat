// bind to nested html tags
ko.bindingHandlers.insertText = {
    init: function(element, valueAccessor) {
        var span = document.createElement("span"),
            firstChild = element.firstChild;

        element.insertBefore(span, firstChild);
        ko.applyBindingsToNode(span, { text: valueAccessor() });       
    }       
};