# Contributing to Heracles

We appreciate your interest in contributing to **Heracles**. Whether you're fixing bugs, improving documentation, adding features, or suggesting enhancements — your help is welcome.

---

## Ground Rules

- Use clear, concise commit messages.
- Write clean, maintainable code that follows project conventions.
- Keep pull requests focused and minimal.
- Open an issue first for major feature suggestions or changes.
- Test your changes before submitting.

---

## Getting Started

1. **Fork** the repository.

2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/dave1725/heracles.git
   cd heracles
   ```
3. Run terminal as Administrator

    Heracles requires elevated privileges to execute PowerShell scripts and interact with system-level resources
    > Make sure to open your terminal (CMD or PowerShell) as Administrator for proper execution.

4. Install dependencies:

    ```bash
    npm install
    ```
5. Start the development server
    ```bash
    npm run dev
    ```

## Project Structure
`/app` – Next.js app routes and pages

`/scripts` – PowerShell scripts used for system-level operations

`/components` – Reusable UI components

`/app/api` – Backend logic via Next.js API routes

## Submitting a Pull Request
1. Create a new branch:

    ```bash
    git checkout -b feature/your-feature-name
    ```

2. Make your changes and commit them:

    ```bash
    git commit -m "Add your message here"
    ```

3. Push to your fork and open a pull request:

    ```bash
    git push origin feature/your-feature-name
    ```

## Reporting Issues
> If you’ve found a bug or a security vulnerability, please open an issue with clear steps to reproduce it. For security reports, please use a private channel when possible.



**Thank you for helping make Heracles better for everyone. ❣️**

