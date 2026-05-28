const form = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const statusMessage = document.getElementById('statusMessage');
const weatherResult = document.getElementById('weatherResult');
const cityNameEl = document.getElementById('cityName');
const tempValueEl = document.getElementById('tempValue');
const humidityValueEl = document.getElementById('humidityValue');
const conditionValueEl = document.getElementById('conditionValue');
const weatherIconEl = document.getElementById('weatherIcon');

const weatherDescriptions = {
  0: 'Cerah',
  1: 'Sebagian Cerah',
  2: 'Berawan',
  3: 'Mendung',
  45: 'Berkabut',
  48: 'Berkabut Mengembun',
  51: 'Gerimis Ringan',
  53: 'Gerimis Sedang',
  55: 'Gerimis Lebat',
  56: 'Gerimis Beku Ringan',
  57: 'Gerimis Beku Lebat',
  61: 'Hujan Ringan',
  63: 'Hujan Sedang',
  65: 'Hujan Lebat',
  66: 'Hujan Beku Ringan',
  67: 'Hujan Beku Lebat',
  71: 'Salju Ringan',
  73: 'Salju Sedang',
  75: 'Salju Lebat',
  77: 'Butiran Salju',
  80: 'Hujan Badai Ringan',
  81: 'Hujan Badai Sedang',
  82: 'Hujan Badai Lebat',
  85: 'Salju Badai Ringan',
  86: 'Salju Badai Lebat',
  95: 'Badai Petir',
  96: 'Badai Petir dengan Hujan Es Ringan',
  99: 'Badai Petir dengan Hujan Es Lebat'
};

const iconMap = {
  0: '☀️',
  1: '🌤️',
  2: '⛅',
  3: '☁️',
  45: '🌫️',
  48: '🌫️',
  51: '🌦️',
  53: '🌦️',
  55: '🌧️',
  61: '🌧️',
  63: '🌧️',
  65: '🌧️',
  80: '🌦️',
  81: '🌧️',
  82: '⛈️',
  95: '⛈️',
  96: '⛈️',
  99: '⛈️'
};

async function getCityCoordinates(query) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=id&format=json`
  );

  if (!response.ok) {
    throw new Error('Gagal mengambil data lokasi.');
  }

  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error('Kota tidak ditemukan. Coba kata kunci lain.');
  }

  return data.results[0];
}

async function getWeather(lat, lon) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`
  );

  if (!response.ok) {
    throw new Error('Gagal mengambil data cuaca.');
  }

  return response.json();
}

function renderWeather(result) {
  const weatherCode = result.current.weather_code;

  cityNameEl.textContent = result.name;
  tempValueEl.textContent = Math.round(result.current.temperature_2m);
  humidityValueEl.textContent = result.current.relative_humidity_2m;
  conditionValueEl.textContent = weatherDescriptions[weatherCode] || 'Cuaca tidak diketahui';
  weatherIconEl.textContent = iconMap[weatherCode] || '🌈';
  weatherResult.classList.remove('hidden');
}

async function handleSearch(event) {
  event.preventDefault();
  const query = cityInput.value.trim();

  if (!query) {
    statusMessage.textContent = 'Silakan masukkan nama kota.';
    return;
  }

  statusMessage.textContent = 'Mengambil data cuaca...';

  try {
    const location = await getCityCoordinates(query);
    const weather = await getWeather(location.latitude, location.longitude);

    renderWeather({
      name: `${location.name}${location.admin1 ? `, ${location.admin1}` : ''}${location.country ? `, ${location.country}` : ''}`,
      current: weather.current
    });
    statusMessage.textContent = 'Data cuaca berhasil dimuat.';
  } catch (error) {
    weatherResult.classList.add('hidden');
    statusMessage.textContent = error.message;
  }
}

form.addEventListener('submit', handleSearch);

window.addEventListener('DOMContentLoaded', async () => {
  statusMessage.textContent = 'Memuat cuaca default untuk Jakarta...';
  try {
    const location = await getCityCoordinates('Jakarta');
    const weather = await getWeather(location.latitude, location.longitude);
    renderWeather({
      name: `${location.name}${location.admin1 ? `, ${location.admin1}` : ''}${location.country ? `, ${location.country}` : ''}`,
      current: weather.current
    });
    statusMessage.textContent = 'Siap. Cari kota lain untuk melihat cuaca terbaru.';
  } catch (error) {
    statusMessage.textContent = error.message;
  }
});
