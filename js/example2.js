/**
 * Created by Format26 on 03.05.2015.
 */
/* Interface Use Example */
var Interface = function(name, methods) {
    if (arguments.length != 2) {
        throw new Error("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
    }
    this.name = name;
    this.methods = [];
    for (var i = 0, len = methods.length; i < len; i++) {
        if (typeof methods[i] !== 'string') {
            throw new Error("Interface constructor expects method names to be passed in as a string.");
        }
    this.methods.push(methods[i]);
    }
};
// Static class method.
Interface.ensureImplements = function(object) {
    if(arguments.length < 2) {
     throw new Error("Function Interface.ensureImplements called with " + arguments.length + "arguments, but expected at least 2.");
    }
    for(var i = 1, len = arguments.length; i < len; i++) {
        var interface1 = arguments[i];
        if(interface1.constructor !== Interface) {
            throw new Error("Function Interface.ensureImplements expects arguments two and above to be instances of Interface.");
        }
    
        for(var j = 0, methodsLen = interface1.methods.length; j < methodsLen; j++) {
            var method = interface1.methods[j];
            if(!object[method] || typeof object[method] !== 'function') {
                throw new Error("Function Interface.ensureImplements: object does not implement the " + interface1.name
                + " interface. Method " + method + " was not found.");
            }
        }
    }
};
var Publication = new Interface('Publication', ['getIsbn', 'setIsbn', 'getTitle',
    'setTitle', 'getAuthor', 'setAuthor', 'display']);
var Book = function(isbn, title, author) {
    this.setIsbn(isbn);
    this.setTitle(title);
    this.setAuthor(author);
}

Book.prototype.checkIsbn =  function(isbn) {
    if (isbn == undefined || typeof isbn != 'string') {
        return false;
    }
    isbn = isbn.replace(/-/g,'');
    if (isbn.length != 10 && isbn.length != 13) {
        return false;
    }
    var sum = 0;
    if (isbn.length == 10) {
        if (!isbn.match(/[0-9]/)) {
            return false;
        }
        for (var i = 0; i < 9 ; i++) {
            sum += isbn.charAt(i) * (10 - i);
        }
        var checkSum = sum % 11;
        if (checkSum == 10) checkSum = 'X';
        if (isbn.charAt(9) != checkSum) {
            return false;
        }
    } else {
        if (!isbn.match(/[0-9]/)) {
            return false;
        }
        for (var i = 0; i < 12; i++) {
            sum += isbn.charAt(i) * ((i % 2 === 0) ? 1 : 3);
        }
        var checkSum = sum % 10;
        if (isbn.charAt(12) != checkSum) {
            return false;
        }

    }

    return true;

};
Book.prototype.getIsbn = function(isbn) {
    return this.isbn;
};

Book.prototype.setIsbn = function(isbn) {
    if(!this.checkIsbn(isbn)) throw new Error('Book: Invalid ISBN.');
    this.isbn = isbn;
};

Book.prototype.getTitle = function() {
    return this.title;
};

Book.prototype.setTitle = function(title) {
    this.title = title || 'No title specified';
};

Book.prototype.getAuthor = function() {
    return this.author;
};

Book.prototype.getAuthor =  function() {
    return this.author;
};

Book.prototype.setAuthor = function(author) {
    this.author = author || 'No author specified';
};


Book.prototype.display = function() {
    console.log(this.getTitle());
    console.log(this.getAuthor());
    console.log(this.getIsbn());
    document.write(this.getAuthor() + ", " + this.getTitle() + ", " + this.getIsbn() + " ");
};


var theHobbit = new Book('0-395-07122-7', 'The Hobbit', 'J. R. R. Tolkien');
theHobbit.display();