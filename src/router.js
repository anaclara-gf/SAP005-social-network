import { Home } from './pages/home/index.js';
import { Login } from './pages/login/index.js';
import { Register } from './pages/register/index.js';
import { Profile } from './pages/profile/index.js';
import { onNavigate } from './utils/history.js';

const routeRender = () => {
  const rootDiv = document.getElementById('root');
  const routes = {
    '/home' : Home,
    '/': Login,
    '/register' : Register,
    '/profile' : Profile
  };

  rootDiv.innerHTML = '';
  rootDiv.appendChild(routes[window.location.pathname]());
};

window.addEventListener('popstate', routeRender);

window.addEventListener('load', () => {
  document
    .getElementById('home')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('/home')
    });
  document
    .getElementById('login')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('/')
    });
  document
    .getElementById('register')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('/register')
    });
    document
    .getElementById('profile')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('/profile')
    });
  routeRender();
  ;
});
