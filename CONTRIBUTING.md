# Contributing to Signals UFU

Thank you for your interest in contributing to the Signals UFU Jupyter Book! This guide will help you get started with contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Documentation Guidelines](#documentation-guidelines)
- [Style Guidelines](#style-guidelines)
- [Testing](#testing)
- [Questions and Support](#questions-and-support)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

### Prerequisites

- Git
- Conda or Miniconda
- A GitHub account

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/signals_UFU.git
   cd signals_UFU
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/cristofer/signals_UFU.git
   ```

## Development Setup

### 1. Create the Conda Environment

```bash
# Create the environment from the environment.yml file
conda env create -f environment.yml

# Activate the environment
conda activate signals
```

### 2. Verify Installation

```bash
# Test that jupyter-book is working
jupyter-book build book/

# Check if the build was successful
ls book/_build/html/
```

### 3. Development Workflow

1. **Create a new branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. **Make your changes** to the relevant files in the `book/` directory

3. **Test your changes** by building the book:
   ```bash
   jupyter-book build book/
   ```

4. **Preview your changes** by serving the built book:
   ```bash
   cd book/_build/html
   python -m http.server 8000
   # Then open http://localhost:8000 in your browser
   ```

## Making Changes

### Types of Contributions

We welcome several types of contributions:

- **Content improvements**: Fixing typos, improving explanations, adding examples
- **New content**: Adding new chapters, sections, or notebooks
- **Technical improvements**: Updating dependencies, improving build process
- **Documentation**: Improving this guide, README, or inline documentation
- **Bug fixes**: Fixing issues with the book content or build process

### File Structure

```
signals_UFU/
├── book/                    # Main book content
│   ├── _config.yml         # Jupyter Book configuration
│   ├── _toc.yml           # Table of contents
│   ├── *.md               # Markdown content files
│   ├── *.ipynb            # Jupyter notebooks
│   └── _build/            # Built book (generated)
├── .github/
│   └── workflows/         # GitHub Actions
├── environment.yml        # Conda environment
└── CONTRIBUTING.md        # This file
```

### Content Guidelines

- **Markdown files**: Use clear, concise language and proper formatting
- **Jupyter notebooks**: 
  - Clear cell outputs before committing
  - Use descriptive cell titles
  - Include markdown explanations between code cells
  - Test all code cells to ensure they run without errors

## Submitting Changes

### 1. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Add: Brief description of your changes

- More detailed explanation if needed
- Reference any related issues"
```

### 2. Push and Create Pull Request

```bash
# Push your branch
git push origin feature/your-feature-name
```

Then:
1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your branch and the main repository
4. Fill out the pull request template
5. Submit the pull request

### Pull Request Guidelines

- **Title**: Use a clear, descriptive title
- **Description**: Explain what changes you made and why
- **Testing**: Describe how you tested your changes
- **Screenshots**: Include screenshots for visual changes
- **Issues**: Reference any related issues using `#issue_number`

## Documentation Guidelines

### Writing Style

- Use clear, concise language
- Write for your target audience (students learning signals and systems)
- Include examples and practical applications
- Use proper mathematical notation
- Include references where appropriate

### Markdown Best Practices

- Use proper heading hierarchy (H1 → H2 → H3)
- Include alt text for images
- Use code blocks with language specification
- Link to external resources when helpful

### Jupyter Notebook Best Practices

- Clear all outputs before committing
- Use markdown cells for explanations
- Include docstrings in functions
- Test all code cells
- Use consistent variable naming

## Style Guidelines

### Code Style

- Follow PEP 8 for Python code
- Use meaningful variable names
- Include comments for complex logic
- Keep functions focused and small

### Mathematical Notation

- Use LaTeX for mathematical expressions
- Be consistent with notation throughout the book
- Define symbols when first introduced

## Testing

### Before Submitting

1. **Build the book**:
   ```bash
   jupyter-book build book/
   ```

2. **Check for errors** in the build output

3. **Preview the built book**:
   ```bash
   cd book/_build/html
   python -m http.server 8000
   ```

4. **Test all interactive elements** (if any)

### Continuous Integration

The project uses GitHub Actions to automatically:
- Build the book on every push
- Deploy to GitHub Pages
- Check for common issues

Your pull request will be automatically tested.

## Questions and Support

### Getting Help

- **Issues**: Open an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact the maintainers directly if needed

### Before Asking

1. Check existing issues and discussions
2. Review the documentation
3. Try to reproduce the issue
4. Provide as much detail as possible

## Recognition

Contributors will be recognized in:
- The book's acknowledgments
- The project's README
- Release notes for significant contributions

## Thank You

Thank you for contributing to Signals UFU! Your contributions help make this resource better for students and educators worldwide.

---

*This contributing guide is a living document. Please suggest improvements by opening an issue or pull request.*
