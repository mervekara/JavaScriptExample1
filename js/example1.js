/* Fully Exposed Object Example */
var Book = function(isbn, title, author) {
    if (isbn == undefined) throw new Error('Kitap yapısı bir isBn gereklidir');
    this.isbn = isbn;
    this.title = title || 'No title specified';
    this.author = author || 'No author specified';
}

Book.prototype.checkIsbn = function(isbn) {
    if (isbn == undefined || typeof isbn != 'string') {
        return false;
    }
    isbn = this.isbn.replace(/-/g,'');
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
        if(isbn.charAt(9) != checkSum) {
            return false;
        }
    } else {
        if (!isbn.match(/[0-9]/)) { // Ensure characters 1 through 12 are digits.
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

Book.prototype.display = function() {
    document.write(this.author + ", " + this.title + ", " + this.isbn + " ");
}

var theHobbit = new Book('0-395-07122-3', 'The Hobbit', 'J. R. R. Tolkien');
theHobbit.display(theHobbit.checkIsbn());