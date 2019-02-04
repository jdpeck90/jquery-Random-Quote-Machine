$(document).ready(function () {

  function openURL(url) {
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
  }

  $('#new-quote').click(function () {
    getQuotes();
  });

  function getQuotes() {
    return $.ajax({
      headers: {
        Accept: "application/json" },

      url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
      success: function success(response) {
        var quotesGroup = JSON.parse(response);
        renderQuote(quotesGroup);
      } });

  }

  function renderQuote(quoteGroup, colors) {
    colors = ['#7180AC', '#2B4570', '#A8D0DB', '#E49273', '#A37A74'];

    var randomNumber = getRandomInt(quoteGroup.quotes.length);
    var firstRandomColor = getRandomInt(colors.length);
    var secondRandomColor = getRandomInt(colors.length - 1);
    var quotes = quoteGroup.quotes;
    var randomQuote = quotes[randomNumber];
    var quote = randomQuote.quote;
    var author = randomQuote.author;
    console.log(secondRandomColor, 'color');
    $('.text-quote').text('' + quote).css('color', colors[secondRandomColor]);
    $('.text-author').text('--' + author).css('color', colors[firstRandomColor]);
    setSocialAtrributes(quote, author);
    renderNewScreenColors();
  }
  function renderNewScreenColors() {
    colors = ['#99621E', '#D38B5D', '#F3FFB6', '#739E82', '#2C5530'];
    var randomBackgroundIdx = getRandomInt(colors.length);
    var index = colors.indexOf(colors[randomBackgroundIdx]);
    var newColorArray = colors.splice(index, 1);
    var randomBorderIdx = getRandomInt(newColorArray.length);
    $('.container').css('background', colors[randomBackgroundIdx]);
    $('.container-box').css('border-color', colors[randomBorderIdx]);
  }

  function setSocialAtrributes(quote, author) {
    $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + quote + ' ' + author);

    $('#tweet-quote').on('click', function () {
      window.open('https://twitter.com/intent/tweet?hashtags=quotes&text=' + quote + ' ' + author);
    });
  }


  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getQuotes();

});