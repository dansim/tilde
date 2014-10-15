setInterval(
    function() {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp=new XMLHttpRequest();
        }
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                var data = JSON.parse(xmlhttp.responseText);
                document.getElementById("time_left").innerHTML = data.time_left;
                if(data.alert) {
                    document.getElementById("alert_box").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><strong>Time for the bilarubin check!</strong></div>";
                }
            }
        }
        xmlhttp.open("GET","http://localhost:8000/ww1/alert-polling",true);
        xmlhttp.send();
    }
    , 1000);

/***
 *
 ***/

function loadGraphData() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp=new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var data = JSON.parse(xmlhttp.responseText);
            var labels = [];
            var values = [];
            var ljusb =  [];
            var blodb = [];
            for(var i in data) {
                labels.push(data[i].fields.hours);
                values.push(data[i].fields.mol);
                ljusb.push(300);
                blodb.push(380);
            }

            renderGraph(
                labels,
                values,
                ljusb,
                blodb

            )
        }
    }
    xmlhttp.open("GET","http://localhost:8000/ww1/load-chart-data/",true);
    xmlhttp.send();
}

function renderGraph(labels, values, ljusb, blodb) {
    var ctx = document.getElementById("myChart").getContext("2d");
    var data = {
        labels: labels,
        datasets: [
            {
                label: "BLODB",
                fillColor: "rgba(217, 83, 79,0.2)",
                strokeColor: "rgba(217, 83, 79,1)",
                pointColor: "rgba(217, 83, 79,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: blodb
            },
            {
                label: "LJUSB",
                fillColor: "rgba(240,173,78,0.2)",
                strokeColor: "rgba(240,173,78,1)",
                pointColor: "rgba(240,173,78,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: ljusb
            },
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

function loadTrendData() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp=new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var data = JSON.parse(xmlhttp.responseText);
            document.getElementById("avg").innerHTML = data.total_average_value;
            document.getElementById("lv").innerHTML = data.latest_value;
            document.getElementById("l24avg").innerHTML = data.latest_24h_average_value;
        }
    }
    xmlhttp.open("GET","http://localhost:8000/ww1/bilirubin-trends",true);
    xmlhttp.send();
}

/** bootstrap **/
loadGraphData();
loadTrendData();


