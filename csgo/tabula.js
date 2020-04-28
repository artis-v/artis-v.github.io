$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://artis-v.github.io/csgo/liga.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
	var i;
	for(i=0; i<21; i++){
		var split = allTextLines[i].split(',');
		switch(split[0]){
			case 'f': break;
			case 'l': break;
			case 's': break;
			case 'n': break;
		}
	}
}
