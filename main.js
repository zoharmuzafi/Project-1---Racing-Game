var players = [];
var step = 150;

//player object
var Player = function(name, img){

	this.name = name;
	this.img = img;
	this.end_time = 0;
	this.complete = false;
	this.game_time = 0;
	this.distance = 0;

};

$(document).ready(function(){

//checking JS 
console.log("JS is ready");


//set the data from the form to the players
$("#formButton").on("click", function(event){
	event.preventDefault();
	var i=0;
	var player_name = "";
	var player_img = "";
	var temp_player = {};

	
//initiate 2 players
	if(players.length < 2){

		player_name = $("#name").val();
		player_img = $("input:radio[name=inlineRadioOptions]").val();
		if(player_img === "option1"){
			player_img = "http://static1.squarespace.com/static/514c8e20e4b0796ef46291e8/t/514cb9b0e4b0d2e6d865cd06/1363982769415/Character1AnimatedGIF.gif";
		}
		else if(player_img === "option2"){
			player_img = "https://mir-s3-cdn-cf.behance.net/project_modules/disp/38094514467305.562846759b654.gif";
		}
		else{
			player_img = "http://media.kalio.net/blog/ringrun/ringrun-nina-side-animation.gif";
		}

		temp_player = new Player(player_name, player_img);
		players.push(temp_player);
		$("#name").val("");
		$("#nameLabel").replaceWith("<label for='name' id='nameLabel'>Name (Player 2)</label>");
		
	}

//directing to the race
	if(players.length===2){
		$("#lane1").append("<img id='racer1' src=" + players[0].img + ">");
		$("#lane2").append("<img id='racer2' src=" + players[1].img + ">");
		initiateGame();
		$("#racingPage").css("display", "block");
		$("#formPage").css("display", "none");
	}
});

//initiate the game
	function initiateGame(){


		$("#racer1").css("margin-left", "0");
		$("#racer2").css("margin-left", "0");
		$("#winnerDiv").remove();
		players[0].end_time = 0;
		players[1].end_time = 0;
		players[0].complete = false;
		players[1].complete = false;
		players[0].distance = 0;
		players[1].distance = 0;
		race();
	}


	function race(){

		$(document).keydown(function(e){
		
			switch(e.which){

			case 39: //right key

				if(players[0].distance < 1100){

				//moving the element to the right
				$("#racer1").animate({"margin-left":"+=10px"}, 100, function(){
					players[0].distance+=10;	
					if(players[0].distance === 1100){
						$("#racer1").stop(true, true);
						players[0].end_time = Date.now();
						players[0].complete = true;
						console.log(players[0].end_time);
						winner();

					}
				});	
				}		
			
			break;

			// case 37: //left key	

			// 	if(players[0].end_time ===0){
			// 		//moving the element to the left
			// 		$("#racer1").animate({"marginLeft":"0px"}, 10000);	
			// 	}
			// break;

			case 70: //F key

				if(players[1].distance < 1100){

					//moving the element to the right
					$("#racer2").animate({"margin-left":"+=10px"}, 100, function(){
						players[1].distance+=10;

						if(players[1].distance === 1100){
							$("#racer2").stop(true, true);
							players[1].end_time = Date.now();
							players[1].complete = true;
							console.log(players[1].end_time);
							winner();
					}
					});
				}
			break;

			// case 83: //S key
			// if(players[1].end_time === 0){

			// 	//moving the element to the left
			// 	$("#racer2").animate({"marginLeft":"0px"}, 10000);	
			// }
			// break;

			default: return;
		}

	});


//checking who is the winner once both player complete the game + initiate the game
function winner(){

	var game_winner="";
	var appended = "";

	if((players[0].complete ===true) && (players[1].complete===true)){
		
		if(players[0].end_time === players[1].end_time){
			game_winner = "tie";
			//$("#racer1, #racer2").finish();
		}
		else if(players[0].end_time < players[1].end_time){
			game_winner = "player-1";
			//$("#racer1, #racer2").finish();
		}
		else{
			game_winner = "player-2";
			//$("#racer1, #racer2").finish();
			
		}
	
	appended = "<div id='winnerDiv'><p>the winner is:" + game_winner + "</p></div>";
	$("body").append(appended);
	alert("The winner is" + game_winner + "Do you want to start a new game?");
	initiateGame();

	}

	else{
		return;
	}
}
}

});
