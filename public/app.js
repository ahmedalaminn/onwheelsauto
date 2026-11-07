'use strict';
const form = document.querySelector('#booking-form');
const fields = [...form.querySelectorAll('fieldset')];
const next = document.querySelector('#next');
const back = document.querySelector('#back');
const send = document.querySelector('#send');
const ready = document.querySelector('#text-ready');
const labels = ['YOUR SERVICE', 'YOUR VEHICLE', 'YOUR DETAILS'];
let step = 0;
function showStep(value, focus = true) {
  step = value;
  fields.forEach((field, i) => { field.hidden = i !== step; });
  back.hidden = step === 0;
  next.hidden = step === 2;
  send.hidden = step !== 2;
  document.querySelector('#step-label').textContent = labels[step];
  document.querySelector('#step-count').textContent = `0${step + 1} / 03`;
  document.querySelector('#progress-bar').style.width = `${((step + 1) / 3) * 100}%`;
  if (focus) { const legend = fields[step].querySelector('legend'); legend.tabIndex = -1; legend.focus({ preventScroll: true }); }
}
function validStep(index) {
  const invalid = [...fields[index].querySelectorAll('input, textarea, select')].find(input => !input.checkValidity());
  if (invalid) { showStep(index, false); invalid.reportValidity(); return false; }
  return true;
}
next.addEventListener('click', () => { if (validStep(step)) showStep(step + 1); });
back.addEventListener('click', () => showStep(step - 1));
// Validate the visible step ourselves so hidden required controls never trap focus.
form.noValidate = true;
form.addEventListener('submit', event => {
  event.preventDefault();
  if (step < 2) { if (validStep(step)) showStep(step + 1); return; }
  for (let i = 0; i < fields.length; i++) if (!validStep(i)) return;
  const data = new FormData(form);
  const read = key => String(data.get(key) || '').trim();
  const message = [
    'Hi On Wheels Auto! I’d like to request service.', '',
    `Service: ${read('service')}`, `Vehicle: ${read('year')} ${read('make')} ${read('model')}`,
    `Issue / maintenance: ${read('symptoms')}`, `Can be driven: ${read('drivable')}`, '',
    `Name: ${read('name')}`, `Phone: ${read('phone')}`, `Location: ${read('location')}`,
    `Preferred timing: ${read('timing') || 'Flexible — please contact me'}`, '',
    'Please contact me to discuss pricing and availability.'
  ].join('\n');
  // The customer explicitly sends this message in their own messaging app.
  const url = `sms:+13029830433?body=${encodeURIComponent(message)}`;
  document.querySelector('#request-copy').value = message;
  document.querySelector('#open-text').href = url;
  form.hidden = true; ready.hidden = false;
  document.querySelector('.form-panel').classList.add('has-ready');
  document.querySelector('#step-label').textContent = 'READY TO TEXT';
  ready.querySelector('h3').tabIndex = -1; ready.querySelector('h3').focus({ preventScroll: true });
  window.location.href = url;
});
document.querySelector('#copy-request').addEventListener('click', async () => {
  const area = document.querySelector('#request-copy');
  try { await navigator.clipboard.writeText(area.value); document.querySelector('#copy-status').textContent = 'Copied. Paste it into a text to 302-983-0433.'; }
  catch { area.focus(); area.select(); document.querySelector('#copy-status').textContent = 'Select and copy the request above, then text it to 302-983-0433.'; }
});
document.querySelector('#edit-request').addEventListener('click', () => {
  ready.hidden = true; form.hidden = false;
  document.querySelector('.form-panel').classList.remove('has-ready');
  document.querySelector('#copy-status').textContent = '';
  showStep(2);
});
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  const input = [...form.querySelectorAll('[name="service"]')].find(item => item.value === link.dataset.service);
  input.checked = true; ready.hidden = true; form.hidden = false; showStep(0, false);
}));
document.querySelector('#year').textContent = new Date().getFullYear();
showStep(0, false);
