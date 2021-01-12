import { onNavigate } from '../../utils/history.js';
import { signInGoogle, SignIn, InfoProfileEmail, verifyUser, stayLogged } from '../../services/index.js';

export const Login = () => {
	const rootElement = document.createElement('div');
	rootElement.innerHTML = `
      <div class="flex-container">

        <article class="introText">
          <h1>Welcome to our community!</h1>
          <p>Tired of spend hours looking at streaming service catalogs to find something interesting to watch? We have the perfect solution for you! Join our community <strong><i>SHOULD I WATCH?</i></strong> and see what your friends are watching and their opinions about series, movies, documentaries and more! You can also write your own reviews and post it for your friends, all you need to do is create an account or login.</p>
        </article>

        <form class="login">

          <label class="flex-itens" for="email">E-mail:</label>
          <input class="flex-itens" id="email" type="email" placeholder="E-mail" required>

          <label class="flex-itens" for="password">Password:</label>
          <input class="flex-itens" id="password" type="password" placeholder="Password" required>
          <p class= "flex-itens" id= "nonUser"></p>

          <button id="signin-button" class="flex-itens">Sign in</button>
          <button id="signingoogle-button" class="flex-itens">Sign in with Google</button>
        </form>

        <p class="flex-itens">Don't have an account yet?</p>
        <button id="signup-button" class="flex-itens">Sign up</button>
      </div>
  `;

	const email = rootElement.querySelector('#email');
	const password = rootElement.querySelector('#password');
	const newUser = rootElement.querySelector('#nonUser');
	const signInButton = rootElement.querySelector('#signin-button');
	const signInGoogleButton = rootElement.querySelector('#signingoogle-button');
	const signUpButton = rootElement.querySelector('#signup-button');

  signInButton.addEventListener('click', (e) => {
    e.preventDefault();
    SignIn(email.value, password.value)
      .then(() => {
      })
      .catch((error) => {
        newUser.innerHTML = error.message
      })
  });

	signInGoogleButton.addEventListener('click', (e) => {
		e.preventDefault();
		signInGoogle()
			.then(() => {
				verifyUser()
					.then((result) => {
						if (result.size < 1) {
							InfoProfileEmail();
							onNavigate('/profile');
						} else {
							onNavigate('/timeline');
						}
					})
					.catch((error) => {
						alert(error.message);
					});
				stayLogged()
					.then(() => {
						SignIn(email.value, password.value);
					})
					.catch((error) => {
						alert(error.message);
					});
			})
			.catch((error) => {
				alert(error.message);
			});
	});

	signUpButton.addEventListener('click', () => {
		onNavigate('/register');
	});

	return rootElement;
};
