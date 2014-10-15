function renderGraph(labels, values) {
    var ctx = document.getElementById("weight_chart").getContext("2d");
    var data = {
        labels: labels,
        datasets: [
            {
                label: "BiliRubin",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: values
            }
        ]
    };
    var options = {
        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,
        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",
        //Number - Width of the grid lines
        scaleGridLineWidth : 1,
        //Boolean - Whether the line is curved between points
        bezierCurve : true,
        //Number - Tension of the bezier curve between points
        bezierCurveTension : 0.4,
        //Boolean - Whether to show a dot for each point
        pointDot : true,
        //Number - Radius of each point dot in pixels
        pointDotRadius : 4,
        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth : 1,
        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius : 20,
        //Boolean - Whether to show a stroke for datasets
        datasetStroke : true,
        //Number - Pixel width of dataset stroke
        datasetStrokeWidth : 2,
        //Boolean - Whether to fill the dataset with a colour
        datasetFill : false
    };
    new Chart(ctx).Line(data, options);
}

function loadWeights() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp=new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var data = JSON.parse(xmlhttp.responseText);
            var labels = [];
            var values = [];
            for(var i in data) {
                labels.push(data[i].fields.hours);
                values.push(data[i].fields.weight);
            }
            renderGraph(labels, values);
        }
    }
    xmlhttp.open("GET","http://localhost:8000/ww1/weight-serialized",true);
    xmlhttp.send();
}
function loadWeightStatus() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp=new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var data = JSON.parse(xmlhttp.responseText);
            var html =  "<li class=\"list-group-item\"> Start weight(g): <span class=\"badge\">" + data.start_weight +"</span></li>" +
                        "<li class=\"list-group-item\"> Weight diff(g): <span class=\"badge\">" + data.total_diff +"</span></li>";
            if(data.warning) {
                document.getElementById("weight_info").innerHTML =
                    html +
                        "<li class=\"list-group-item list-group-item-danger\">Weight loss(%): <span class=\"badge\">" + data.total_percent_diff +"</span></li>";
            } else if(data.total_percent_diff < 0) {
                document.getElementById("weight_info").innerHTML =
                    html +
                        "<li class=\"list-group-item list-group-item-warning\"> Weight loss(%): <span class=\"badge\">" + data.total_percent_diff +"</span></li>";
            } else {
                document.getElementById("weight_info").innerHTML =
                    html +
                    "<li class=\"list-group-item list-group-item-success\"> Weight loss(%): <span class=\"badge\">" + data.total_percent_diff +"</span></li>";
            }
        }
    }
    xmlhttp.open("GET","http://localhost:8000/ww1/weight-status-serialized",true);
    xmlhttp.send();
}

loadWeights();
loadWeightStatus();