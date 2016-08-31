var settings = {
  currentRound: 0,
  simonNums: [],
  clickCounter: 0,
  active: false,
	speed: 1000,
	simonLoopCounter: 0
}

$(document).keydown(function(e) {
	if (e.which == 13) {
		if (settings.active == false && settings.currentRound == 0) {
			$('#startButton').trigger('click');
		} else if (settings.currentRound == numRounds) {
			$('#retryButton').trigger('click');
		} else if ($('#endstate').is(':visible')) {
			$('#endstate').trigger('click');
		}
	}
	if (e.which == 81) {
		$('#1').trigger('click');
		$('#1').trigger('mousedown');
	} else if (e.which == 87) {
		$('#2').trigger('click');
		$('#2').trigger('mousedown');
	} else if (e.which == 65) {
		$('#3').trigger('click');
		$('#3').trigger('mousedown');
	} else if (e.which == 83) {
		$('#4').trigger('click');
		$('#4').trigger('mousedown');
	}
});

$(document).ready(function() {
	$("#numRounds").focus(function() { $(this).select(); } );
	$('#numRounds').focus();
	
	$("#1").css("background-color", "green");
	$("#2").css("background-color", "#dc143c");
	$("#3").css("background-color", "#ffd700");
	$("#4").css("background-color", "blue");

  function animate(btnid) {
    if (btnid == "1") {
      $("#1").css("background-color", "#1aff00");
      setTimeout(function() {
        $("#1").css("background-color", "green");
      }, 200);
    } else if (btnid == "2") {
      $("#2").css("background-color", "#ff6347");
      setTimeout(function() {
        $("#2").css("background-color", "#dc143c");
      }, 200);
    } else if (btnid == "3") {
      $("#3").css("background-color", "yellow");
      setTimeout(function() {
        $("#3").css("background-color", "#ffd700");
      }, 200);
    } else if (btnid == "4") {
      $("#4").css("background-color", "#00bfff");
      setTimeout(function() {
        $("#4").css("background-color", "blue");
      }, 200);
    }
  }
	
	function simonSays() {
		var num = "";
		var possibleNums = "1234";
		//num = (Math.floor(Math.random() * numRounds) + 1);
		num += possibleNums.charAt(Math.floor(Math.random() * possibleNums.length));
		//$('#feedbackText').text("Pushing " + num + " to simonNums");
		settings.simonNums.push(num);
		function simonLoop() {
			setTimeout(function() {
				animate(settings.simonNums[settings.simonLoopCounter]);
				settings.simonLoopCounter++;
				if (settings.simonLoopCounter < settings.simonNums.length) {
					simonLoop();
				} else {
					settings.simonLoopCounter = 0;
					//$('#feedbackText').text('Listening for input!');
					listen();
				}
			}, settings.speed);
		}
		simonLoop();
	}
	
  function listen() {
    $("#1, #2, #3, #4").on('mousedown', function() {
			//$('#statusText').text('Expecting input: ' + settings.simonNums[settings.clickCounter]);
			if ((settings.clickCounter === settings.simonNums.length - 1) && this.id == settings.simonNums[settings.clickCounter]) {
				$("#1, #2, #3, #4").off('mousedown');
				settings.clickCounter = 0;
				$('#playNum').text('Right, round completed!');
				$('#startButton').trigger("click");
			} else if (this.id == settings.simonNums[settings.clickCounter] && settings.clickCounter < settings.simonNums.length - 1) {
				//$('#playNum').text('Right! Received ' + this.id + '. expected ' + settings.simonNums[settings.clickCounter]);
				settings.clickCounter++;
			} else if (this.id != settings.simonNums[settings.clickCounter]) {
				//$('#feedbackText').text('Wrong, received ' + this.id + '. Expected ' + settings.simonNums[settings.clickCounter]);
				$('#endstate').html('Fail <br> Click to dismiss');
				$('#endstate').show();
				settings.active = false;
				$('#status').hide();
				settings.clickCounter = 0;
				$("#1, #2, #3, #4").off('mousedown');
			} 
    });
  }

  $('#startButton').click(function() {
		var numRounds = $('#numRounds').val();
    $('#startButton').hide();
		$('#tutorialDiv').hide();
		$('#roundsDiv').hide();
    settings.active = true;
    settings.currentRound++;
		if (settings.simonNums.length == numRounds) {
			$("#1, #2, #3, #4").mouseup();
			settings.currentRound = 0;
			settings.simonNums = [];
			settings.clickCounter = 0;
			settings.active = false;
			settings.speed = 1000;
			settings.simonLoopCounter = 0;
			$('#status').hide();
			$('#endstate').html('Success! <br> Click to dismiss');
			$('#endstate').show();
		} else { simonSays(); }
		if (settings.currentRound == 1) {
			$('#status').show("fast");
			$('#roundCounter').text('Starting round ' + settings.currentRound);
		}
		$('#roundCounter').text('Current round: ' + settings.currentRound);
		//$('#num').text(settings.simonNums);
  });
	
	$('#retryButton').click(function() {
		settings.currentRound = 0;
		settings.simonNums = [];
		settings.clickCounter = 0;
		settings.active = false;
		settings.speed = 1000;
		settings.simonLoopCounter = 0;
		$('#retryButton').hide();
		$('#feedbackText').text('');
		$('#startButton').trigger("click");
	});

  $('#1, #2, #3, #4').click(function() {
		animate(this.id);
	});
	
	$('#endstate').click(function() {
		$('#endstate').hide();
		$('#status').hide();
		$('#roundsDiv').show();
		$('#numRounds').focus();
		settings.currentRound = 0;
		settings.simonNums = [];
		settings.clickCounter = 0;
		settings.active = false;
		settings.speed = 1000;
		settings.simonLoopCounter = 0;
		$('#retryButton').show();
	});
	
});
