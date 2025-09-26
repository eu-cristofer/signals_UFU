# How to Create and Deploy a Sphinx Documentation Website

This tutorial provides a complete walkthrough for creating a documentation project using Sphinx, writing content in Markdown, customizing the output for a professional-looking PDF, and deploying the final HTML website to GitHub Pages. It consolidates common setup steps and troubleshooting solutions.

---

## 1. Prerequisites 🧑‍💻

Before you begin, ensure you have the following software installed on your system:

* **Python and pip**: Sphinx is a Python tool. Download from [python.org](https://python.org).
* **A LaTeX Distribution**: Required for building PDF documents.
    * **Windows**: [MiKTeX](https://miktex.org/)
    * **macOS**: [MacTeX](https://www.tug.org/mactex/)
    * **Linux**: `sudo apt-get install texlive-full`
* **Git**: Required for version control and deploying to GitHub. Download from [git-scm.com](https://git-scm.com/).

---

## 2. Setting Up Your Sphinx Project 🚀

1.  **Create a Project Folder** and navigate into it:
    ```bash
    mkdir my-docs
    cd my-docs
    ```

2.  **Create a Virtual Environment** (recommended) and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3.  **Install Sphinx**:
    ```bash
    pip install sphinx
    ```

4.  **Run Quick-Start**: This utility generates your project structure.
    ```bash
    sphinx-quickstart
    ```
    Answer the prompts as follows:
    * `Separate source and build directories (y/n) [n]`: **y**
    * Provide your project name, author, and release version.

---

## 3. Writing Content with Markdown ✍️

By default, Sphinx uses reStructuredText. To use Markdown, you need the `myst-parser` extension.

1.  **Install `myst-parser`**:
    ```bash
    pip install myst-parser
    ```

2.  **Configure `conf.py`**: Open `source/conf.py` and add `'myst_parser'` to the `extensions` list.
    ```python
    # source/conf.py
    extensions = [
        'myst_parser',
    ]
    ```

3.  **Create Content**: You can now create `.md` files in the `source/` directory. Link them in the `toctree` (Table of Contents Tree) in `source/index.rst` to make them part of your documentation.

    ```rst
    # source/index.rst
    .. toctree::
       :maxdepth: 2
       :caption: Contents:

       getting-started.md
       another-page.md
    ```

---

## 4. Configuring for Book-Like PDF Output 📄

To make your PDF output look like a book, edit `source/conf.py`.

1.  **Set the Document Class**: Find the `latex_documents` variable and set the document class to `'manual'`. Replace the title with a clean, human-readable one.

    ```python
    # source/conf.py
    latex_documents = [
        ('index', 'my-project.tex', 'My Awesome Project Title',
         'Your Name', 'manual'),
    ]
    ```

2.  **Customize LaTeX Elements**: Use the `latex_elements` dictionary to control appearance. Since your content is in Portuguese, setting the `babel` package is important for correct hyphenation and terminology.

    ```python
    # source/conf.py
    latex_elements = {
        'papersize': 'a4paper',
        'pointsize': '11pt',
        # Set language for LaTeX
        'babel': r'\usepackage[brazil]{babel}',
    }
    ```

---

## 5. Handling Math and Equations 🧮

To render math formulas correctly in both HTML and PDF from Markdown files:

1.  **Enable Math Extensions**: In `source/conf.py`, add `"dollarmath"` and `"amsmath"` to `myst_enable_extensions`.

    ```python
    # source/conf.py
    myst_enable_extensions = [
        "dollarmath",
        "amsmath",
    ]
    ```

2.  **Write Math**: Use the correct syntax in your `.md` files.
    * **Inline Math**: Use single dollar signs: `A formula $E = mc^2$ within a sentence.`
    * **Display Math**: Use double dollar signs for equations on their own line:
        ```
        $$
        \sum_{i=1}^{n} i = \frac{n(n+1)}{2}
        $$
        ```

3.  **Optional: Local MathJax**: For offline HTML viewing, you can host the MathJax library locally. Download MathJax, place it in `source/_static/`, and set the path in `conf.py`:
    ```python
    # source/conf.py
    mathjax_path = 'mathjax/es5/tex-mml-chtml.js'
    ```

---

## 6. Adding a Bibliography 📚

To manage and display citations:

1.  **Install the Extension**:
    ```bash
    pip install sphinxcontrib-bibtex
    ```

2.  **Create a `.bib` file**: Create a file like `source/references.bib` and add your BibTeX entries.
    ```bibtex
    @book{knuth1984,
      author    = {Donald E. Knuth},
      title     = {The TeXbook},
      publisher = {Addison-Wesley},
      year      = {1984},
    }
    ```

3.  **Configure `conf.py`**: Add the extension and point to your `.bib` file.
    ```python
    # source/conf.py
    extensions = [
        'myst_parser',
        'sphinxcontrib.bibtex'
    ]

    bibtex_bibfiles = ['references.bib']
    ```

4.  **Cite and Display**:
    * Cite sources in your text using `{cite}`knuth1984`.
    * Display the bibliography list with the `{bibliography}` directive.
        ````
        ## Referências

        ```{bibliography}
        :style: unsrt
        ```
        ````

---

## 7. Building Your Documentation 🛠️

From your project's root directory, run the following commands:

* **Build HTML**: `make html` (Output is in `build/html`)
* **Build PDF**: `make latexpdf` (Output is in `build/latex`)
* **Clean Build**: `make clean` (Deletes the `build` folder; useful for troubleshooting)

---

## 8. Deploying to GitHub Pages 🌐

1.  **Create a GitHub Repository**: Create a new, public repository on GitHub.

2.  **Prepare Local Project**: In your project's root folder, initialize Git and create a `.gitignore` file.
    ```bash
    # .gitignore
    build/
    venv/
    ```
    ```bash
    git init
    git remote add origin [https://github.com/your-username/your-repo.git](https://github.com/your-username/your-repo.git)
    ```

3.  **Install `ghp-import`**: This tool simplifies deployment.
    ```bash
    pip install ghp-import
    ```

4.  **Deploy**: Run the `ghp-import` command to push your `build/html` folder to the `gh-pages` branch.
    ```bash
    ghp-import -n -p build/html
    ```

5.  **Configure GitHub Pages**: In your repository settings on GitHub, go to **Pages**. Set the source to **Deploy from a branch** and select the **`gh-pages`** branch with the **`/ (root)`** folder.

6.  **Push Source Code**: Don't forget to push your source files (`.md`, `conf.py`, etc.) to the `main` branch.
    ```bash
    git add .
    git commit -m "Initial commit of documentation source"
    git push origin main
    ```

---

## 9. Troubleshooting Common Errors 🔍

* **`! Missing $ inserted` in PDF Build**: This is almost always caused by an unescaped underscore (`_`) in `conf.py` metadata (like `project` or `author`) or in the `latex_documents` title. **Fix**: Escape the underscore with a backslash (`\_`).
* **`pdflatex: gave an error in previous invocation`**: A previous build failed and left broken files. **Fix**: Run `make clean` before trying to build again.
* **Math Renders as Text (`$$x_2$$`)**: The math extension for MyST is not enabled. **Fix**: Ensure `"dollarmath"` is in the `myst_enable_extensions` list in `conf.py`.

---

## 10. References and Further Reading

* [Sphinx Documentation](https://www.sphinx-doc.org/en/master/)
* [MyST Parser Documentation](https://myst-parser.readthedocs.io/en/latest/)
* [sphinxcontrib-bibtex Documentation](https://sphinxcontrib-bibtex.readthedocs.io/en/latest/)
* [GitHub Pages Documentation](https://docs.github.com/en/pages)