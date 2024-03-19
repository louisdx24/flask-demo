//取得主繪圖區域
const chart1 = echarts.init(document.getElementById('main'));
const chart2 = echarts.init(document.getElementById('six'));
const chart3 = echarts.init(document.getElementById('county'));


$("#update").click(() => {
    drawPM25();
});

$("#select_county").change(() => {
    county = $("#select_county").val();
    drawCountyPM25(county);
});

//呼叫後端資料跟繪製
drawPM25();

function drawCountyPM25(county) {
    chart3.showLoading();
    $.ajax(
        {
            url: `/county-pm25-data/${county}`,
            type: "GET",
            dataType: "json",
            success: (result) => {
                drawChart(chart3, county, "PM2.5", result["site"], result["pm25"])
                chart3.hideLoading();
            },
            error: () => {
                alert("讀取資料失敗,請稍後再試!");
                chart3.hideLoading();
            }
        }
    )
}



function drawSixPM25() {
    chart2.showLoading();
    $.ajax(
        {
            url: "/six-pm25-data",
            type: "GET",
            dataType: "json",
            success: (result) => {
                //console.log(result);
                //繪製對應區塊並給予必要參數
                //html script src= jquery
                drawChart(chart2, "六都PM2.5平均值", "PM2.5", result["site"], result["pm25"])
                chart2.hideLoading();
            },
            error: () => {
                alert("讀取資料失敗,請稍後再試!");
                chart2.hideLoading();
            }
        }
    )
}


//取得後湍資訊
function drawPM25() {
    chart1.showLoading();
    $.ajax(
        {
            url: "/pm25-data",
            type: "GET",
            dataType: "json",
            success: (result) => {
                //console.log(result);
                //繪製對應區塊並給予必要參數
                //html script src= jquery
                $("#pm25_high_site").text(result["highest"]["site"])
                $("#pm25_high_value").text(result["highest"]["value"])
                $("#pm25_low_site").text(result["lowest"]["site"])
                $("#pm25_low_value").text(result["lowest"]["value"])
                // document.querySelector("#pm25_high_site").innerText = result["highest"]["site"];
                // document.querySelector("#pm25_high_value").innerText = result["highest"]["pm25"];
                // document.querySelector("#pm25_low_site").innerText = result["lowest"]["site"];
                // document.querySelector("#pm25_low_value").innerText = result["lowest"]["pm25"];
                drawChart(chart1, result["datetime"], "PM2.5", result["site"], result["pm25"])
                chart1.hideLoading();
                this.setTimeout(() => {
                    // 繪製六都平均值
                    drawSixPM25();
                    drawCountyPM25("彰化縣");
                }, 1000);
                //2:13:53
            },
            error: () => {
                alert("讀取資料失敗,請稍後再試!");
                chart1.hideLoading();
            }
        }
    )
}

function drawChart(chart, title, legend, xData, yData) {
    let option = {
        title: {
            text: title
        },
        tooltip: {},
        legend: {
            data: [legend]
        },
        xAxis: {
            data:
                xData
        },
        yAxis: {},
        series: [
            {
                name: legend,
                type: 'bar',
                data: yData
            }
        ]
    };

    chart.setOption(option);
}
