var statsInfos = {
    //SQL arguments for the stats with a display text, a display code and a description

    "kills": {
        "disp": "K",
        "disp_code": "0",
        "desc": "Number of kills"
    },
    "deaths": {
        "disp": "D",
        "disp_code": "0",
        "desc": "Number of deaths"
    },
    "assists": {
        "disp": "A",
        "disp_code": "0",
        "desc": "Number of assists"
    },
    "mvp": {
        "disp": "MVP",
        "disp_code": "1",
        "desc": "Number of MVP"
    },
    "headshot_kills": {
        "disp": "HS",
        "disp_code": "1",
        "desc": "Number of headshots"
    },
    "v1": {
        "disp": "V1",
        "disp_code": "1",
        "desc": "Number of V1"
    },
    "v2": {
        "disp": "V2",
        "disp_code": "1",
        "desc": "Number of V2"
    },
    "v3": {
        "disp": "V3",
        "disp_code": "1",
        "desc": "Number of V3"
    },
    "v4": {
        "disp": "V4",
        "disp_code": "1",
        "desc": "Number of V4"
    }
}

function newElement(type="p",content=undefined,cssClass=undefined,parent=document.body,child=undefined){
    //Function to fastly create HTML elements

    var element = document.createElement(type);
    if(content) element.innerHTML = content;
    if(typeof cssClass == "string") element.classList.add(cssClass);
    else if(typeof cssClass == "object"){
        cssClass.forEach(i => {
            element.classList.add(i);
        })
    }
    parent.appendChild(element);
    if(child) element.appendChild(child);
    return element;
}

function getClock(start,end) {
    //Generate the clock
    
    var startDate = new Date(start.substr(0,start.length-5));
    if(end) var endDate = new Date(end.substr(0,end.length-5));
    else endDate = new Date();
    var minutes = ((endDate-startDate)/1000/60).toFixed(0);

    return minutes;
}

function getUrlVars() {
    //Get the url parameters (http://exemple.com?id=1?name="a")

    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


async function getMatchStats(matchid){
    //Fetch the match stats with the matchid from the db and display it

    var response = await fetch("/api_match?matchid="+matchid);
    var data = await response.json();
    if(!data.error && data.length > 0){
        generateScoreTable(data);
        return data;
    }
    else{
        document.write("Error\n");
    }
}

async function getPlayerStats(matchid,matchData){
    //Fetch the players stats from the db and display it

    var response = await fetch("/api_players?matchid="+matchid);
    var data = await response.json();
    if(!data.error && data.length > 0){
        newElement("h2",matchData[0].team1_name);
        generateStatsTable(data,"team1");
        newElement("h2",matchData[0].team2_name);
        generateStatsTable(data,"team2");
    }
    else{
        document.write("Error\n");
    }
}

function generateScoreTable(data){
    //Generate a table with the team names and their scores

    var table = newElement(type="table",undefined,"score");
    var row = newElement("tr",undefined,undefined,table);
    newElement("td",data[0].team1_name,"score",row);
    newElement("td",data[0].team1_score,"score",row);
    newElement("td","-","score",row);
    newElement("td",data[0].team2_score,"score",row);
    newElement("td",data[0].team2_name,"score",row);

    var row = newElement("tr",undefined,undefined,table);
    var clock = newElement("td",getClock(data[0].start_time,data[0].end_time)+"''","score",row);
    clock.colSpan = "5";

    return table;
}

function generateStatsTable(data,team){
    //Generate a table with the player stats from the specified team

    var table = newElement("table",undefined,"playerstats");
    var keys = Object.keys(data[0])
    var row = newElement("tr",undefined,undefined,table);
    newElement("td",undefined,undefined,row);

    //Add table titles and descriptions
    Object.keys(statsInfos).forEach(i => {
        var cell = newElement("th",undefined,"display-"+statsInfos[i].disp_code,row);
        newElement("abbr",statsInfos[i].disp,undefined,cell).title = statsInfos[i].desc;
    });

    //Add players stats in the table
    data.forEach(element => {
        if(element.team == team){
            var row = newElement("tr",undefined,undefined,table);
            newElement("td",element.name,"playername",row);
            keys.forEach(i => {
                if(Object.keys(statsInfos).includes(i)){
                    newElement("td",element[i],["stat","display-"+statsInfos[i].disp_code],row);
                }
            });
        }
    });

    return table;
}

var matchid = getUrlVars()["matchid"];

getMatchStats(matchid).then(data => {
    getPlayerStats(matchid,data);
});