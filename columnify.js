// Run on page load
$(updateColumns);

// Run on window resize (incomplete)
$(window).resize(updateColumns);



function updateColumns() {
  $('.columnify').each(function(){
    var mainBox = $(this);
    mainBox.addClass('clearfix');
    
    // Move all P tags out of the columns and into the main box
    $('column', mainBox).each(function() {
      mainBox.append($(this).children('p'));
      $(this).remove();
    });
    
    // Create the first column
    var columns = [];
    columns[0] = $('<div></div>').addClass('column');
    
    currentColumn = 0;

    // Move all P tags into the new column
    columns[currentColumn].append(mainBox.children('p'));
    mainBox.append(columns[currentColumn]);
    
    // Loop while the box is still taller than the window frame
    while(mainBox.height() > $(window).height()) {
      // Check if the last columns has only one P tag in it. If so, we can't get any smaller
      if(columns[currentColumn].children('p').length <= 1) break;
      
      // While the current column is taller then the window, keep moving P tags over to the next column
      while(columns[currentColumn].height() > $(window).height() && columns[currentColumn].children('p').length > 1) {
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