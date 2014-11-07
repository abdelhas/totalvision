		var creditsOpen;
    		var aboutOpen;
    		$( "#creditsTrigger" ).click(function() {
    			if(aboutOpen == true){
    				$('#about').fadeOut(1000);
    				aboutOpen = false;
    				}
			console.log('Clicked')
    			$('#credits').fadeIn(1000);

    			creditsOpen = true;
    		});
    		$( "#creditsClose" ).click(function() {
    			$('#credits').fadeOut(1000);
    			creditsOpen = false;
    			} );
		$( "#credits" ).click(function() {
                        $('#credits').fadeOut(1000);
                        creditsOpen = false;
                        } );
    		$( "#aboutTrigger" ).click(function() {
    			if(creditsOpen == true) {
    				$('#credits').fadeOut(1000); 
    				creditsOpen = false;
    			}
    			$('#about').fadeIn(1000);
    			aboutOpen = true;
    		});
    		$( ".aboutClose" ).click(function() {$('#about').fadeOut(1000); aboutOpen = false});
