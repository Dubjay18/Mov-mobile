# Mov App

This is a movie application built with React Native and Expo. The application allows users to search for movies, view
trending movies, and see details of each movie.

## Features

- Search for movies
- View trending movies
- View movie details
- Add movies to favorites

## Tech Stack

- React Native
- Expo
- TypeScript
- JavaScript
- Yarn
- NPM

## Getting Started

1. Clone the repository to your local machine.

2. Install the dependencies:

```bash
npm install
```

3. Start the application:

```bash
npx expo start
```

You can open the app in a development build, Android emulator, iOS simulator, or Expo Go.

## Project Structure

The project is structured as follows:

- `app/`: This directory contains the main application code.
    - `Movie.tsx`: This is the screen that displays the details of a movie.
    - `Search.tsx`: This is the screen that allows users to search for movies.
- `components/`: This directory contains reusable components used in the application.
    - `TrendingMovies.tsx`: This component displays a list of trending movies.
    - `MovieList.tsx`: This component displays a list of movies.
- `config/`: This directory contains configuration files, such as the API configuration.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.