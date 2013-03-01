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

	$('#generateNewList').click(function() {
		addNewList();
	});
	// Setup click behaviour
/*	$('.bar').click( function(){
		console.log("Clicked")
		visibleExtend = !visibleExtend;
		if(!visibleExtend) listSlideUp();
		//else listSlideUp();
	}); */

	init();
    
});

// One time functions that run at startup
function init() {
	console.log("Initializing");
	barSlideDown(); // Slides the bar down to give a cue to the user about its role/presence.
	$('.overlay').hide();

	$('#personNameField').change(function() {
		var theInput = $(this).val();
		console.log(theInput.length)
		if( theInput.length > 4) {
			completeName();
		}
	});
	initTicker();

	$('img').attr('draggable', false);

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

	$( ".lists:not(.newList)" ).each( function(list) {

		var target = this;		
		$(this).droppable({
	      activeClass: "ui-state-hover",
	      hoverClass: "ui-state-active",
	      drop: function( event, ui ) {
	      	//$('.makeNewList').show();
	      	dragging = false;
		  	$(this).clone().next('div').animate({opacity:.25},1000);
		  	deleteImage( ui.draggable, target );
	      	barSlideUp();
	        // $( this )
	        //   .addClass( "ui-state-highlight" )
	        //   .find( "p" )
	        //     .html( "Dropped!" );
	      }
	    });

	});

	$('.newList').on('click', function() {
    	dragging = false;
		$('.makeNewList').show();
		barSlideUp();
    }).droppable({
      activeClass: "ui-state-hover",
      hoverClass: "ui-state-active",
      drop: function( event, ui ) {
      	$('.makeNewList').show();
      	dragging = false;
	  	///$(this).clone().next('div').animate({opacity:.25},1000);
	  	//deleteImage( ui.draggable, target );
      	barSlideUp();
        // $( this )
        //   .addClass( "ui-state-highlight" )
        //   .find( "p" )
        //     .html( "Dropped!" );
      }
    });


//////////

 var $gallery = $( ".gallery" );
      //$lists = $( ".lists" );

var recycle_icon = "<a href='#' title='item' class='ui-icon ui-icon-refresh'></a>";
function deleteImage( $item, $lists ) {
  $item.animate({ opacity:.25},500,function() {
    var $target = $( $lists ).length ?
      $( $lists ) :
      $( $gallery ).appendTo( $lists );

    //$item.find( "a.ui-icon-trash" ).remove();

    $item.append( recycle_icon ).appendTo( $target ).fadeIn(function() {
      //$(item).next('.myItem').animate({ opacity: 25}, 1000);
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

			height: '200px'

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


function completeName() {
	var momImg = '<img class="flex" src="/img/momImg.png" style="float:left;clear:none;width:40px;height:40px">';
	$('#personNameField').before(momImg).width('40%').val('Maureen Lovett')
}



//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function addNewList() {
	barSlideUp();
	var listName = $('#listNameField').val();
	var forPerson = $('#personNameField').val();
	var listTemplate = '<div class="lists"><a href="/proto/2">' + listName + '</a></div>';
	$('.makeNewList').fadeOut(400);
	$('.newList').after(listTemplate);
}
