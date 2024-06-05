import HomePage from 'pages/Home/HomePage';

export const homeRoutes = {
  path: 'home',
  children: [
    {
      index: true,
      element: <HomePage />
    }
  ]
};
