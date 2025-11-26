google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    drawChart1();
    drawChart2();
}

function drawChart1() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Aluguel',     780],
        ['Utilidades',  425],
        ['Mercado',  582],
        ['Transporte', 788],
        ['Entrenimento', 411],
        ['Outros', 194],
    ]);

    var options = {
        title: 'Gastos Mensais',
        pieHole: 0.5,
        backgroundColor: 'transparent',
        legend: { textStyle: { color: '#333', fontSize: 14 }, position: 'right' },
        titleTextStyle: { color: '#333', fontSize: 22 },
        pieSliceTextStyle: { color: '#333', fontSize: 16, bold: true },
        pieSliceText: 'percentage',
        chartArea: { left: 20, top: 40, width: '90%', height: '75%' },
        
    };

    var chart = new google.visualization.PieChart(document.getElementById('donut_chart'));
    chart.draw(data, options);
}

async function drawChart2() {
    var options = {
        title: 'Ganhos Mensais',
        backgroundColor: 'transparent',
        legend: { textStyle: { color: '#333', fontSize: 14 }, position: 'bottom' },
        titleTextStyle: { color: '#333', fontSize: 22 },
        width: 900,
        height: 600,
        ColumnChart: { color: '#333', fontSize: 16, bold: true },
        vAxis: { title: 'Renda (R$)', titleTextStyle: { color: '#333', fontSize: 16 } },
        hAxis: { title: 'Fonte', titleTextStyle: { color: '#333', fontSize: 16 } },

        
    };

    const response = await fetch('http://localhost:3000/home/main');
    const jsonData = await response.json();
    console.log(jsonData);
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Fonte');
    data.addColumn('number', 'Renda');
    jsonData.forEach(item => {
        data.addRow([String(item.bill_name), parseFloat(item.bill_value)]);
    });

    var chart = new google.visualization.ColumnChart(document.getElementById('line_chart'));
    chart.draw(data, options);
}