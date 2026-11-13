// Pruebas unitarias automatizadas con el ejecutor nativo de Node.js (node:test).
// Verifica formato horario, algoritmos de filtrado y validacion de formularios.
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCityTimes,
  filterArchiveItems,
  validateNewsletterEmail,
  validateViewingRequest,
} from './catalogue.ts';

// Test 1: Comprueba la conversion y visualizacion correcta en 24h para las 3 ciudades.
test('formatCityTimes formats London, Kyoto, and Mexico City in 24h HH:MM', () => {
  const fixedDate = new Date('2026-05-16T12:30:00.000Z');
  const clocks = formatCityTimes(fixedDate);
  assert.equal(clocks.length, 3);
  assert.deepEqual(
    clocks.map((c) => c.code),
    ['LON', 'KYO', 'CDMX']
  );
  for (const clock of clocks) {
    assert.match(clock.time, /^\d{2}:\d{2}$/);
  }
  // En mayo: Londres BST (UTC+1 -> 13:30), Tokio JST (UTC+9 -> 21:30), CDMX CST (UTC-6 -> 06:30)
  assert.equal(clocks[0].time, '13:30');
  assert.equal(clocks[1].time, '21:30');
  assert.equal(clocks[2].time, '06:30');
});

// Test 2: Verifica que el filtro devuelva todo el catalogo o aisle solo la disciplina indicada.
test('filterArchiveItems returns all items for Todo and filters strictly by category', () => {
  const items = [
    { id: '1', category: 'Pintura' },
    { id: '2', category: 'Escultura' },
    { id: '3', category: 'Pintura' },
    { id: '4', category: 'Sobre papel' },
  ];

  assert.equal(filterArchiveItems(items, 'Todo').length, 4);
  assert.equal(filterArchiveItems(items, 'Pintura').length, 2);
  assert.equal(filterArchiveItems(items, 'Escultura').length, 1);
  assert.equal(filterArchiveItems(items, 'Video').length, 0);
});

// Test 3: Comprueba el rechazo de correos invalidos y la aceptacion de formatos validos.
test('validateNewsletterEmail rejects empty or malformed addresses and accepts valid emails', () => {
  assert.equal(validateNewsletterEmail('').valid, false);
  assert.equal(validateNewsletterEmail('   ').valid, false);
  assert.equal(validateNewsletterEmail('no-es-correo').valid, false);
  assert.equal(validateNewsletterEmail('elena@muse.art').valid, true);
});

// Test 4: Comprueba que la reserva exija todos los campos y correo valido.
test('validateViewingRequest requires all fields and valid email', () => {
  const invalid = validateViewingRequest({
    name: '',
    email: 'invalido',
    city: '',
    date: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.city);
  assert.ok(invalid.errors.date);

  const valid = validateViewingRequest({
    name: 'Sofía Mendoza',
    email: 'sofia@ejemplo.es',
    city: 'Londres',
    date: '2026-06-10',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});
