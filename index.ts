import SignInPage from "./src/pages/sign_in/sign_in";


document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');
  const signInPage = new SignInPage({});

  root!.append(signInPage.getContent()!);

  signInPage.dispatchComponentDidMount();
})
