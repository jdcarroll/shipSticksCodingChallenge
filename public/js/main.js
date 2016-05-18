// When Jquery loads start the logic
$(document).ready(function(){

	// Get the modal
	var modal = document.getElementById('myModal');
	// assign variable to packageContainer ID
	var mainMessage = $('#packageContainer');
	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");
	// Create counter to prevent ajax load happining more than once
	var counter = 0;
	// When the user clicks on the button, open the modal 
	btn.onclick = function() {
		// change style property to block and enable th view of the modal
	    modal.style.display = "block";
	    // check if /open has been hit or run before
	    if(counter == 0){
	    	// if it hasn't get all baggage types to populate the select element
	    	$.get('/open', function(data){
	    		// loop through each item returned 
		    	data.forEach(function(optionElement){
		    		// append each option to a option element
		    		$('select').append('<option value='+ optionElement +'>'+ optionElement +'</option>');
		    	})
		    })
		    // change to counter value to prevent running a second time
		    counter = 1;
	    }
	    // reset form values to enable user to continue to use tool without refresh
	    $('#calculatorForm')[0].reset();
	    // hide the flash message element to give a clean template for user 
	    $('#flash').hide();
	}
	// the execution function to the db
	$("#calculate").click(function(){
		//specific values
		var select = $('select').val(); // value of select option
		var length = $('#length').val(); // value of length property
		var height = $('#height').val(); // value of height property
		var width = $('#width').val(); // value of width property
		var weight = $('#weight').val(); // value of weight property
		// create objedct to send over to the server for precessing
		data = {
			type : select, // value of select option 
			length : length, // value of length property
			height : height, // value of height property
			width : width, // value of width property
			weight : weight, // value of weight property
		}
		// send the data object to the /calculate route
	    $.post('/calculate', data, function(response){
	    	// create empty message variable
	    	var message = '';
	    	// if the server came back with nothing then assign value to message
	    	if(response.length === 0){
	    		message = 'There is not a product that matches that size.'
	    	// if the user did not select an option from the select input
	    	}else if(select === 'blank'){
	    		message = 'Please make sure that you enter a package type.'
	    	// if the the request went through properly
	    	}else{
	    		message = 'Use This ' + response[0].name
	    	}
	    	// add fade effect to modal flash message
	    	$('#flash').fadeIn();
	    	// add message to the flash element
	    	$('#flash > h3').html(message);
	    	// set time out function for modal to go away
	    	setTimeout(function(){
	    		// slide modal back up
	    		$('#myModal').slideUp();
	    		// add fade in effect to flash message
	    		mainMessage.fadeIn();
	    		// add message to the main page flash message
	    		$('#packageContainer > h3').html(message);
	    		// show actual flash message container
	    		$('#packageContainer').show();
	    	}, 5000)
	    	setTimeout(function(){
	    		// finally hid ethe container providing the user with the ablity to start over
	    		$('#packageContainer').hide();
	    		// set to 8 seconds so that the modal can go up and you can still see the main message
	    	}, 8000)
	    	
	    })
	})


});
