var barHeight, visibleBar, visibleExtend, gridster, dragging,personAdded,dateAdded,flower={},listOpen=false;

flower.x=0;
flower.y=0;
flower.dir=0;

$(document).ready( function() {
	visibleExtend = true;
	barHeight = $('.bar').height() - $('.bar > .header').height();
    $('input').inputfit();
	dragging = false;

	var intervalID = setInterval(addNotification, 10000);
	var intervalID = setInterval(animateFlowers, 100);

	$(window).scroll( function(e) {
		if(dragging) e.preventDefault();
		else return true;
	})
	overlayTemplate();
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

	init();
    
});

// One time functions that run at startup
function init() {
	console.log("Initializing");
	barSlideDown(); // Slides the bar down to give a cue to the user about its role/presence.
	$('.overlay').hide();

	$('#personNameField').on('change keypress paste focus textInput input',function() {
		var theInput = $(this).val();
		if( theInput.length > 4) {
			completeName();
		}
	});

	$('#occasionNameField').on('change keypress paste focus textInput input',function() {
		var theInput = $(this).val();
		if( theInput.length > 4) {
			completeDate();
		}
	});

	initFeed();

	initTicker();

	listDrawerInit();

	itemPopup();

	$('img').attr('draggable', false);

	$('.scroll').smoothDivScroll({
			mousewheelScrolling: "horizontal",
			manualContinuousScrolling: false,
			hotSpotScrollingStep: 1
			
		});


	$('.dragItem').draggable({
		start: function(event,ui) {
			barSlideUp();
			dragging = true;
			// $(this).transition({
   //    		scale: [.5, .5]
   //    	})
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




}


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
      		, leftMargin : -($(this).css('width'))
      		, topMargin : -($(this).css('height'))
      	})
    });
  });
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

			height: '190px'

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
	if(!personAdded) {
		var momImg = '<img class="flex" src="/img/momImg.png" style="float:left;clear:none;width:40px;height:40px">';
		$('#personNameField').before(momImg).animate({width: '35%'}).val('Maureen Lovett').blur().inputfit();
	}
	personAdded = true;
}

function completeDate() {
	if(!dateAdded) {
		var bdayImg = '<img class="flex" src="/img/momImg.png" style="float:left;clear:none;width:40px;height:40px">';
		$('#occasionNameField').before(bdayImg).animate({width: '35%'}).val('May 12,2013').blur().inputfit();
	}
	dateAdded = true;
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
	$(".scroll").smoothDivScroll("recalculateScrollableArea");
	$('.lists:not(.ui-droppable)').droppable({
	      activeClass: "ui-state-hover",
	      hoverClass: "ui-state-active",
	      drop: function( event, ui ) {
  			var target = this;	
	      	dragging = false;
		  	$(this).clone().next('div').animate({opacity:.25},1000);
		  	deleteImage( ui.draggable, target );
	      	barSlideUp();
	      }
	    });
}

function overlayTemplate() {
	$('.myItem, .dragItem').hoverIntent( function(){ // on hover
		var target = this;
		$('.productOverlay > img').attr('src',$(this).find('img').attr('src'));
		$('.productOverlay').css({
			top: $(target).css('top'),
			left: $(target).css('left')
		}).fadeIn(300);
	}, function() { // hover off
		$('.productOverlay').fadeOut(300);
	});

}

function addNotification() {
	var random = Math.floor( Math.random(0,1) * 6 ) + 1;
	var template;
	if(dragging) return;
	if(random == 3) {
		 template = '<div class="notificationItem"><a href="/proto/3"><img src="/img/notItem_0' + random + '.png" /></a><div style="top: 63px; left: 74px" class="dragItem notificationObj"> <img src="/img/items/1.jpg" class="flex"></div><div style="top: 63px; left: 74px" class="notificationObj"> <img src="/img/items/1.jpg" class="flex"></div><div style="top: 63px; left: 130px" class="dragItem notificationObj"> <img src="/img/items/2.jpg" class="flex"></div><div style="top: 63px; left: 130px" class="notificationObj"> <img src="/img/items/2.jpg" class="flex"></div><div style="top: 63px; left: 186px" class="dragItem notificationObj"> <img src="/img/items/3.jpg" class="flex"></div><div style="top: 63px; left: 186px" class="notificationObj"> <img src="/img/items/3.jpg" class="flex"></div><div style="top: 63px; left: 242px" class="dragItem notificationObj"> <img src="/img/items/4.jpg" class="flex"></div><div style="top: 63px; left: 242px" class="notificationObj"> <img src="/img/items/4.jpg" class="flex"></div></div>';
		 $('.notificationObj').find('.dragItem').draggable({
			start: function(event,ui) {
				barSlideUp();
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
	} else { template = '<div class="notificationItem"><img src="/img/notItem_0' + random + '.png" /></div>'; }
	$(template).hide().prependTo('.notificationArea').fadeIn(400);
	$('.notificationItem:last').slideUp(400).remove();
}

function initFeed() {
	var template;
	for( var i=8;i>=0;i--) {
		template = _.template($('#template' + i ).text(), 'null' )
		$('.scrollArea').prepend(template);
	}
	$('.listDrawer').hide().css({height :'0'});
	$('.listOpen').height('475px')
}

function addPosting() {
	var random = Math.floor( Math.random(0,1) * 6 ) + 1;
	var template;
	if(dragging) return;
	/* if(random == 3) {
		 template = '';
		 $('.notificationObj').find('.dragItem').draggable({
			start: function(event,ui) {
				barSlideUp();
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
	} else { */
	//	template = '<div class="notificationItem"><img src="/img/notItem_0' + random + '.png" /></div>'; 
		template = _.template($('#template' + random ).html() )
	//}
	//$(template).hide().prependTo('.scrollArea').fadeIn(400);
	//$('.notificationItem:last').slideUp(400).remove();
}

function animateFlowers() {
	var delta = 1;
	if(flower.x > 100 || flower.y > 700) flower.dir = 0; // backwards
	else if (flower.x < 0 || flower.y < 0) flower.dir = 1; // forwards
	else flower.dir = flower.dir;

	if(flower.dir == 1) { flower.x += delta; } //flower.y += delta }
	else if(flower.dir == 0) { flower.x -= delta; }//flower.y -= delta }
	//console.log(flower)
	$('.animated').css({
		top: flower.y
		, left: flower.x
	});
}

function listDrawerInit() {
	$('.listOpen').on('click', function(e) {
		if(!listOpen) {
			$('.listOpen').animate({
				height : '750px'
			}, 500, function() {
				listOpen = !listOpen
			});
			$('.listDrawer').show().animate({
				height: '552px'
				},500);
		} else {
			$('.listOpen').animate({
				height : '475px'
			}, 500, function() {
				listOpen = !listOpen
			});
			$('.listDrawer').animate({
				height: '0'
				},500, function() {
					$(this).hide();
				});
		}
	})
}

function itemPopup() {
	$('.myItem').hover( function() {
		$(this).find('.inner').animate({
			height:'190px'
		})
	}, function() {
		$(this).find('.inner').animate({
			height: '0px'
		})
	})

}