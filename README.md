# 🚀 Automation Project with Playwright + ShiftLeft Testing

This repository contains automated tests for a **TODO list application**. It
integrates **Playwright** for testing, alongside **ShiftLeft Testing practices**
to ensure that high-quality standards are maintained throughout the development
lifecycle.

> "The ratio of time spent reading versus writing is well over 10 to 1. We are
> constantly reading old code as part of the effort to write new code. Making it
> easy to read makes it easier to write."  
> _Robert C. Martin (Uncle Bob)_

---

## ⚙️ Tools and Features

This project is equipped with a robust suite of tools and configurations to
maintain code quality, ensure reliability, and promote maintainability:

### 🛠 TypeScript Configuration

- **Strict TypeScript Settings**: Enforced via a carefully configured `tsconfig`
  to enhance type safety and project structure.

### 🖋️ Code Style and Linting

- **ESLint**: Enforced with Prettier and the Airbnb Style Guide for consistent
  code quality.
- **Prettier**: Ensures uniform code formatting across the entire project.
- **Explicit Type Definitions**: Encourages clear, explicit type definitions in
  TypeScript, improving code readability and safety.

### 🧪 Test Execution

- **Playwright Integration**: Automates testing for the TODO application.
- **Randomized Test Execution** (Planned): Randomizing test order to detect
  hidden dependencies and ensure test independence.

### 🛡️ Quality Assurance

- **SonarQube**: Integrated for continuous code quality analysis.
- **Gherkin Linter**: Maintains consistency and best practices in Gherkin syntax
  for Behavior-Driven Development (BDD).

### 👨‍💻 Development Environment

- **VSCode & IntelliJ IDEA Settings**: Pre-configured IDE settings for an
  optimal development experience.
- **Husky**: Pre-commit hooks to enforce linting and running tests before
  committing code.

### 🔄 CI/CD Integration

- **GitHub Actions**: Automates the build, test, and deployment pipelines,
  ensuring continuous integration and delivery.

### 🚀 NPM Scripts

- **NPM Aliases**: Simplifies common tasks with custom npm scripts,
  standardizing workflows.

---

## 🛠️ Tech Stack

- **Node.js**: JavaScript runtime environment.
- **NPM**: Node.js package manager used for dependency management and script
  execution.

---

## ℹ️ Getting Started

### Installation

To set up the project locally, execute the following commands to install the
required dependencies:

```bash
npm install
npx playwright install
```

### Running the Tests

Once the environment is set up, you can run the tests with these commands:

- **Run all tests**:
  ```bash
  npm run test
  ```

- **Run tests with a headed browser**:
  ```bash
  npm run test-headed
  ```

- **Run tests in interactive mode**:
  ```bash
  npm run test-interactive
  ```

- **Generate and view test reports**:
  ```bash
  npm run test-report
  ```

---

## 📊 Reporting

After running tests, both the Playwright HTML report and the Allure report
should be generated automatically.

### Opening Allure Report

To open the generated Allure report locally, run the following command:

```bash
npm run test:report:open
```

Alternatively, you can download the reports directly from GitHub Actions:

1. Navigate to your GitHub repository.
2. Go to `Actions > [Latest Action] > Artifacts > reports.zip`.
3. Extract the `reports.zip` file, then open `index.html` using Chrome:

    ```bash
    open -a "Google Chrome" --args --allow-file-access-from-files "$(pwd)/.run/reports/allure/index.html"
    ```

---

## 🤝 Contributing

We welcome your contributions! For details on how to contribute, please refer to
our [Contribution Guidelines](docs/CONTRIBUTE-js.md).

---

## 💻 Development Guidelines

For more detailed instructions on setting up the development environment, as
well as contribution guidelines, please refer to
our [Contribution Guidelines](docs/CONTRIBUTE-js.md).

---

## 📝 Conclusion

By following the steps outlined in this guide, you’ll be able to set up and work
on this project efficiently. If you encounter any issues or have suggestions,
feel free to contribute or open an issue. Happy coding! 🎉
