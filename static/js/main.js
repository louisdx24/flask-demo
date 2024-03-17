//取得主繪圖區域
const myChart = echarts.init(document.getElementById('main'));

//取得後湍資訊
drawPM25();
function drawPM25() {
    $.ajax(
        {
            url: "/pm25-data",
            type: "GET",
            dataType: "json",
            success: (result) => {
                //console.log(result);
                //繪製對應區塊並給予必要參數
                drawChart(myChart, result["datetime"], "PM2.5", result["site"], result["pm25"])
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
