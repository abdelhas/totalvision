		var creditsOpen;
    		var aboutOpen;
    		$( "#creditsTrigger" ).click(function() {
    			if(aboutOpen == true){
    				$('#about').fadeOut(250);
    				aboutOpen = false;
    				}
    			$('#credits').fadeIn(250);

    			creditsOpen = true;
    		});
    		$( "#creditsClose" ).click(function() {
    			$('#credits').fadeOut(250);
    			creditsOpen = false;
    			} );
		$( "#credits" ).click(function() {
                        $('#credits').fadeOut(250);
                        creditsOpen = false;
                        } );
    		$( "#aboutTrigger" ).click(function() {
    			if(creditsOpen == true) {
    				$('#credits').fadeOut(250); 
    				creditsOpen = false;
    			}
    			$('#about').fadeIn(250);
    			aboutOpen = true;
    		});
    		$( ".aboutClose" ).click(function() {$('#about').fadeOut(250); aboutOpen = false});
