/* Fully Exposed Object Example */
var Book = function(isbn, title, author) {
    if (isbn == undefined) throw new Error('Kitap yapısı bir isBn gereklidir');
    this.isbn = isbn;
    this.title = title || 'No title specified';
    this.author = author || 'No author specified';
}

Book.prototype = {
    checkIsbn: function() {
        if (this.isbn == undefined || typeof this.isbn != 'string') {
            return false;
        }
        this.isbn = this.isbn.replace(/-/g,'');
        if (this.isbn.length != 10 && this.isbn.length != 13) {
            return false;
        }
        var sum = 0;
        if (this.isbn.length == 10) {
            if (!this.isbn.match(/[0-9]/)) {
                return false;
            }
            for (var i = 0; i < 9 ; i++) {
                sum += this.isbn.charAt(i) * (10 - i);
            }
            var checkSum = sum % 11;
            if (checkSum == 10) checkSum = 'X';
            if(this.isbn.charAt(9) != checkSum) {
                return false;
            }
        } else {
            if (!this.isbn.match(/[0-9]/)) { // Ensure characters 1 through 12 are digits.
                return false;
            }
            for (var i = 0; i < 12; i++) {
                sum += this.isbn.charAt(i) * ((i % 2 === 0) ? 1 : 3);
            }
            var checkSum = sum % 10;
            if (this.isbn.charAt(12) != checkSum) {
                return false;
            }

        }
    return true;
    },
    display: function() {
        document.write(this.author + ", " + this.title + ", " + this.isbn + " ");
    }
};
var theHobbit = new Book('0-395-07122-3', 'The Hobbit', 'J. R. R. Tolkien');
theHobbit.display(theHobbit.checkIsbn());