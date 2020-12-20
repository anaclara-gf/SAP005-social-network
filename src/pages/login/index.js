export const Login = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <div class="flex-container">
        <img class="flex-itens" src="../images/logo.jpg">
        <form class="flex-container">

          <label class="flex-itens" for="email">E-mail:</label>
          <input class="flex-itens" id="email" type="email" placeholder="E-mail" required>

          <label class="flex-itens" for="password">Password:</label>
          <input class="flex-itens" id="password" type="password" placeholder="Password" required>

          <button class="flex-itens">Sign in</button>
          <button class="flex-itens">Sign in with Google</button>
        </form>

        <p class="flex-itens">Don't have an account yet?</p>
        <button class="flex-itens">Sign up</button>
      </div>
  `;
  return rootElement;
};
