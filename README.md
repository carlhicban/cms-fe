
# Angular Application

This is an Contacts Management application. Follow the instructions below to run the app locally.

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (version >= 20.x)
- **npm** (Node Package Manager)
- **Angular CLI** (if not installed, you can install it globally using `npm install -g @angular/cli`)

## Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/carlhicban/cms-fe.git
cd cms-fe
```

## Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

## Running the Development Server

Once the dependencies are installed, you can start the development server with:

```bash
ng serve
```

This will start the server at `http://localhost:4200/`. Open the browser and visit this URL to see the app in action.

## Building the Application

To create a production build, run:

```bash
ng build --prod
```

This will generate the build files in the `dist/` directory.

## Running Tests

To run unit tests with Jasmine and Karma, use:

```bash
ng test
```

To run end-to-end tests, use:

```bash
ng e2e
```

## Additional Commands

- **Serve with a different port**:
    ```bash
    ng serve --port 4300
    ```

- **Generate Components, Services, etc.**:
    ```bash
    ng generate component component-name
    ng generate service service-name
    ```

## Troubleshooting

- If you encounter any issues during setup, try clearing npm's cache with:
    ```bash
    npm cache clean --force
    ```

- For more help with Angular CLI commands, you can refer to the official documentation: [Angular CLI](https://angular.io/cli).
