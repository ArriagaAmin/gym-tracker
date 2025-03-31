# Gym Tracker

Gym Tracker is a cross-platform application built with Electron, Next.js, TypeScript, 
and React. It allows users to track their gym progress, manage workouts, and monitor their
fitness goals.

## Features

- Track workouts and progress
- Manage users and profiles
- Cross-platform support (Windows, macOS, Linux)
- Real-time updates and notifications
- User-friendly interface with React components

## Installation

Follow these steps to set up the Gym Tracker application on your local machine:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/arriagaamin/gym-tracker.git
   cd gym-tracker
   ```

2. **Install Dependencies**

   ```bash
   yarn install
   ```

3. **Start the Development Server**

   ```bash
   yarn dev
   ```

   This will start the Next.js development server with Electron.

## Build and Package

To build and package the application for production, follow these steps:

1. **Build the Next.js Application**

   ```bash
   yarn build
   ```

   This will create a packaged version of the application for your platform.

## Usage

1. **Start the Application**

   After packaging, you can start the application by running the executable file generated in the `dist` directory.

2. **Access the Application**

   Open the application and start tracking your gym progress.

## Project Structure

```
gym-tracker/
├── api/                    # API submodule
├── main/                   # Electron configuration
├── renderer/
│   ├── components/         # Front pieces used on the pages
│   │   ├── index.ts
│   │   └── ...
│   ├── objects/            # Interfaces and classes
│   │   ├── index.ts
│   │   └── ...
│   ├── public/             # Public resources
│   │   └── ...
│   ├── services/           # Functions for accessing APIs or external services
│   │   ├── index.ts
│   │   └── ...
│   ├── styles/             # CSS global styles
│   │   ├── index.ts
│   │   └── ...
│   ├── utils/              # Functions, constants or utility objects
│   │   ├── index.ts
│   │   └── ...
|   └── ...
├── public/
│   ├── favicon.ico
│   └── ...
├── package.json
├── tsconfig.json
├── .gitignore
├── README.md
└── ...
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Make your changes and commit them (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need further assistance, feel free to reach out:

- Name: Arriaga Amin
- Email: aminlorenzo.14@gmail.com
- GitHub: [arriagaamin](https://github.com/arriagaamin)

- Name: Jesus Palma
- Email: ?

---

Thank you for using Gym Tracker!
