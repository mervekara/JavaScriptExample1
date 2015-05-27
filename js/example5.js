/* the Book class with static attributes and methods Example*/
var Book = (function() {
    var numOfBook = 0;
    
    function checkIsbn(isbn) {
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
    }
    
    return function(newIsbn, newTitle, newAuthor) {
         var isbn, title, author;
        
        this.getIsbn = function() {
        return isbn;
        };
        this.setIsbn = function(newIsbn) {
            if(!checkIsbn(newIsbn)) throw new Error('Book: Invalid ISBN.');
            isbn = newIsbn;
            return isbn;
        };
        this.getTitle = function() {
            return title;
        };
        this.setTitle = function(newTitle) {
            title = newTitle || 'No title specified';
            return title;
        };
        this.getAuthor = function() {
            return author;
        };
        this.setAuthor = function(newAuthor) {       
            author = newAuthor || 'No author specified';
            return author;        
        };
        numOfBook++;
        console.log(numOfBook);
        if (numOfBook > 50) throw new Error('Book: Only 50 instances of Book can be created.');
        
        
        this.setIsbn(newIsbn);
        this.setTitle(newTitle);
        this.setAuthor(newAuthor);
    }
})();

Book.convertToTitleCase = function(inputString){
    
};

Book.prototype.display = function() {
    console.log(this.getTitle());
    console.log(this.getAuthor());
    console.log(this.getIsbn());
    document.write(this.getAuthor() + ", " + this.getTitle() + ", " + this.getIsbn() + " ");
};


var theHobbit = new Book('0-395-07122-7', 'The Hobbit', 'J. R. R. Tolkien');
theHobbit.display();