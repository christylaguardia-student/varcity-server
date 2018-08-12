const EduSchema = require('../../lib/models/Edu');
const mongoose = require('mongoose');

describe('Edu Model', () => {

  const Edu = mongoose.model('Edu', EduSchema);

  // this doesn't really test validation, just that it doesn't fail with all fields included
  it('validates with all fields', () => {
    const edu = new Edu({
      schools: [
        {
          institution: 'Harvard',
          year: 2016,
          address: {
            country: 'United States',
            region: 'Oregon',
            city: 'Portland'
          },
          degree: 'Bachelors of Science'
        },
        {
          institution: 'Harvard 2',
          year: 2017,
          address: {
            country: 'United States',
            region: 'Oregon',
            city: 'Portland'
          },
          degree: 'Master of Science'
        },
      ],
      testScores: {
        SAT: {
          reading: 1000,
          math: 1000,
          writing: 1000,
        },
        ACT: {
          reading: 1000,
          math: 1000,
          writing: 1000,
          science: 1000
        },
        IB: {
          language: 1000,
          math: 1000,
          science: 1000,
          history: 1000
        }
      }
    });

    return edu.validate();
  });

});
