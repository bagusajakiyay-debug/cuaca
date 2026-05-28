const form = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const statusMessage = document.getElementById('statusMessage');
const weatherResult = document.getElementById('weatherResult');
const cityNameEl = document.getElementById('cityName');
const tempValueEl = document.getElementById('tempValue');
const humidityValueEl = document.getElementById('humidityValue');
const conditionValueEl = document.getElementById('conditionValue');
const weatherIconEl = document.getElementById('weatherIcon');
const citySuggestionsEl = document.getElementById('citySuggestions');

const locationSuggestions = [
  'Aceh', 'Banda Aceh', 'Sabang', 'Lhokseumawe', 'Langsa',
  'Sumatera Utara', 'Medan', 'Binjai', 'Pematangsiantar', 'Tebing Tinggi', 'Padang Sidempuan',
  'Sumatera Barat', 'Padang', 'Bukittinggi', 'Pariaman', 'Payakumbuh',
  'Riau', 'Pekanbaru', 'Dumai', 'Batam', 'Tanjungpinang',
  'Jambi', 'Bengkulu', 'Palembang', 'Prabumulih', 'Lubuklinggau',
  'Sumatera Selatan', 'Lampung', 'Bandar Lampung', 'Metro',
  'Bangka Belitung', 'Pangkal Pinang',
  'Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi', 'Cilegon', 'Serang',
  'Jawa Barat', 'Bandung', 'Cimahi', 'Cirebon', 'Tasikmalaya', 'Banjar', 'Sukabumi',
  'Jawa Tengah', 'Semarang', 'Solo', 'Magelang', 'Pekalongan', 'Tegal', 'Salatiga',
  'Yogyakarta', 'Bantul', 'Sleman', 'Kulon Progo', 'Gunungkidul',
  'Jawa Timur', 'Surabaya', 'Malang', 'Batu', 'Kediri', 'Madiun', 'Mojokerto', 'Pasuruan', 'Probolinggo', 'Blitar', 'Sidoarjo',
  'Bali', 'Denpasar', 'Singaraja', 'Tabanan', 'Badung', 'Gianyar', 'Bangli', 'Karangasem', 'Buleleng',
  'Nusa Tenggara Barat', 'Mataram', 'Bima',
  'Nusa Tenggara Timur', 'Kupang', 'Atambua', 'Ende', 'Maumere',
  'Kalimantan Barat', 'Pontianak', 'Singkawang',
  'Kalimantan Tengah', 'Palangkaraya',
  'Kalimantan Selatan', 'Banjarmasin', 'Banjarbaru',
  'Kalimantan Timur', 'Samarinda', 'Balikpapan', 'Bontang', 'Tarakan',
  'Kalimantan Utara', 'Nunukan',
  'Sulawesi Utara', 'Manado', 'Tomohon', 'Bitung', 'Kotamobagu',
  'Gorontalo', 'Gorontalo', 'Boalemo',
  'Sulawesi Tengah', 'Palu', 'Donggala',
  'Sulawesi Selatan', 'Makassar', 'Parepare', 'Palopo', 'Watampone',
  'Sulawesi Tenggara', 'Kendari', 'Baubau',
  'Sulawesi Barat', 'Mamuju',
  'Maluku', 'Ambon', 'Tual',
  'Maluku Utara', 'Ternate', 'Tidore Kepulauan', 'Sofifi',
  'Papua Barat', 'Manokwari', 'Sorong', 'Fakfak', 'Kaimana',
  'Papua', 'Jayapura', 'Merauke', 'Timika', 'Nabire', 'Wamena', 'Biak', 'Sentani'
];

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
  0: 'assets/weather/sunny.svg',
  1: 'assets/weather/sunny.svg',
  2: 'assets/weather/cloudy.svg',
  3: 'assets/weather/cloudy.svg',
  45: 'assets/weather/foggy.svg',
  48: 'assets/weather/foggy.svg',
  51: 'assets/weather/rainy.svg',
  53: 'assets/weather/rainy.svg',
  55: 'assets/weather/rainy.svg',
  61: 'assets/weather/rainy.svg',
  63: 'assets/weather/rainy.svg',
  65: 'assets/weather/rainy.svg',
  66: 'assets/weather/rainy.svg',
  67: 'assets/weather/rainy.svg',
  71: 'assets/weather/snowy.svg',
  73: 'assets/weather/snowy.svg',
  75: 'assets/weather/snowy.svg',
  77: 'assets/weather/snowy.svg',
  80: 'assets/weather/rainy.svg',
  81: 'assets/weather/rainy.svg',
  82: 'assets/weather/storm.svg',
  85: 'assets/weather/snowy.svg',
  86: 'assets/weather/snowy.svg',
  95: 'assets/weather/storm.svg',
  96: 'assets/weather/storm.svg',
  99: 'assets/weather/storm.svg'
};

function renderLocationSuggestions() {
  const uniqueLocations = [...new Set(locationSuggestions)].sort((a, b) => a.localeCompare(b, 'id'));

  const optionFragment = document.createDocumentFragment();

  uniqueLocations.forEach((item) => {
    const option = document.createElement('option');
    option.value = item;
    optionFragment.appendChild(option);
  });

  citySuggestionsEl.appendChild(optionFragment);
}

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
  weatherIconEl.src = iconMap[weatherCode] || 'assets/weather/cloudy.svg';
  weatherIconEl.alt = `Ikon cuaca ${weatherDescriptions[weatherCode] || 'umum'}`;
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
  renderLocationSuggestions();
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
