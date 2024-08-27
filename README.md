# Automation Project with Playwright + Shiftleft Testing

This project contains automated tests for a TODO list application, utilizing
Playwright and **Shiftleft Testing practices and tools** to ensure high-quality
code from the
start.

> The ratio of time spent reading versus writing is well over 10 to 1. We are
> constantly reading old code as part of the effort to write new code. …making
> it
> easy to read makes it easier to write.

_Robert C. Martin (a.k.a. Uncle Bob)_

---

## 🚀 Tools and Features

This project is equipped with a comprehensive set of tools and configurations to
maintain high-quality, reliable, and maintainable code:

- **TypeScript Configuration**: Strict `tsconfig` settings for improved type
  safety and project structure.
- **Code Style and Linting**:
    - **ESLint**: Enforced with Prettier and the Airbnb Style Guide for
      consistent code quality.
    - **Prettier**: Ensures uniform code formatting across the project.
    - ⭐️ **Explicit Type Definitions**: Enforces the use of explicit types in
      TypeScript for better clarity and safety.
- **Test Execution**:
    - **Randomized Test Execution**: (Planned) ~~To uncover hidden dependencies
      by
      running tests in a random order.~~
- **Quality Assurance**:
    - **SonarQube**: Integrated for continuous code quality analysis.
    - **Gherkin Linter**: Maintains consistency in Gherkin syntax for BDD (
      Behavior-Driven Development).
- **Development Environment**:
    - **VSCode & IntelliJ IDEA Settings**: Pre-configured settings for an
      optimal development experience.
    - **Husky**: Git hooks for enforcing pre-commit checks, such as linting and
      running tests.
- **CI/CD**:
    - **GitHub Actions**: Automates the build, test, and deployment processes to
      ensure continuous integration and delivery.
- **NPM Aliases**: Standardizes and simplifies the execution of common tasks via
  custom npm scripts.

---

## 🤝 How to Contribute

We welcome and appreciate your contributions! Please refer to
our [Contribution Guidelines](docs/CONTRIBUTE-js.md) for instructions on how to
get involved.

---

## 🛠️ Tech Stack

- **Node.js**: The JavaScript runtime environment used for the project.
- **NPM**: Node.js package manager for handling dependencies and scripts.

---

## ℹ️ Getting Started

### Installation

To set up the project locally, run the following command to install all
necessary dependencies:

```bash
npm install
```

### Running the Tests

Once the environment is set up, you can run the tests using the following
commands:

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

### Development

For detailed development instructions, including environment setup and
contribution guidelines, please refer to
our [Contribution Guidelines](docs/CONTRIBUTE-js.md).

---

By following this guide, you should be able to get up and running with the
project quickly and efficiently. Happy coding! 🎉
