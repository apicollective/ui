
// This is what the test-jsondoc-spec should look like in the ui

const getGender200 =
'female';

const getGender201 =
'string';

const postPerson =
  {
    id: 12,
    default: 'default value',
    example: 'example value',
    boolean: true,
    dob: '2001-10-10',
    time: '2016-03-24T13:56:45.242Z',
    tags:
    [
      'tag',
    ],
    details:
    {
      some_thing: 10,
      tags:
      [
        'string',
      ],
    },
    addresses:
    [
      {
        street: 10,
        tags:
        [
          'string',
        ],
      },
    ],
    gender: 'gender',
  }
;

const postPeople =
  [
    {
      id: 'xyz',
      name: 'name',
      dob: '2001-10-10',
      tags:
      [
        'tag',
      ],
      details:
      {
        some_thing: 10,
        tags:
        [
          'string',
        ],
      },
      addresses:
      [
        {
          street: 10,
          tags:
          [
            'string',
          ],
        },
      ],
      gender: 'gender',
    },
  ]
;
