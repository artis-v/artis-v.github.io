var name1, name2, ftsets, ftlegs, ftsftl, over = false;
var sets = [0,0], legs = [0,0], poin = [501,501], totals = [0,0], turnTotals = [0,0];
var set = 0, leg = 0;
var checkoutString = `D1
1 D1
D2
1 D2
D3
3 D2
D4
1 D4
D5
3 D4
D6
5 D4
D7
7 D4
D8
1 D8
D9
3 D8
D10
5 D8
D11
7 D8
D12
9 D8
D13
11 D8
D14
13 D8
D15
15 D8
D16
17 D8
D17
3 D16
D18
5 D16
D19
7 D16
D20
9 D16
10 D16
11 D16
12 D16
13 D16
6 D20
15 D16
16 D16
17 D16
18 D16
19 D16
20 D16
13 D20
14 D20
15 D20
16 D20
17 D20
18 D20
19 D20
20 D20
T15 D8
T10 D16
T13 D12
T16 D8
T15 D10
T14 D12
T17 D8
T20 D4
T19 D6
T18 D8
T13 D16
T16 D12
T19 D8
T14 D16
T17 D12
T20 D8
T19 D10
T18 D12
T13 D20
T16 D16
T19 D12
T14 D20
T17 D16
T20 D12
T15 D20
T18 D16
T17 D18
T16 D20
T19 D16
T18 D18
T17 D20
T20 D16
T19 D18
T18 D20
T19 D19
T20 D18
T19 D20
T20 D19
T19 10 D16
T20 D20
T17 Bull
T20 10 D16
T19 6 D20
T18 Bull
T19 16 D16
T20 6 D20
T19 Bull
T19 19 D16
T19 T12 D8
T20 Bull
T19 14 D20
T20 20 D16
T19 16 D20
T20 14 D20
T19 18 D20
T20 16 D20
T20 17 D20
T18 T16 D8
T19 T10 D16
T20 20 D20
T17 T18 D8
T18 T20 D4
T19 T14 D12
T20 T16 D8
T18 T13 D16
T19 19 Bull
T20 T17 D8
T18 T14 D16
T19 T16 D12
T20 T18 D8
T20 T13 D16
T20 T16 D12
T20 T19 D8
T20 T14 D16
T20 T17 D12
T20 T20 D8
T19 T16 D16
T20 T18 D12
T20 T13 D20
T20 T16 D16
T20 T19 D12
T20 T14 D20
T20 T17 D16
T20 T20 D12
T20 T15 D20
T20 T18 D16
T20 T17 D18
T20 T16 D20
T20 T19 D16
T20 T18 D18
T20 T17 D20
T20 T20 D16
T20 T19 D18
T20 T18 D20
T20 T15 Bull
T20 T20 D18
T20 T19 D20
T20 T16 Bull
No out shot
T20 T20 D20
T20 T17 Bull
No out shot
No out shot
T20 T18 Bull
No out shot
No out shot
T20 T19 Bull
No out shot
No out shot
T20 T20 Bull`;
let checkouts = new Map();
var turns;

function createMap() {
    var i=2;
    var lines = checkoutString.split('\n');
    for(i=2; i<=170; i++){
        checkouts.set(parseFloat(i), lines[i-2]);
    }
}

function listen() {
  return new Promise((resolve, reject) => {
    $('input').keydown(function(e) {
      if (e.keyCode == 13) {
        const inputVal = $(this).val();
        resolve(inputVal);
      }
    });
  });
};

async function display(who, turn) {
    if(poin[who-1]<=170)document.getElementById('chec'+who).innerHTML = checkouts.get(poin[who-1]);
    document.getElementById('poin'+who).style = "color:lightgreen;";
    document.getElementById('poin'+who).innerHTML = -turn;
    setTimeout(function(){
        document.getElementById('poin'+who).style = "color:lightgreen;animation:fadeOut 0.75s;";
    }, 1750);
    setTimeout(function(){
        document.getElementById('poin'+who).style = "color:white;";
        document.getElementById('poin'+who).innerHTML = poin[who-1];
    }, 2500);
}

async function legFunction() {
    turns = [];
    var who = ((set+leg)%2)+1;
    var notWho = (who==1?2:1);
    document.getElementById('circ'+who).innerHTML = '⬤';
    document.getElementById('tria'+who).innerHTML = '◀';
    document.getElementById('circ'+notWho).innerHTML = '';
    document.getElementById('tria'+notWho).innerHTML = '';
    while(true){
        var turn = await listen(); $('input').val('');
        if(turn=='u'){
            turn = turns.pop();
            [who,notWho]=[notWho,who];
            poin[who-1]+=parseFloat(turn);
            totals[who-1]-=turn;
            turnTotals[who-1]-=1;
            var aver = totals[who-1]/turnTotals[who-1];
            document.getElementById('poin'+who).innerHTML = poin[who-1];
            document.getElementById('aver'+who).innerHTML = aver.toFixed(2);
            document.getElementById('tria'+who).innerHTML = '◀';
            document.getElementById('tria'+notWho).innerHTML = '';
        }else{
            turns.push(turn);
            poin[who-1]-=turn;
            totals[who-1]+=parseFloat(turn);
            turnTotals[who-1]+=1;
            document.getElementById('aver'+who).style = "display:inline-block;";
            var aver = totals[who-1]/turnTotals[who-1];
            document.getElementById('aver'+who).innerHTML = aver.toFixed(2);
            if(poin[who-1]==0)break;
            display(who, turn);
            [who,notWho]=[notWho,who];
            document.getElementById('tria'+who).innerHTML = '◀';
            document.getElementById('tria'+notWho).innerHTML = '';
        }
    }
    legs[who-1]+=1;
    if(legs[who-1]==ftlegs){
        if(ftsets==1){
            over = true;
        }else{
            legs[who-1]=0;
            legs[notWho-1]=0;
            sets[who-1]+=1;
            if(sets[who-1]==ftsets){
                over = true;
            }else{
                document.getElementById('sets'+who).style = "color:lightgreen;";
                setTimeout(function(){
                    document.getElementById('sets'+who).style = "color:white;transition:color 0.75s;";
                }, 1750);
                setTimeout(function(){
                    document.getElementById('sets'+who).style = "color:white;";
                }, 2500);
            }
        }
    }else{
        document.getElementById('legs'+who).style = "color:lightgreen;";
        setTimeout(function(){
            document.getElementById('legs'+who).style = "color:white;transition:color 0.75s;";
        }, 1750);
        setTimeout(function(){
            document.getElementById('legs'+who).style = "color:white;";
        }, 2500);
    }
    set=sets[0]+sets[1];
    leg=legs[0]+legs[1];
    poin[0]=501;
    poin[1]=501;
    document.getElementById('sets1').innerHTML = sets[0];
    document.getElementById('sets2').innerHTML = sets[1];
    document.getElementById('legs1').innerHTML = legs[0];
    document.getElementById('legs2').innerHTML = legs[1];
    document.getElementById('poin1').innerHTML = poin[0];
    document.getElementById('poin2').innerHTML = poin[1];
    document.getElementById('chec1').innerHTML = '';
    document.getElementById('chec2').innerHTML = '';
    if(over){
        document.getElementById('tria'+who).style = "color:var(--gold);";
        document.getElementById('tria'+who).innerHTML = '🏆';
        document.getElementById('tria'+notWho).innerHTML = '';
        document.getElementById('input').style = "display:none;";
        if(ftsets==1){
            document.getElementById('legs'+who).style = "color:var(--gold);";
            setTimeout(function(){
                document.getElementById('legs'+who).style = "color:white;transition:color 0.75s;";
            }, 3750);
            setTimeout(function(){
                document.getElementById('legs'+who).style = "color:white;";
            }, 4500);
        }else{
            document.getElementById('sets'+who).style = "color:var(--gold);";
            setTimeout(function(){
                document.getElementById('sets'+who).style = "color:white;transition:color 0.75s;";
            }, 3750);
            setTimeout(function(){
                document.getElementById('sets'+who).style = "color:white;";
            }, 4500);
        }
        return;
    }
    legFunction();
}

window.onload = async function() {
    createMap();
    
    document.getElementById('low').innerHTML = 'Name of player 1:';
    name1 = await listen(); $('input').val('');
    document.getElementById('name1').innerHTML = name1;
    
    document.getElementById('low').innerHTML = 'Name of player 2:';
    name2 = await listen(); $('input').val('');
    document.getElementById('name2').innerHTML = name2;
    
    document.getElementById('low').innerHTML = 'First to sets:';
    ftsets = await listen(); $('input').val('');
    
    document.getElementById('low').innerHTML = 'First to legs:';
    ftlegs = await listen(); $('input').val('');
    
    if(ftsets==1&&ftlegs==1){
        ftsftl = 'First to 1 leg';
    }else if(ftsets==1){
        ftsftl = ['First to',ftlegs,'legs'].join(' ');
    }else if(ftlegs==1){
        ftlegs = ftsets;
        ftsets = 1;
        ftsftl = ['First to',ftlegs,'legs'].join(' ');
    }else{
        ftsftl = ['First to',ftsets,'sets, first to',ftlegs,'legs'].join(' ');
    }
    if(ftsets==1){
        document.getElementById('sets1').style = 'display:none;';
        document.getElementById('sets2').style = 'display:none;';
        document.getElementById('low').style = 'width:40vw;';
    }
    document.getElementById('low').innerHTML = ftsftl;
    legFunction();
}