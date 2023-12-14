import Vue from 'vue';
import VueRouter from 'vue-router';
import userLogin from "./components/Login"
import HomeView from "./components/Home"
import HomePage from "./components/mainContent/HomePage"
import ClubsPage from "./components/mainContent/Clubs"
import MemebersPage from "./components/mainContent/Memebers"
import EventsPage from "./components/mainContent/Events"
import MyAccount from "./components/mainContent/MyAccount"
import NewsPage from "./components/mainContent/News"
import SettingsPage from "./components/mainContent/Settings"
import UpdatesPage from "./components/mainContent/Updates"
import LoginForm from "./components/UserLogins/login"
import clubCreate from "./components/mainContent/clubCreate"
import clubDetail from "./components/mainContent/clubDetail"
import newsCreate from "./components/mainContent/newsCreate"
import RSCVcreate from "./components/mainContent/RSCVcreate"
import RSCV from "./components/mainContent/RSCV"
import ClubManage from "./components/mainContent/ClubManage"

import eventSubmit from "./components/mainContent/eventSubmit"


Vue.use(VueRouter);

const routes = [
    {
        path: '/', component: HomeView,
        children:[
            {
                path:'/',
                component:HomePage
            },
            { path: '/clubs', component: ClubsPage },
            { path: '/members', component: MemebersPage },
            { path: '/events', component: EventsPage },
            { path: '/myaccount', component: MyAccount },
            { path: '/news', component: NewsPage },
            { path: '/settings', component: SettingsPage },
            { path: '/updates', component: UpdatesPage },
            { path: '/clubCreate', component: clubCreate },
            { path: '/clubDetail', component: clubDetail },
            { path: '/eventSubmit', component: eventSubmit },
            { path: '/newsCreate', component: newsCreate },
            { path: '/RSCVcreate', component: RSCVcreate },
            { path: '/RSCV', component: RSCV },
            { path: '/ClubManage', component: ClubManage },                          
        ]
    },
    { 
        path: '/Login', component: userLogin ,
        children:[
            {
                path:'/Login/UserLogin',component:LoginForm
            }
        ]
    }
];

const router = new VueRouter({
  routes,
});

export default router;