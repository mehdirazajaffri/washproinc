import passwordHash from 'password-hash';
import Fakerator from 'fakerator';
/**
 * Delete all existing entries and seed users table.
 *
 * @param   {Object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('user')
    .del()
    .then(() => {
      return knex('managing_org').insert([
        {
          name: 'KDA',
          full_name: 'Karachi Development Authority',
          active: true
        }
      ]);
    })
    .then(() => {
      return knex('property_type').insert([
        {
          name: 'Plot'
        },
        { name: 'Building' },
        { name: 'Apartment' },
        { name: 'Bungalow' }
      ]);
    })
    .then(() => {
      return knex('property_kind').insert([
        {
          name: 'Agriculture'
        },
        { name: 'Commercial' },
        { name: 'Residential' }
      ]);
    })
    .then(() => {
      const temp = [];
      const fakerator = Fakerator('de-DE');

      for (let i = 0; i < 100; i++)
        temp.push({
          username: fakerator.internet.userName(),
          email: fakerator.internet.email(),
          password: passwordHash.generate('admin'),
          nic: fakerator.random.number(1000000000),
          phone_number: '456789',
          managing_org: 1,
          full_name: 'mehdi Raza',
          user_type: fakerator.random.number(1, 3)
        });

      return knex('user')
        .insert(temp)
        .then(() => {
          const temp = [];

          for (let i = 0; i < 100; i++) temp.push({ name: i });

          return knex('sector').insert(temp);
        });
    });
}
