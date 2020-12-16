export const Login = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <div class="flex-container">
        <img class="flex-itens" src="..\images\logo.png">
        
          <input class="flex-itens" type="email" placeholder="E-mail" required>
          <input class="flex-itens" type="password" placeholder="Password" required>
          <button class="flex-itens"> Log In </button>
        
        <button class="flex-itens"> Sig in with Google </button>
        <p class="flex-itens"> Register </p>
      </div>
  `;
  return rootElement;
};
