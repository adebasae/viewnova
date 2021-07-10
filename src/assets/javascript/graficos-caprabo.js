//Chart Pie
// Colores
var color1 = '#36b4e3';
var color2 = '#e6bd02';

// Labels
var label1 = 'Ahorro por ser socio Caprabo';
var label2 = 'Ahorro por ofertas';

// valores
var values = [60, 30];

var ctx = document.getElementById('pie-chart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: [label1, label2],
    datasets: [
      {
        data: values,
        backgroundColor: [color1, color2],
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
    maintainAspectRatio: false,
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

        this.data.datasets.forEach(function (dataset) {
          for (var i = 0; i < dataset.data.length; i++) {
            var model =
                dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
              total = dataset._meta[Object.keys(dataset._meta)[0]].total,
              mid_radius =
                model.innerRadius + (model.outerRadius - model.innerRadius) / 2,
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
            var percent =
              String(Math.round((dataset.data[i] / total) * 100)) + '%';
            //ctx.fillText(dataset.data[i], model.x + x, model.y + y);
            // Display percent in another line, line break doesn't work for fillText
            ctx.fillText(percent, model.x + x, model.y + y + 15);
          }
        });
      },
    },
  },
});

document.getElementById('custom-legend').innerHTML = myChart.generateLegend();

//Chart Bar
// Colores
var color = '#36b4e3';

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

var ctx = document.getElementById('bar-chart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: meses,
    datasets: [
      {
        label: 'Ahorro por ser socio Eroski',
        data: [6, 7, 3, 4, 3, 7, 10, 5, 2, 7, 9, 3],
        backgroundColor: color,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 15 },
    },
    legend: {
      display: false,
    },
    tooltips: {
      //"enabled": false
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
          barPercentage: 0.8,
          stacked: true,
          gridLines: {
            display: false,
          },
        },
      ],
    },
  },
});
