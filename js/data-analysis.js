document.addEventListener('DOMContentLoaded', () => {
  const crops = [
    { name: 'Pepper', area: 2, production: 8000 },
    { name: 'Tomato', area: 3, production: 15000 },
    { name: 'Maize', area: 4, production: 12000 },
    { name: 'Cucumber', area: 2, production: 10000 },
    { name: 'Sweet potato', area: 3, production: 18000 }
  ];

  const cropFilter = document.getElementById('crop-filter');
  const sortOrder = document.getElementById('sort-order');
  const tableBody = document.getElementById('crop-table-body');
  const recordCount = document.getElementById('record-count');
  const status = document.getElementById('dashboard-status');
  const totalProductionNode = document.getElementById('total-production');
  const totalAreaNode = document.getElementById('total-area');
  const averageYieldNode = document.getElementById('average-yield');
  const highestCropNode = document.getElementById('highest-yielding-crop');
  const highestYieldNode = document.getElementById('highest-yield-value');

  const formatNumber = (value, maximumFractionDigits = 0) =>
    new Intl.NumberFormat(undefined, { maximumFractionDigits }).format(value);

  const getYield = (crop) => crop.production / crop.area;

  const populateCropFilter = () => {
    crops.forEach((crop) => {
      const option = document.createElement('option');
      option.value = crop.name;
      option.textContent = crop.name;
      cropFilter.append(option);
    });
  };

  const getVisibleCrops = () => {
    const selectedCrop = cropFilter.value;
    const filteredCrops = crops.filter((crop) => selectedCrop === 'all' || crop.name === selectedCrop);
    const [sortField, sortDirection] = sortOrder.value.split('-');
    const sortMultiplier = sortDirection === 'asc' ? 1 : -1;

    return filteredCrops.sort((firstCrop, secondCrop) => {
      const firstValue = sortField === 'yield' ? getYield(firstCrop) : firstCrop.production;
      const secondValue = sortField === 'yield' ? getYield(secondCrop) : secondCrop.production;

      if (firstValue === secondValue) {
        return firstCrop.name.localeCompare(secondCrop.name);
      }

      return (firstValue - secondValue) * sortMultiplier;
    });
  };

  const renderSummary = (visibleCrops) => {
    let totalProduction = 0;
    let totalArea = 0;

    visibleCrops.forEach((crop) => {
      totalProduction += crop.production;
      totalArea += crop.area;
    });

    const averageYield = totalArea === 0 ? 0 : totalProduction / totalArea;
    const highestYieldingCrop = visibleCrops.reduce((highest, crop) => {
      if (!highest || getYield(crop) > getYield(highest)) {
        return crop;
      }
      return highest;
    }, null);

    totalProductionNode.textContent = formatNumber(totalProduction);
    totalAreaNode.textContent = formatNumber(totalArea, 2);
    averageYieldNode.textContent = formatNumber(averageYield, 2);
    highestCropNode.textContent = highestYieldingCrop ? highestYieldingCrop.name : 'No crops';
    highestYieldNode.textContent = highestYieldingCrop
      ? `${formatNumber(getYield(highestYieldingCrop), 2)} kg/ha`
      : 'No yield data';
  };

  const renderTable = (visibleCrops) => {
    tableBody.replaceChildren();

    visibleCrops.forEach((crop) => {
      const row = document.createElement('tr');
      const values = [
        crop.name,
        formatNumber(crop.area, 2),
        formatNumber(crop.production),
        formatNumber(getYield(crop), 2)
      ];

      values.forEach((value) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.append(cell);
      });

      tableBody.append(row);
    });

    const recordWord = visibleCrops.length === 1 ? 'record' : 'records';
    recordCount.textContent = `Showing ${visibleCrops.length} of ${crops.length} demonstration ${recordWord}`;
  };

  const createChart = (canvasId, label, values, color) => {
    const canvas = document.getElementById(canvasId);

    return new Chart(canvas, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label,
            data: values,
            backgroundColor: color,
            borderColor: color,
            borderRadius: 7,
            maxBarThickness: 54
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback(value) {
                return formatNumber(value);
              }
            }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  };

  let productionChart = null;
  let yieldChart = null;

  if (typeof Chart === 'undefined') {
    status.textContent =
      'Charts could not load. Check your internet connection and reload this page to load Chart.js.';
  } else {
    productionChart = createChart(
      'production-chart',
      'Production (kg)',
      [],
      'rgba(15, 34, 57, 0.82)'
    );
    yieldChart = createChart(
      'yield-chart',
      'Yield (kg/ha)',
      [],
      'rgba(79, 111, 93, 0.88)'
    );
  }

  const updateChart = (chart, visibleCrops, valueGetter) => {
    if (!chart) {
      return;
    }

    chart.data.labels = visibleCrops.map((crop) => crop.name);
    chart.data.datasets[0].data = visibleCrops.map(valueGetter);
    chart.update();
  };

  const renderDashboard = () => {
    const visibleCrops = getVisibleCrops();

    renderSummary(visibleCrops);
    renderTable(visibleCrops);
    updateChart(productionChart, visibleCrops, (crop) => crop.production);
    updateChart(yieldChart, visibleCrops, getYield);
  };

  populateCropFilter();
  cropFilter.addEventListener('change', renderDashboard);
  sortOrder.addEventListener('change', renderDashboard);
  renderDashboard();
});
