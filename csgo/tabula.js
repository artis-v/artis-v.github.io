var d = new Date();
var dt = d.getTime();

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://artis-v.github.io/csgo/liga.csv?"+dt,
        dataType: "text",
        success: function(data) {processDataTabula(data);}
     });
});

function Compare(a, b){
	if(a[1]/(a[1]+a[2]+1)!=b[1]/(b[1]+b[2]+1)){
		return (a[1]/(a[1]+a[2]+1)<b[1]/(b[1]+b[2]+1)) ? 1 : -1;
	}else if (a[3]-a[4]!=b[3]-b[4]){
		return (a[3]-a[4]<b[3]-b[4]) ? 1 : -1;
	}else if (a[5]-a[6]!=b[5]-b[6]){
		return (a[5]-a[6]<b[5]-b[6]) ? 1 : -1;
	}else return 0;
}

function processDataTabula(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
	var i;
	const zeros = (m, n) => [...Array(m)].map(e => Array(n).fill(0));
	var n = zeros(7,7);
	var teams = ['Triperis', 'Stoners', 'Kubiki', 'Iemetiens', 'Teicamnieki', 'Arbaleti', 'MVP'];
	var map = new Map();
	for(i=0; i<7; i++){
		n[i][0] = teams[i];
		map.set(teams[i],i);
	}
	// [0] = team name, [1,2] = uzvaras un zaudējumi, [3,4] = kartes, [5,6] = raundi
	for(i=0; i<21; i++){
		var split = allTextLines[i].split(',');
		if(split[0]!='f')continue;
		var indexHome = map.get(split[1]);
		var indexAway = map.get(split[3]);
		if(parseInt(split[2])>parseInt(split[4])){
			n[indexHome][1]+=1;
			n[indexAway][2]+=1;
		}else{
			n[indexHome][2]+=1;
			n[indexAway][1]+=1;
		}
		n[indexHome][3]+=parseInt(split[2]);
		n[indexAway][3]+=parseInt(split[4]);
		n[indexHome][4]+=parseInt(split[4]);
		n[indexAway][4]+=parseInt(split[2]);
		var roundsHome;
		var roundsAway;
		if(parseInt(split[2])+parseInt(split[4])==2){
			var roundsHome = parseInt(split[5])+parseInt(split[7]);
			var roundsAway = parseInt(split[6])+parseInt(split[8]);
		}else{
			var roundsHome = parseInt(split[5])+parseInt(split[7])+parseInt(split[9]);
			var roundsAway = parseInt(split[6])+parseInt(split[8])+parseInt(split[10]);
		}
		n[indexHome][5]+=roundsHome;
		n[indexAway][5]+=roundsAway;
		n[indexHome][6]+=roundsAway;
		n[indexAway][6]+=roundsHome;
	}
	// table sort
	n.sort(Compare);
	// to html
	var text = '';
	var colors = ['54,199,131', '54,199,131', '22,112,75', '22,112,75', '22,112,75', '22,112,75', '1,1,1']
	for(i=0; i<7; i++){
		text +=
			`<div class="teamstats" style="background-color:rgba(`+colors[i]+`,0.7);">
				<center>
					<p title="Tiek pusfinālā">`+(i+1)+`.</p>
					<h2>`+n[i][0]+`</h2>
					<h3><span title="Uzvarēti mači: `+n[i][1]+`, zaudēti mači: `+n[i][2]+`">`+n[i][1]+`-`+n[i][2]+`</span></h3>
					<p><span title="Uzvarētas kartes: `+n[i][3]+`, zaudētas kartes: `+n[i][4]+`">kartes `+((n[i][3]>n[i][4])?'+':'')+(n[i][3]-n[i][4])+`</span>,
					<span title="Uzvarēti raundi: `+n[i][5]+`, zaudēti raundi: `+n[i][6]+`">raundi `+((n[i][5]>n[i][6])?'+':'')+(n[i][5]-n[i][6])+`</span></p>
				</center>
			</div>`;
	}
	document.getElementById('tabula').innerHTML=text;
}
