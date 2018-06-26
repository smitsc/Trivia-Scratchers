/**
 * This file controls the page logic
 *
 * depends on jQuery>=1.7
 */
(function() {

/**
 * Returns true if this browser supports canvas
 *
 * From http://diveintohtml5.info/
 */
function supportsCanvas() {
	return !!document.createElement('canvas').getContext;
};

/**
 * Handle scratch event on a scratcher
 */
function scratcher3Changed(ev) {
	// Test every pixel. Very accurate, but might be slow on large
	// canvases on underpowered devices:
	//var pct = (scratcher.fullAmount() * 100)|0;

	// Only test every 32nd pixel. 32x faster, but might lead to
	// inaccuracy:
	var pct = (this.fullAmount(32) * 100)|0;

    $('#scratcher3Pct').html('' + pct + '%');
    
    //enable save button
    if (pct >= 60) {
        $('.timer-area').css('border-color','red');
        $('#btn-save-score').css({"background": "#88cdde", "border-color": "#46b3cc", "color" : "#000"});
        $('#btn-save-score').prop('disabled', false);
        // clearTimeout(setDate);
        stopDate();

        // for (i = 0; i < scratchers.length; i++) {
        // scratchers[i].removeEventListener();
        // }
    }
};

/**
 * Reset all scratchers
 */
function onResetClicked(scratchers) {
	var i;

	for (i = 0; i < scratchers.length; i++) {
		scratchers[i].reset();
	}

	return false;
};

/**
 * Assuming canvas works here, do all initial page setup
 */
function initPage() {
	var scratcherLoadedCount = 0;
	var scratchers = [];
	var i, i1;

	// called each time a scratcher loads
	function onScratcherLoaded(ev) {
		scratcherLoadedCount++;

		if (scratcherLoadedCount == scratchers.length) {
			// all scratchers loaded!

			// bind the reset button to reset all scratchers
			$('#resetbutton').on('click', function() {
					onResetClicked(scratchers);
				});

			// hide loading text, show instructions text
			$('#loading-text').hide();
			$('#inst-text').show();
		}
	};

	// create new scratchers
	var scratchers = new Array(4);
    var range = [1,2,3,4];
    
	for (i = 0; i < scratchers.length; i++) {
		i1 = i + 1;
		scratchers[i] = new Scratcher('scratcher' + i1);

		// set up this listener before calling setImages():
		scratchers[i].addEventListener('imagesloaded', onScratcherLoaded);
        
        var rNumber = Math.floor(Math.random()*range.length);
        var number = range[rNumber];

        scratchers[i].setImages('./images/b' + number + 'bg.png', './images/b' + number + 'fg.png');
        range.remove(number, true);
        
        // get notifications of this scratcher changing
        // (These aren't "real" event listeners; they're implemented on top
        // of Scratcher.)
        if (number == 1) {
            scratchers[i].addEventListener('reset', scratcher3Changed);
            scratchers[i].addEventListener('scratch', scratcher3Changed);
        }
              
        // Or if you didn't want to do it every scratch (to save CPU), you
        // can just do it on 'scratchesended' instead of 'scratch':
        //scratchers[2].addEventListener('scratchesended', scratcher3Changed);
        
	}

};

/**
 * Handle page load
 */
$(function() {
	if (supportsCanvas()) {
		initPage();
	} else {
		$('#scratcher-box').hide();
		$('#lamebrowser').show();
	}
});

    
})();

Array.prototype.remove = function(elem, all) {
  for (var i=this.length-1; i>=0; i--) {
    if (this[i] === elem) {
        this.splice(i, 1);
        if(!all)
          break;
    }
  }
  return this;
};



function onRemoveEvent(scratchers) {
    
    console.log(this.scr);
	var i;

	for (i = 0; i < scratchers.length; i++) {
		scratchers[i].removeEventListener();
	}

	return false;
};
