import Home from './views/Home'
import Restaurant from './views/Yelp'
import NotFound from './views/NotFound'

export default [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/yelp/:id',
        name: 'yelp',
        component: Restaurant,
        props: true
    },
    {
        path: '*',
        component: NotFound
    }
];
