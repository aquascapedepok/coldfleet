document.addEventListener('DOMContentLoaded', () => {
  // Mobile Sidebar Toggle
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('coldSidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('show');
    });
  }

  // Live Clock
  const clockEl = document.getElementById('liveClock');
  if (clockEl) {
    setInterval(() => {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString('id-ID', { hour12: false }) + ' WIB';
    }, 1000);
  }

  // 1. Leaflet Interactive Fleet Map
  const mapContainer = document.getElementById('fleetLiveMap');
  if (mapContainer && typeof L !== 'undefined') {
    const map = L.map('fleetLiveMap').setView([-6.2297, 106.8295], 11);

   /* L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
	  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	  subdomains: 'abcd',
	  maxZoom: 19
	}).addTo(map);
	*/

	L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	  attribution: '&copy; OpenStreetMap contributors',
	  maxZoom: 19
	}).addTo(map);

    // Marker Truk Reefer
    const trucks = [
      { id: 'TRK-801', name: 'Thermo King V-500 (Vaksin Bio Farma)', lat: -6.2088, lng: 106.8456, temp: '-21.4°C', status: 'Optimal Frozen' },
      { id: 'TRK-802', name: 'Carrier Transicold (Dairy & Meat)', lat: -6.2412, lng: 106.8123, temp: '+2.8°C', status: 'Optimal Chilled' },
      { id: 'TRK-805', name: 'Mitsu Diesel Reefer (Fresh Salmon)', lat: -6.1754, lng: 106.8272, temp: '+6.1°C', status: 'Door Open Alert' }
    ];

    trucks.forEach(t => {
      const marker = L.marker([t.lat, t.lng]).addTo(map);
      marker.bindPopup(`<b>${t.id}</b><br>${t.name}<br><b>Suhu Kargo:</b> <span style="color:#0284c7;font-weight:bold;">${t.temp}</span><br>Status: ${t.status}`);
    });
  }

  // 2. ApexCharts: Temperature Stability Multi-Zone
  const chartEl = document.querySelector("#tempStabilityChart");
  if (chartEl && typeof ApexCharts !== 'undefined') {
    const tempChart = new ApexCharts(chartEl, {
      series: [
        {
          name: 'Zona 1: Frozen Compartment (-20°C Target)',
          data: [-20.1, -20.4, -20.2, -19.8, -20.5, -21.0, -20.3, -20.2]
        },
        {
          name: 'Zona 2: Chilled Compartment (+3°C Target)',
          data: [2.8, 3.1, 3.0, 3.4, 3.2, 2.9, 3.1, 3.0]
        }
      ],
      chart: {
        height: 290,
        type: 'line',
        toolbar: { show: false },
        fontFamily: 'Plus Jakarta Sans, sans-serif'
      },
      colors: ['#0284c7', '#10b981'],
      stroke: { width: [3, 3], curve: 'smooth' },
      xaxis: {
        categories: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        labels: { style: { colors: '#64748b', fontSize: '11px' } }
      },
      grid: { borderColor: '#f1f5f9' },
      legend: { position: 'top', horizontalAlign: 'right' }
    });
    tempChart.render();
  }
});
