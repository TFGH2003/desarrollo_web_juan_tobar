let estadisticas_atras=document.getElementById("portada_stats")

estadisticas_atras.addEventListener("click",function() {
    window.location.href = "/";
});

async function obtenerDatosActividades() {
    console.log("2")
    try {
        const response = await fetch('/agregar_actividad_info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error al obtener actividades:', error);
        return null;
    }
} 

function procesarDatosActividades(responseData) {
    console.log("3")
    if (!responseData || !responseData.data) return [];
    const conteoPorFecha = {};
    responseData.data.forEach(item => {
        const fecha = new Date(item.dia_hora_inicio).toISOString().split('T')[0];
        conteoPorFecha[fecha] = (conteoPorFecha[fecha] || 0) + 1;
    });
    return Object.entries(conteoPorFecha).map(([fecha, count]) => {
        return [new Date(fecha).getTime(), count];
    });
}

function procesarDatosActividadesTorta(responseData) {
  console.log("torta");
    if (!responseData || !responseData.data) return [];
    const conteoPorTema = {};
    responseData.data.forEach(item => {
        const tema = item.tema_nombre;
        conteoPorTema[tema] = (conteoPorTema[tema] || 0) + 1;
    });
    return Object.entries(conteoPorTema).map(([tema, count]) => {
        return { name: tema, y: count };
    });
}

function procesarDatosActividadesBarras(responseData) {
  if (!responseData || !responseData.data) return { categories: [], series: [] }
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const resultados = {};
    responseData.data.forEach(item => {
        if (!item.dia_hora_inicio) return;
        const fecha = new Date(item.dia_hora_inicio);
        const mes = fecha.getMonth();
        const hora = fecha.getHours();
        let horario;
        if (hora >= 6 && hora < 12) horario = 'Mañana';
        else if (hora >= 12 && hora < 19) horario = 'Tarde';
        else horario = 'Noche';
        if (!resultados[mes]) {
            resultados[mes] = { Mañana: 0, Tarde: 0, Noche: 0 };
        }
        resultados[mes][horario]++;
    });
    const categories = [];
    const series = [
        { name: 'Mañana', data: [] },
        { name: 'Tarde', data: [] },
        { name: 'Noche', data: [] }
    ];
    Object.keys(resultados).sort().forEach(mes => {
        categories.push(meses[mes]);
        series[0].data.push(resultados[mes].Mañana);
        series[1].data.push(resultados[mes].Tarde);
        series[2].data.push(resultados[mes].Noche);
    })
    return { categories, series };
}
  
  async function crearGrafico() {
    console.log("1")
    try {
      const datos = await obtenerDatosActividades();
      const datosProcesados = procesarDatosActividades(datos);
      Highcharts.chart('container', {
        chart: {
          type: 'line'
        },
        title: {
          text: 'Cantidad de actividades (últimos 30 días)'
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Fecha'
          }
        },
        yAxis: {
          title: {
            text: 'Actividades'
          }
        },
        tooltip: {
          xDateFormat: '%d/%m/%Y',
          shared: true
        },
        series: [{
          name: 'Linea de actividades',
          data: datosProcesados,
          color: '#FF9900'
        }],
        legend: {
          enabled: true
        },
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        }
      });
    } catch (error) {
      console.error('Error al crear el gráfico:', error);
      document.getElementById('container').innerHTML = '<p style="color:red;">No se pudieron cargar los datos.</p>';
    }
  }
  async function crearGrafico2() {
    console.log("Creando gráfico de torta");
    try {
        const datos = await obtenerDatosActividades();
        const datosProcesados = procesarDatosActividadesTorta(datos);
        Highcharts.chart('container2', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Distribución de Actividades por Tema'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y} actividades'
                    }
                }
            },
            series: [{
                name: 'Temas',
                colorByPoint: true,
                data: datosProcesados
            }]
        })
    } catch (error) {
        console.error('Error al crear el gráfico de torta:', error);
        document.getElementById('container2').innerHTML = '<p style="color:red;">No se pudieron cargar los datos.</p>';
    }
}

async function crearGrafico3() {
    try {
        const datos = await obtenerDatosActividades();
        const { categories, series } = procesarDatosActividadesBarras(datos);
        Highcharts.chart('container3', { 
            chart: {
                type: 'column'
            },
            title: {
                text: 'Actividades por Mes y Horario'
            },
            xAxis: {
                categories: categories,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Cantidad de Actividades'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y} actividades</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    grouping: true,
                    shadow: false
                }
            },
            series: series
        });
    } catch (error) {
        console.error('Error al crear gráfico de barras:', error);
        document.getElementById('container3').innerHTML = '<p style="color:red;">No se pudieron cargar los datos.</p>';
    }
}
  crearGrafico3()
  crearGrafico2()
  crearGrafico();