# Jupyter Book vs Sphinx Comparison

This document compares the original Jupyter Book version with the new Sphinx-only version of the Signals and Systems UFU book.

## File Structure Comparison

### Jupyter Book Version (`book/`)
```
book/
├── _config.yml          # Jupyter Book configuration
├── _toc.yml            # Table of contents
├── requirements.txt    # Dependencies
├── intro.md           # Introduction (Markdown)
├── aula_01/
│   ├── 00_motivacao.md
│   └── 01_signals.ipynb
├── historico.md
├── notebooks.ipynb
├── markdown-notebooks.md
├── images/
└── references.bib
```

### Sphinx Version (`sphinx_book/`)
```
sphinx_book/
├── conf.py             # Sphinx configuration
├── index.rst          # Main index (reStructuredText)
├── requirements.txt   # Dependencies
├── Makefile          # Build automation
├── build.sh          # Build script
├── README.md         # Documentation
├── intro.rst         # Introduction (reStructuredText)
├── aula_01/
│   ├── 00_motivacao.rst
│   └── 01_signals.ipynb
├── historico.rst
├── notebooks.ipynb
├── markdown-notebooks.rst
├── images/
├── _static/
└── references.bib
```

## Key Differences

### Configuration

**Jupyter Book:**
- Uses `_config.yml` for configuration
- Uses `_toc.yml` for table of contents
- Higher-level abstraction over Sphinx

**Sphinx:**
- Uses `conf.py` for all configuration
- Table of contents defined in `index.rst`
- Direct Sphinx configuration with full control

### Content Format

**Jupyter Book:**
- Primarily Markdown (`.md`) files
- MyST Markdown extensions
- Jupyter Book specific directives

**Sphinx:**
- Primarily reStructuredText (`.rst`) files
- Standard Sphinx directives
- More verbose but more powerful markup

### Build Process

**Jupyter Book:**
```bash
jupyter-book build book/
```

**Sphinx:**
```bash
cd sphinx_book/
make html
# or
sphinx-build -b html . _build/html
```

### Features

Both versions support:
- ✅ Math equations (MathJax)
- ✅ Jupyter notebooks
- ✅ Bibliography
- ✅ GitHub integration
- ✅ Modern theme (sphinx-book-theme)
- ✅ Copy buttons for code

**Sphinx advantages:**
- More granular control over extensions
- Better integration with Python documentation tools
- More flexible build system
- Better support for complex document structures

**Jupyter Book advantages:**
- Simpler configuration
- More intuitive for beginners
- Better integration with Jupyter ecosystem
- Less verbose markup

## Migration Notes

1. **Markdown to reStructuredText**: Most content was converted from Markdown to reStructuredText format
2. **Math syntax**: Changed from `$$...$$` to `.. math::` directives
3. **Citations**: Changed from `{cite}` to `:cite:` syntax
4. **Code blocks**: Changed from ``` to `.. code-block::` directives
5. **Links**: Changed from `[text](url)` to `` `text <url>`_ `` syntax

## Recommendations

- **Use Jupyter Book** if you prefer simplicity and are primarily working with Jupyter notebooks
- **Use Sphinx** if you need more control, are building complex documentation, or want to integrate with other Python tools

Both versions produce similar output and maintain the same content and functionality.
