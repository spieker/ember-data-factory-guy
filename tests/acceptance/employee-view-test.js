import {test} from 'qunit';
import FactoryGuy,{make, build, buildList, mockFindRecord} from 'ember-data-factory-guy';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Employee View ( model-fragments )');
// NOTE
// FactoryGuy before and after setup is in moduleForAcceptance helper

test("Show employee by make(ing) a model ( with hasMany fragment added manually ) and using returns with that model", async function(assert) {
  let departmentEmployments = buildList('department-employment', 2).get();
  let employee = make('employee', { departmentEmployments });

  mockFindRecord('employee').returns({ model: employee });
  await visit('/employee/' + employee.get('id'));

  assert.ok(find('.name').text().match(`${employee.get('name.firstName')} ${employee.get('name.lastName')}`));
  assert.equal(find('.department-employment').length, 2, "fragment array works");
});

test("Show employee by make(ing) a model and using returns with that model", async function(assert) {
  let employee = make('employee', 'with_department_employments');

  mockFindRecord('employee').returns({ model: employee });
  await visit('/employee/' + employee.get('id'));

  assert.ok(find('.name').text().match(`${employee.get('name.firstName')} ${employee.get('name.lastName')}`));
  assert.equal(find('.department-employment').length, 2, "fragment array works");
});

test("Show employee by building(ing) json and using returns with that json", async function(assert) {
  FactoryGuy.settings({logLevel: 1});
//  console.log('me build',build('name', {firstName:'FFirst', lastName:'LLast'}));
  // 'with_department_employments' is a trait that build the has many in the employee factory
  let employee = build('employee', 'with_department_employments');
  mockFindRecord('employee').returns({ json: employee });
  await visit('/employee/' + employee.get('id'));

  assert.ok(find('.name').text().match(`${employee.get('name').first_name} ${employee.get('name').last_name}`));
  assert.equal(find('.department-employment').length, 2, "fragment array works");
});

test("Show employee by building(ing) json ( with hasMany fragment added manually ) and using returns with that json", async function(assert) {
  let departmentEmployments = buildList('department-employment', 2).get();
  let employee = build('employee', { departmentEmployments });

  mockFindRecord('employee').returns({ json: employee });
  await visit('/employee/' + employee.get('id'));

  assert.ok(find('.name').text().match(`${employee.get('name').first_name} ${employee.get('name').last_name}`));
  assert.equal(find('.department-employment').length, 2, "fragment array works");
});
