import math from '../assets/math.png';
import biology from '../assets/biology.png';
import humanism from '../assets/humanism.png';
import art from '../assets/art.png';
import english from '../assets/english.png';

const TestApiGroups = {
    data: [
        {
            id: 1,
            name: 'گروه آزمایشی ریاضی',
            icon: math,
            teachersCount: 25,
            coursesCount: 10,
            articlesCount: 115,
        },
        {
            id: 3,
            name: 'گروه آزمایشی تجربی',
            icon: biology,
            teachersCount: 32,
            coursesCount: 11,
            articlesCount: 182,
        },
        {
            id: 5,
            name: 'گروه آزمایشی انسانی',
            icon: humanism,
            teachersCount: 27,
            coursesCount: 17,
            articlesCount: 154,
        },
        {
            id: 7,
            name: 'گروه آزمایشی هنر',
            icon: art,
            teachersCount: 19,
            coursesCount: 7,
            articlesCount: 93,
        },
        {
            id: 9,
            name: 'گروه آزمایشی زبان',
            icon: english,
            teachersCount: 15,
            coursesCount: 5,
            articlesCount: 81,
        },
    ]
};

export default TestApiGroups;