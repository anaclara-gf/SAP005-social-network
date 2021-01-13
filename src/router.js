import { Login } from './pages/login/index.js';
import { Register } from './pages/register/index.js';
import { Profile } from './pages/profile/index.js';
import { Timeline } from './pages/timeline/index.js';
import { onNavigate } from './utils/history.js';

const routeRender = () => {
  const rootDiv = document.getElementById('root');
  const routes = {
    '/': Login,
    '/register': Register,
    '/profile': Profile,
    '/timeline': Timeline,
  };

  rootDiv.innerHTML = '';
  rootDiv.appendChild(routes[window.location.pathname]());
};

window.addEventListener('popstate', routeRender);

window.addEventListener('load', () => {
  // document
  //   .getElementById('login')
  //   .addEventListener('click', (e) => {
  //     e.preventDefault();
  //     onNavigate('/')
  //   });
  // document
  //   .getElementById('register')
  //   .addEventListener('click', (e) => {
  //     e.preventDefault();
  //     onNavigate('/register')
  //   });
  // document
  //   .getElementById('profile')
  //   .addEventListener('click', (e) => {
  //     e.preventDefault();
  //     onNavigate('/profile')
  //   });
  // document
  //   .getElementById('timeline')
  //   .addEventListener('click', (e) => {
  //     e.preventDefault();
  //     onNavigate('/timeline')
  //   });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      onNavigate('/timeline');
    } else {
      onNavigate('/');
    }
  });

  /* routeRender(); */
});
