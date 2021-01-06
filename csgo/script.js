var elementUpcoming = document.getElementById('upcomingDiv');
var elementResults = document.getElementById('resultsDiv');
document.getElementById('mode').onchange = function() {
    var input = document.querySelector('input[name="mode"]:checked').value;
    if(input=="upcoming"){
        elementResults.setAttribute("style", "display:none;");
        elementUpcoming.setAttribute("style", "");
    }else{
        elementUpcoming.setAttribute("style", "display:none;");
        elementResults.setAttribute("style", "");
    }
}