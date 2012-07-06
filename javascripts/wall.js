jQuery(document).ready(function($) {	
	var screenHeight; var screenWidth; var facesHeight; var facesWidth; var msg1; var msg2; var speed;

	msg1 = 'Just Registered'; // New Profile
	msg2 = 'Welcome Back';		// Existing Profile
	speed = 5000;							// Animation Speed
	
	PUBNUB.subscribe({
  	channel:"facepalm",
    restore:false,
    callback:function (message) {
    	console.log(message);			
    	if($('#faces li').hasClass(message.uuid)){
    		$('#faces li.'+message.uuid).find('.mini-message').text(msg2).fadeIn().delay(speed).fadeOut();
    		// Pulse Glow
    		/*setInterval(function(){
    			$('#faces li.'+message.uuid).toggleClass('highlight');
    		}, 1000);*/
    		$('#faces li.'+message.uuid).addClass('highlight');
    		setTimeout(function(){
    			$('#faces li.'+message.uuid).removeClass('highlight');
    		},speed);
    	} else {
				$("#faces").append(
					$(".face:first").clone().html(function(){
						$(this).addClass(message.uuid);
						if(message.photo_url){
							$(this).find('.avatar').append('<span class="picture"><img src="' + message.photo_url + '"/></span>');
						} else {
							$(this).find('.avatar').append('<span class="janrain-icon-64 janrain-icon-person"></span>');
						};
						if(message.name){
							$(this).find('.profile').append('<span class="name">'+message.name+'</span>');
						};
						$(this).find('.mini-message').text(msg1).delay(speed).fadeOut();
					}).removeClass('hide').fadeIn('slow')
				);						
				facewall();
			}
    }
  });

	
	// Gets the current dimensions of the window
	function screenSize(){
		screenHeight = $(window).innerHeight();
		screenWidth = $(window).innerWidth();
		return;
	};
	
	// Gets the current dimensions of the face wall
	function facesSize(){
		facesHeight = $('#faces').height();
		facesWidth = $('#faces').width();
		return;
	};
	
	function facewall(){
		xA = screenHeight;
		xB = facesHeight;
		yA = screenWidth;
		yB = facesWidth;
		f = $('#faces li').width();
		screenSize();
		facesSize();
		if(xA < xB) {
			resize = f-((xB - xA)/xA);
			resizeMargin = 5-(5/resize);
			$('#faces li').each(function(index){
				$(this).width(resize);
				$(this).height(resize);
				$(this).css('margin',resizeMargin);
			});	
			console.log('too big'+resizeMargin);
		};
	};
 });
var fsButton = document.getElementById('fullscreen'), fsElement = document.getElementById('wall')
if (window.fullScreenApi.supportsFullScreen) {
	
	// handle button click
	fsButton.addEventListener('click', function() {
		window.fullScreenApi.requestFullScreen(fsElement);
	}, true);
	
	fsElement.addEventListener(fullScreenApi.fullScreenEventName, function() {		
	}, true);
	
} else {
	alert('SORRY: Your browser does not support FullScreen');
}
