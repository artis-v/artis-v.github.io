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
	var text = '';
	var i;
	for(i=0; i<allTextLines.length; i++){
		var split = allTextLines[i].split(',');
		switch(split[0]){
			case 'f':
				if(parseInt(split[2])+parseInt(split[4])==2){
					text+=`
						<div class="teamstats" style="background-color:rgba(54,199,131,0.7);">
							<center>
								<h2 style="margin-bottom:0px">`+split[1]+`</h2>
								<h3>`+split[2]+`-`+split[4]+`</h3>
								<h2>`+split[3]+`</h2>
								<h3>(`+split[5]+`-`+split[6]+`, `+split[7]+`-`+split[8]+`)</h3>
								<p><a href=`+split[10]+` class="link">`+split[9]+`</a></p>
							</center>
						</div>`
				}else{
					text+=`
						<div class="teamstats" style="background-color:rgba(54,199,131,0.7);">
							<center>
								<h2 style="margin-bottom:0px">`+split[1]+`</h2>
								<h3>`+split[2]+`-`+split[4]+`</h3>
								<h2>`+split[3]+`</h2>
								<h3>(`+split[5]+`-`+split[6]+`, `+split[7]+`-`+split[8]+`, `+split[9]+`-`+split[10]+`)</h3>
								<p><a href=`+split[12]+` class="link">`+split[11]+`</a></p>
							</center>
						</div>`
				}
				break;
			case 'l':
				text+=`
					<div class="teamstats" style="background-color:rgba(255,127,80,0.7);">
						<center>
							<h2 style="margin-bottom:0px">`+split[1]+`</h2>
							<h3>v</h3>
							<h2>`+split[2]+`</h2>
							<h3>LIVE</h3>
							<p><a href=`+split[4]+` class="link">`+split[3]+`</a></p>
						</center>
					</div>
				`
				break;
			case 's':
				text+=`
					<div class="teamstats" style="background-color:rgba(22,112,75,0.7);">
						<center>
							<h2 style="margin-bottom:0px">`+split[1]+`</h2>
							<h3>v</h3>
							<h2>`+split[2]+`</h2>
							<h3>`+split[3]+`</h3>
							<p>`+split[4]+`</p>
						</center>
					</div>
				`
				break;
			
			case 'n':
				text+=`
					<div class="teamstats" style="background-color:rgba(1,1,1,0.7);">
						<center>
							<h2 style="margin-bottom:0px">`+split[1]+`</h2>
							<h3>v</h3>
							<h2>`+split[2]+`</h2>
							<h3>`+split[3]+`</h3>
							<p>`+split[4]+`</p>
						</center>
					</div>
				`
				break;
				
		}
	}
	document.getElementById('liga').innerHTML=text;
}
