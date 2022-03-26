$(document).ready(function() {

  class Simon{
    constructor(){
      this.level = 0;
      this.index = 0;
      this.gamePattern = [];
      this.buttonColours = ["red", "blue", "green", "yellow"];
    }
    CurrentButtonNumber(){
      return this.gamePattern[this.index];
    }
    addSequence(){
      var randomNumber = Math.floor(Math.random() * 4);
      this.gamePattern.push(randomNumber);
      console.log(this.gamePattern);
      this.level++;
      this.index = 0;
      this.playSound(randomNumber);
      this.flash(randomNumber);
      $("#level-title").text("Level " + this.level);
      return randomNumber;
    }
    reset(){
      this.level = 0;
      this.index = 0;
      this.gamePattern = [];
    }
    start(){
      this.reset();
      this.addSequence();
    }
    playSound(n){
      new Audio("sounds/" + this.buttonColours[n] + ".mp3").play();
    }
    flash(n){
      $("#" + this.buttonColours[n]).animate({opacity: 0}, 200).animate({opacity: 1}, 200);
    }
  }

  let simon = new Simon();

  $(".btn").click(function() {

    var buttonId = $(this).attr("id");
    var buttonIndex = simon.buttonColours.indexOf(buttonId);
    console.log(buttonIndex);

    $(this).addClass("pressed");
    setTimeout(function() {$("#" + buttonId).removeClass("pressed");}, 250);


    if (buttonIndex === simon.CurrentButtonNumber()) {
      simon.playSound(buttonIndex);
      simon.index++;
    } else {
      //Game Over
      $("body").addClass("game-over");
      new Audio("sounds/wrong.mp3").play();
      setTimeout(function() {simon.reset();$("body").removeClass("game-over");}, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
    }

    if (simon.index == simon.level) {
      setTimeout(function() {simon.addSequence();}, 1000);
    }

  });

  $(document).keyup(function(e) {
      if(simon.level === 0)
        simon.start();
  });

});
