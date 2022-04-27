import _ from 'lodash';

const chats = [
    {
        creatorUID: 'LnGnI2tlmJTFbCiNxP9f',
        messages: _.orderBy([
            {
                _id: 4,
                text: 'Anyone looking to meet up to do a quick workout together?',
                createdAt: 1651004200916,
                user: {
                    name: 'You',
                }
            },
            {
                _id: 1,
                text: "Hey guys! I'm planning on being online for the next hour, feel free to drop any questions you have for me and I'll try my best to respond :)",
                createdAt: 1651004210916,
                user: {
                    _id: 'LnGnI2tlmJTFbCiNxP9f',
                    name: '_joeandrews',
                },
            },
            {
                _id: 3,
                text: 'yayyy',
                createdAt: 1651005210916,
                user: {
                    name: 'person b',
                    _id: '',
                }
            },
            {
                _id: 2,
                text: 'Woooo!!!',
                createdAt: 1651005220916,
                user: {
                    _id: '',
                    name: 'person a',
                },
            },
        ], 'createdAt', 'desc'),
    },
    {
        creatorUID: 'fAtArzlJYIZh7hY6R0Yos3skhak2',
        messages: _.orderBy([
            {
                _id: 4,
                text: 'Anyone looking to meet up to do some vocal practice together?',
                createdAt: 1651004200916,
                user: {
                    name: 'You',
                }
            },
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
                _id: 3,
                text: 'yayyy',
                createdAt: 1651005210916,
                user: {
                    name: 'person b',
                    _id: '',
                }
            },
            {
                _id: 2,
                text: 'Woooo!!!',
                createdAt: 1651005220916,
                user: {
                    _id: '',
                    name: 'person a',
                },
            },
        ], 'createdAt', 'desc'),

    },
    {
        creatorUID: 'WrWec4sd6Hm4NPWZYWZR',
        messages: _.orderBy([
            {
                _id: 4,
                text: 'Anyone looking to meet up to do makeup together?',
                createdAt: 1651004200916,
                user: {
                    name: 'You',
                }
            },
            {
                _id: 1,
                text: "Hey guys! I'm planning on being online for the next hour, feel free to drop any questions you have for me and I'll try my best to respond :)",
                createdAt: 1651004210916,
                user: {
                    _id: 'WrWec4sd6Hm4NPWZYWZR',
                    name: 'kennnnito',
                },
            },
            {
                _id: 3,
                text: 'yayyy',
                createdAt: 1651005210916,
                user: {
                    name: 'person b',
                    _id: '',
                }
            },
            {
                _id: 2,
                text: 'Woooo!!!',
                createdAt: 1651005220916,
                user: {
                    _id: '',
                    name: 'person a',
                },
            },
        ], 'createdAt', 'desc'),
    },
    {
        creatorUID: 'LzuHXQROAEWpuFHUFTY1CbXzWuV2',
        messages: _.orderBy([
            {
                _id: 4,
                text: 'Anyone looking to meet up to do a quick trading session together?',
                createdAt: 1651004200916,
                user: {
                    name: 'You',
                }
            },
            {
                _id: 1,
                text: "Hey guys! I'm planning on being online for the next hour, feel free to drop any questions you have for me and I'll try my best to respond :)",
                createdAt: 1651004210916,
                user: {
                    _id: 'LzuHXQROAEWpuFHUFTY1CbXzWuV2',
                    name: 'johnefinance',
                },
            },
            {
                _id: 3,
                text: 'yayyy',
                createdAt: 1651005210916,
                user: {
                    name: 'person b',
                    _id: '',
                }
            },
            {
                _id: 2,
                text: 'Woooo!!!',
                createdAt: 1651005220916,
                user: {
                    _id: '',
                    name: 'person a',
                },
            },
        ], 'createdAt', 'desc'),

    }

]

export default chats;
