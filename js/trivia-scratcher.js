
$("document").ready(function() {
	
    $("#btn-save-score").on("click",saveTheScore);
    
    var startTimerCount = $(".typer").attr('data-words').length * 50;
    console.log(startTimerCount );

           
    setTimeout(function() {
         $('#scratcher1').show('slow');
    }, startTimerCount); 
     setTimeout(function() {
         $('#scratcher2').show('slow');
    }, startTimerCount + 1000); 
     setTimeout(function() {
         $('#scratcher3').show('slow');
    }, startTimerCount + 2000); 
     setTimeout(function() {
         $('#scratcher4').show('slow');
    }, startTimerCount + 3000); 
    
    //Start timer after answer boxes are displayed
     setTimeout(function() {
        //Call countdown on page load
        setDate();;
    }, startTimerCount); 
    
});

function saveTheScore() {
	
	$('#score').val($('h1').text());
	$('#number').val(28);

	// Need a solution/process for Question Number
}


//set time variable
var s = 60; //sec
var ms = 10; //millieseconds
var i = 1; //index conter
var zeroms = "0";
var showms = ms; 
var isTimeout = false; 




function setDate(){

    is_int(i);
    isZero(ms);

    //dsiplay coutdown
    if (ms == 0 || ms == 10){
        showms = zeroms;
    }
    else {
       showms = ms;         
    }
    
    document.getElementById("timer").innerHTML = Math.floor(s) + "." + showms ;

    t = setTimeout(setDate,10);
    
    if (s == 0 && ms == 0){
        stopDate();
    }
}

function is_int(value){
    if((parseFloat(value/100) == parseInt(value/100)) && !isNaN(value)){
        i++;
        s-= 1;
    } else {
        i++;
    }
};

function isZero(value){
    if(value == 0){
        ms = 10;
    }
    else{
        ms -= 1;
    }
};

//Stop countdonw
function stopDate(){
    isTimeout = true;
    clearTimeout(t);
}

/* Old Code
	var score = $("h1").text();

    $.ajax({
		url: "http://localhost/davidqtrivia/ShowData.php",
        method: "POST",        
        data: "score=" + score + "&number=26",
        success: function(data, status){
           alert("got it " + data + " and staus = " + status);
        },
        error: function(errMsg) {
            //your error function
        }
    });
 */	
