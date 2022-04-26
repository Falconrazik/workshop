import _ from 'lodash';

const chats = [
    {
        creatorUID: 'LnGnI2tlmJTFbCiNxP9f',
        messages: _.orderBy([
            {
                _id: 1,
                text: 'I WANNA GET HYUJ',
                createdAt: 1651005324916,
            },
            {
                _id: 2,
                text: 'I WANNA GET HYUJ',
                createdAt: 1651005220916,
            },
            {
                _id: 3,
                text: 'I WANNA GET HYUJ',
                createdAt: 1651005210916,
            },
            {
                _id: 4,
                text: 'I WANNA GET HYUJ',
                createdAt: 1651004210916,
            }
        ], 'createdAt', 'desc')

    },
    {
        creatorUID: 'fAtArzlJYIZh7hY6R0Yos3skhak2',
        messages: _.orderBy([
            {
                _id: 1,
                text: "Hey guys! I'm planning on being online for the next hour, feel free to drop any questions you have for me and I'll try my best to respond :)",
                createdAt: 1651004210916,
                user: {
                    _id: 'fAtArzlJYIZh7hY6R0Yos3skhak2',
                    name: 'jodielangel',
                },
            },
            {
                _id: 2,
                text: 'I WANNA SING',
                createdAt: 1651005220916,
                user: {
                    _id: '',
                    name: 'person a',
                },
            },
            {
                _id: 3,
                text: 'I WANNA SING',
                createdAt: 1651005210916,
                user: {
                    name: 'person b',
                }
            },
            {
                _id: 4,
                text: 'I WANNA SING',
                createdAt: 1651004210916,
                user: {
                    name: 'person c',
                }
            }
        ], 'createdAt', 'desc'),

    },
    {
        creatorUID: 'WrWec4sd6Hm4NPWZYWZR',
        messages: _.orderBy([
            {
                _id: 1,
                text: 'I WANNA BE PRETTY',
                createdAt: 1455045324316,
            },
            {
                _id: 2,
                text: 'I WANNA BE PRETTY',
                createdAt: 1651005220916,
            },
            {
                _id: 3,
                text: 'I WANNA BE PRETTY',
                createdAt: 1651005210916,
            },
            {
                _id: 4,
                text: 'I WANNA BE PRETTY',
                createdAt: 1651004210916,
            }
        ], 'createdAt', 'desc'),
    },
    {
        creatorUID: 'LzuHXQROAEWpuFHUFTY1CbXzWuV2',
        messages: _.orderBy([
            {
                _id: 1,
                text: 'I WANNA GET RICH',
                createdAt: 1455045324316,
            },
            {
                _id: 2,
                text: 'I WANNA GET RICH',
                createdAt: 1651005220916,
            },
            {
                _id: 3,
                text: 'I WANNA GET RICH',
                createdAt: 1651005210916,
            },
            {
                _id: 4,
                text: 'I WANNA GET RICH',
                createdAt: 1651004210916,
            }
        ], 'createdAt', 'desc'),

    }

]

export default chats;
