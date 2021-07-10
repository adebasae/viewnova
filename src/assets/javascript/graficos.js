$(window).on('load', function () {
  //Chart Pie
  // Colores
  var color1 = '#cd0810';
  var color2 = '#e6bd02';
  var color3 = '#0f69b2';

  // Labels
  var label1 = 'Ahorro por ser socio Eroski';
  var label2 = 'Ahorro por ofertas';
  var label3 = 'Por canjeo de puntos Travel';

  // valores
  var values = [20, 30, 60];

  if (document.getElementById('pie-chart')) {
    var ctx = document.getElementById('pie-chart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [label1, label2, label3],
        datasets: [
          {
            data: values,
            backgroundColor: [color1, color2, color3],
            borderWidth: 0,
          },
        ],
      },
      plugins: [
        {
          beforeInit: function (chart, options) {
            chart.legend.afterFit = function () {
              this.height = this.height + 50;
            };
          },
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: true,
        rotation: 0.6,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        events: false,
        animation: {
          duration: 500,
          easing: 'easeOutQuart',
          onComplete: function () {
            var ctx = this.chart.ctx;
            ctx.font = Chart.helpers.fontString(
              self.fontSize,
              self.fontStyle,
              self.fontFamily,
            );
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            var sum = 0;

            this.data.datasets.forEach(function (dataset) {
              for (var i = 0; i < dataset.data.length; i++) {
                sum += dataset.data[i];
              }
              for (var i = 0; i < dataset.data.length; i++) {
                var model =
                    dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                  total = dataset._meta[Object.keys(dataset._meta)[0]].total,
                  mid_radius =
                    model.innerRadius +
                    (model.outerRadius - model.innerRadius) / 2,
                  start_angle = model.startAngle,
                  end_angle = model.endAngle,
                  mid_angle = start_angle + (end_angle - start_angle) / 2;

                var x = mid_radius * Math.cos(mid_angle);
                var y = mid_radius * Math.sin(mid_angle);

                ctx.fillStyle = '#fff';
                if (i == 3) {
                  // Darker text color for lighter background
                  ctx.fillStyle = '#444';
                }
                var NumRound = parseFloat(
                  ((dataset.data[i] / total) * 100).toFixed(1),
                );
                var percent = NumRound + '%';
                //ctx.fillText(dataset.data[i], model.x + x, model.y + y);
                // Display percent in another line, line break doesn't work for fillText
                ctx.fillText(percent, model.x + x, model.y + y + 15);
              }
            });
          },
        },
      },
    });

    document.getElementById(
      'custom-legend',
    ).innerHTML = myChart.generateLegend();

    //Chart Bar
    // Colores
    var color = '#cd0810';

    // Labels
    var meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    var sum = 0;
    var dataValues = [6, 7, 3, 4, 3, 7, 10, 5, 2, 7, 9, 3];
    for (var i = 0; i < dataValues.length; i++) {
      sum += parseInt(dataValues[i], 10);
    }

    var avg = sum / dataValues.length;

    var ctx = document.getElementById('bar-chart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: meses,
        datasets: [
          {
            data: dataValues,
            label: '€',
            backgroundColor: color,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        annotation: {
          annotations: [
            {
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: avg,
              borderColor: 'black',
              borderWidth: 3,
              label: {
                content: 'Test Label',
                enabled: false,
              },
            },
          ],
        },
        layout: {
          padding: { top: 15 },
        },
        legend: {
          display: false,
        },
        tooltips: {
          displayColors: false,
          callbacks: {
            title: function (tooltipItem, data) {
              return data['labels'][tooltipItem[0]['index']];
            },
            label: function (tooltipItem, data) {
              return (
                data['datasets'][0]['data'][tooltipItem['index']] +
                '€ de ahorro'
              );
            },
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                display: true,
              },
              gridLines: {
                display: true,
              },
              stacked: true,
            },
          ],
          xAxes: [
            {
              barPercentage: 0.5,
              stacked: true,
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    });
  }
});
