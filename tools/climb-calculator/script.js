// Presets are indicative. The initial selections preserve the v0.1 calculation.
const MODEL = Object.freeze({ gravity: 9.80665, drivetrainEfficiency: 0.975 });
const PRESETS = Object.freeze({
  rolling: Object.freeze({ fast: 0.003, normal: 0.004, rough: 0.006, veryRough: 0.008 }),
  position: Object.freeze({ upright: 0.40, hoods: 0.32, drops: 0.28, tucked: 0.25 }),
  air: Object.freeze({ low: 1.20, medium: 1.11, high: 1.01, veryHigh: 0.91 })
});
const $ = (id) => document.getElementById(id);
const number = (id) => Number($(id).value.replace(',', '.'));
const format = (value, digits = 1) => value.toLocaleString('es-ES', { minimumFractionDigits: digits, maximumFractionDigits: digits });
let climbMode = 'elevation';

function validInput(id, min, max) {
  const input = $(id);
  const value = number(id);
  const valid = input.value.trim() !== '' && Number.isFinite(value) && value >= min && value <= max;
  input.setAttribute('aria-invalid', String(!valid));
  return valid ? value : null;
}

function duration(seconds) {
  const rounded = Math.round(seconds);
  const hours = Math.floor(rounded / 3600);
  const minutes = Math.floor((rounded % 3600) / 60);
  const secs = rounded % 60;
  return hours ? `${hours} h ${String(minutes).padStart(2, '0')} min ${String(secs).padStart(2, '0')} s` : `${minutes} min ${String(secs).padStart(2, '0')} s`;
}

function calculate(distanceKm, elevationM, riderKg, bikeKg, powerW, rollingCoefficient, dragArea, airDensity) {
  const roadM = distanceKm * 1000;
  const slopeSin = elevationM / roadM;
  const slopeCos = Math.sqrt(1 - slopeSin ** 2);
  const mass = riderKg + bikeKg;
  const force = mass * MODEL.gravity * (slopeSin + rollingCoefficient * slopeCos);
  const aero = 0.5 * airDensity * dragArea;
  const wheelPower = powerW * MODEL.drivetrainEfficiency;
  let low = 0, high = 60;
  for (let i = 0; i < 75; i++) {
    const speed = (low + high) / 2;
    if (force * speed + aero * speed ** 3 > wheelPower) high = speed;
    else low = speed;
  }
  const speed = (low + high) / 2;
  return { seconds: roadM / speed, kph: speed * 3.6, wkg: powerW / riderKg };
}

function renderScenario(key, route, airDensity) {
  const rider = validInput(`${key}-rider`, 20, 250);
  const bike = validInput(`${key}-bike`, 2, 60);
  const power = validInput(`${key}-power`, 30, 1000);
  const error = $(`${key}-error`);
  const rollingCoefficient = PRESETS.rolling[$(`${key}-rolling`).value];
  const dragArea = PRESETS.position[$(`${key}-position`).value];
  const valid = rider !== null && bike !== null && power !== null && rollingCoefficient !== undefined && dragArea !== undefined;
  error.hidden = valid;
  error.textContent = valid ? '' : 'Revisa los valores: ciclista 20–250 kg, bici y equipo 2–60 kg, potencia 30–1000 W.';
  const result = valid && route && airDensity !== undefined ? calculate(route.distance, route.elevation, rider, bike, power, rollingCoefficient, dragArea, airDensity) : null;
  $(`${key}-time`).textContent = result ? duration(result.seconds) : '—';
  $(`${key}-speed`).textContent = result ? `${format(result.kph)} km/h` : '—';
  $(`${key}-wkg`).textContent = result ? `${format(result.wkg, 2)} W/kg` : '—';
  return result;
}

function update() {
  const distance = validInput('distance', 0.1, 300);
  const climb = validInput('climb', 0, climbMode === 'elevation' ? 30000 : 40);
  const elevation = distance !== null && climb !== null ? (climbMode === 'elevation' ? climb : distance * 1000 * Math.sin(Math.atan(climb / 100))) : null;
  const possible = elevation !== null && elevation < distance * 1000;
  const route = possible ? { distance, elevation } : null;
  const error = $('route-error');
  error.hidden = Boolean(route);
  error.textContent = route ? '' : 'Introduce una distancia válida y un desnivel menor que la distancia de la ruta (o una pendiente de 0–40 %).';
  $('grade-output').textContent = route ? `${format(100 * elevation / Math.sqrt((distance * 1000) ** 2 - elevation ** 2), 2)} %` : '—';
  const airDensity = PRESETS.air[$('air').value];
  const a = renderScenario('a', route, airDensity);
  const b = renderScenario('b', route, airDensity);
  if (!a || !b) {
    $('difference-description').textContent = 'Completa ambos escenarios';
    $('difference-time').textContent = '—';
    return;
  }
  const delta = b.seconds - a.seconds;
  $('difference-description').textContent = Math.abs(delta) < 0.5 ? 'Los dos escenarios tardan lo mismo' : delta < 0 ? 'En B llegarías antes' : 'En B llegarías después';
  $('difference-time').textContent = duration(Math.abs(delta));
}

document.querySelectorAll('input').forEach((input) => input.addEventListener('input', update));
document.querySelectorAll('select').forEach((select) => select.addEventListener('change', update));
document.querySelectorAll('[data-mode]').forEach((button) => button.addEventListener('click', () => {
  if (button.dataset.mode === climbMode) return;
  const distance = number('distance');
  const climb = number('climb');
  if (Number.isFinite(distance) && distance > 0 && Number.isFinite(climb) && climb >= 0) {
    if (button.dataset.mode === 'grade' && climb < distance * 1000) {
      $('climb').value = (100 * climb / Math.sqrt((distance * 1000) ** 2 - climb ** 2)).toFixed(2);
    } else if (button.dataset.mode === 'elevation') {
      $('climb').value = (distance * 1000 * Math.sin(Math.atan(climb / 100))).toFixed(0);
    }
  }
  climbMode = button.dataset.mode;
  $('climb-label').textContent = climbMode === 'elevation' ? 'Desnivel positivo' : 'Pendiente media';
  $('climb-unit').textContent = climbMode === 'elevation' ? 'm' : '%';
  $('climb').step = climbMode === 'elevation' ? '1' : '0.1';
  document.querySelectorAll('[data-mode]').forEach((item) => {
    const selected = item.dataset.mode === climbMode;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  update();
}));
update();
