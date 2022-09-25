import { SignInPage } from './src/pages/sign_in/sign_in';
import { SignUpPage } from './src/pages/sign_up/sign_up';
import { Error404Page } from './src/pages/error/error_404';
import { Error500Page } from './src/pages/error/error_500';
import { ProfilePage } from './src/pages/profile/profile';
import { ChatPage } from './src/pages/chat/chat';
import Router from './src/utils/Router';
import store from './src/utils/Store';
import AuthController from './src/controllers/AuthController';

enum Routes {
  Index = '/',
  Register = '/signUp',
  Profile = '/profile',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Index, SignInPage)
    .use(Routes.Register, SignUpPage)
    .use(Routes.Profile, ProfilePage)

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Profile)
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }

});

