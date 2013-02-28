var barHeight, visibleBar, visibleExtend, gridster, dragging;

$(document).ready( function() {
	visibleExtend = true;
	barHeight = $('.bar').height() - $('.bar > .header').height();

	dragging = false;

	$(window).scroll( function(e) {
		if(dragging) e.preventDefault();
		else return true;
	})

	// Setup hover behaviour
	$('.bar').hoverIntent( function(){ // on hover
		visibleBar = true
		barSlideUp();
	}, function() { // hover off
		visibleBar = false
		barSlideDown();
	});

	// Setup click behaviour
	$('.bar').click( function(){
		console.log("Clicked")
		visibleExtend = !visibleExtend;
		if(!visibleExtend) listSlideUp();
		//else listSlideUp();
	});

	init();
    
});

// One time functions that run at startup
function init() {
	console.log("Initializing");
	barSlideDown(); // Slides the bar down to give a cue to the user about its role/presence.

	initTicker();

	$('.scroll').smoothDivScroll({
			mousewheelScrolling: "allDirections",
			manualContinuousScrolling: false,
			hotSpotScrollingStep: 1
			
		});


	$('.dragItem').draggable({
		start: function(event,ui) {
			barSlideUp();
			//listSlideUp();
			
			dragging = true;
		},
		stop: function(event,ui) {
			dragging = false;
		},
		containment: "document",
		revert: 'invalid',
	    helper: "clone",
      	cursor: "move"
	});

	$( ".lists" ).each( function(list) {

		var target = this;
		console.log(target)

		$(this).droppable({
	      activeClass: "ui-state-hover",
	      hoverClass: "ui-state-active",
	      drop: function( event, ui ) {
	      	dragging = false;
		  	deleteImage( ui.draggable, target );
	      	barSlideUp();
			listSlideDown();
	        // $( this )
	        //   .addClass( "ui-state-highlight" )
	        //   .find( "p" )
	        //     .html( "Dropped!" );
	      }
	    });

	});

//////////

 var $gallery = $( ".gallery" );
      //$lists = $( ".lists" );

var recycle_icon = "<a href='#' title='item' class='ui-icon ui-icon-refresh'></a>";
function deleteImage( $item, $lists ) {
  $item.animate({ opacity:.25},1000,function() {
    var $target = $( $lists ).length ?
      $( $lists ) :
      $( $gallery ).appendTo( $lists );

    //$item.find( "a.ui-icon-trash" ).remove();
    $item.append( recycle_icon ).appendTo( $target ).fadeIn(function() {
      $item
	    .removeAttr('style')
      	.addClass('inList')
      	.transition({
      		rotate: ( Math.random(0,1) * 35 ) + 'deg'
      		, scale: [.7, .7]
      	})
    });
  });
}


}



//////////
//////////
//////////
//////////
//////////

// Slides the bar downwards
function barSlideDown() {
	visibleExtend = false;
	if(!dragging) {
		$('.bar').animate({
			height: '40px'
		}, 500, function(err) {

		})
	}
};

// slides the bar updwards
function barSlideUp() {
	console.log("Sliding list up")
	if(!dragging) {
		$('.bar').animate({

			height: '220px'

		}, 500, function(err) {

		})
	}
}

// .barExtended slide Up
function listSlideDown() {
	console.log("Sliding list down")
	if(!dragging) {
		$('.bar').animate({

			height : '200px'

		}, 500, function(err) {

		})
	}
}

// .barExtend slide Down
function listSlideUp() {
	if(!dragging) {
		$('.bar').animate({

			height : '400px'

		}, 500, function(err) {

		})
	}
}

function scrollListsRight() {
	$('.dropSpot ul').css({
		marginLeft: (parseFloat( $(this).css('margin-left') ) + 10) + 'px'
	})
}

function scrollListsLeft() {
	$('.dropSpot ul').css({
		marginLeft: ( parseFloat($(this).css('margin-left') ) - 10) + 'px'
	})
}

// Drag an item to the list
function addItemToList(item) {

	//gridster.add_widget(
	//	_.template($('.itemTemplate').html(), data)
	//, 2, 1);

}

function initTicker() {
	$('.ticker').smoothDivScroll({
				autoScrollingMode: "always",
				autoScrollingDirection: "endlessLoopRight",
				autoScrollingStep: 1,
				autoScrollingInterval: 15 
			});

	$('.ticker').bind("mouseover", function(){
		console.log('Stopping ticker');
		$(this).smoothDivScroll("stopAutoScrolling");
	});
	
	// Mouse out
	$('.ticker').bind("mouseout", function(){
		console.log('Restarting ticker');
		$(this).smoothDivScroll("startAutoScrolling");
	});

}



//////////
//////////
//////////
//////////
//////////


