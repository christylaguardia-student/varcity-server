const express = require('express');
const router = express.Router();
const SeedUser = require('../models/SeedUser');

router.post('/', async (req, res, next) => {
  const searchTerm = req.body.payload;
  console.log(55, searchTerm)
  return SeedUser.find(
    {
      'info.public': true,
      $and: [
        {
          $text: {
            $search: 'football female'
          }
        }
      ]
    },
    {
'info.firstName': 1,
'info.lastName': 1,
'info.profileUrl': 1,
  'info.primarySport': 1,
  'info.primarySportGender': 1,
  'info.location.city': 1,
  'info.location.state': 1,
  'info.location.country': 1
    }
  )
    .sort({
      'info.lastName': 1
    })
    .then(results => {
      console.log(1000, results);
      return res.send(results);
    });
});

module.exports = router;

// db.users.find({
//   'info.public': true,
//   $and: [
//       {
//           $text: {
//               $search: 'mm'
//           }
//       }
//   ]
// }, {
//    _id: 1,
//     'info.firstName': 1,
//     'info.lastName': 1,
//         'info.profileUrl': 1,
// 'info.primarySport': 1,
// 'info.primarySportGender': 1,
// 'info.location.city': 1,
// 'info.location.state': 1,
// 'info.location.country': 1

// }).sort({
//   'info.lastName': 1
// });
