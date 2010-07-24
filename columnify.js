// Run on page load
//$(updateColumns);

// Run on window resize (incomplete)
//$(window).resize(updateColumns);


$(tokenTest);
function tokenTest() {
  var text = $('.columnify').children('p:first').text();
  $('.columnify').children('p').remove();
  $('.columnify').append($('<p></p>').text(text));
  var tokenizer = new $.tokenizer([/(\w+ )/], function( src, real, re ){
  	return src;
  });
  
  var tokens = tokenizer.parse(text);
  $('.columnify').append($('<p></p>').html(tokens.join('<br>')));
}



function updateColumns() {
  $('.columnify').each(function(){
    var mainBox = $(this);
    mainBox.addClass('clearfix');
    
    // Move all P tags out of the columns and into the main box
    $('.column', mainBox).each(function() {
      $(this).children('p').each(function() {
        mainBox.append(this);
      });
    });
    $('.column', mainBox).remove();
    
    // Create the first column
    var columns = [];
    columns[0] = $('<div></div>').addClass('column');
    
    currentColumn = 0;

    // Move all P tags into the new column
    columns[currentColumn].append(mainBox.children('p'));
    mainBox.append(columns[currentColumn]);

    // Loop while the box is still taller than the window frame
    while(mainBox.height() - $(window).height() > -20) {
      // Check if the last columns has only one P tag in it. If so, we can't get any smaller
      if(columns[currentColumn].children('p').length <= 1) break;
      
      // While the current column is taller then the window, keep moving P tags over to the next column
      while(columns[currentColumn].height() - $(window).height() > -20 && columns[currentColumn].children('p').length > 1) {
        // If the next column doesn't exist yet, add it
        if(!(columns[currentColumn + 1])) {
          columns[currentColumn + 1] = $('<div></div>').addClass('column');
          mainBox.append(columns[currentColumn + 1]);
        }
      
        // Pop the last paragraph off column 1 and put it at the beginning of column 2
        columns[currentColumn + 1].prepend(columns[currentColumn].children('p:last').get());
      }

      // Move on to the next column
      currentColumn++;
    }
  });
}