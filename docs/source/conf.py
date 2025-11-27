# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

import os

# Fix for Windows home directory issue (works in both PowerShell and Git Bash)
if os.name == 'nt':  # Windows
    # Set USERPROFILE if not already set
    if not os.environ.get('USERPROFILE'):
        # Handle both Windows and Git Bash paths
        if 'MSYSTEM' in os.environ:  # Git Bash/MSYS2
            os.environ['USERPROFILE'] = '/c/Users/EMKA'
        else:  # Regular Windows
            os.environ['USERPROFILE'] = r'C:\Users\EMKA'
    
    # Set HOME if not already set
    if not os.environ.get('HOME'):
        if 'MSYSTEM' in os.environ:  # Git Bash/MSYS2
            os.environ['HOME'] = '/c/Users/EMKA'
        else:  # Regular Windows
            os.environ['HOME'] = r'C:\Users\EMKA'


# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Análise de Sinais UFU'
copyright = '2025, Cristofer Antoni'
author = 'Cristofer Antoni'
release = '1.0'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'myst_nb',                  # Jupyter Notebook + Markdown (already bundles myst_parser)
    'sphinxcontrib.bibtex',     # Bibliography and citation management
]

# if you use sphinxcontrib.bibtex you must configure the bibtex_bibfiles setting
bibtex_bibfiles = ['references.bib']

# To render math equations in markdown files. MyST-NB configuration
myst_enable_extensions = [
    "dollarmath",         # Enable $...$ and $$...$$ math syntax in Markdown
    "amsmath",            # Enable AMS math environments (e.g., \begin{equation}), optional
    "colon_fence",        # Enable ::: fenced blocks for admonitions and custom containers
    "deflist",            # Enable definition lists (term : definition)
    "html_admonition",    # Enable HTML-style admonitions (e.g., <div class="admonition">)
    "html_image",         # Enable HTML-style image tags (<img ...>)
    "linkify",            # Automatically convert URLs into links
    "replacements",       # Enable text replacements (e.g., (C) -> ©)
    "smartquotes",        # Enable smart quotes (convert "..." to “...”)
    "substitution",       # Enable substitution syntax (e.g., |variable|)
    "tasklist",           # Enable GitHub-style task lists ([ ] and [x])
]

# Math configuration
myst_dmath_double_inline = True
myst_dmath_allow_labels = True
myst_dmath_allow_space = True
myst_dmath_allow_digits = True

templates_path = ['_templates']
exclude_patterns = []

language = 'pt'

# Notebook execution settings
nb_execution_mode = "auto"  # or "force", "cache", "off"
nb_execution_timeout = 30

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output
mathjax_path = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
html_logo = "_static/images/signals_logo.png"
html_theme = 'sphinx_book_theme'
html_theme_options = {
    "repository_url": "https://github.com/eu-cristofer/signals_UFU",
    "repository_provider": "github",
    "use_repository_button": True,
}
html_static_path = ['_static']

# -- Options for LaTeX output ------------------------------------------------

# Grouping the document tree into LaTeX files. List of tuples:
# (source start file, target name, title, author, documentclass [howto/manual]).
latex_elements = {
    # The paper size ('letterpaper' or 'a4paper').
    'papersize': 'a4paper',

    # The font size ('10pt', '11pt' or '12pt').
    'pointsize': '11pt',

    # Unicode support for LaTeX
    'inputenc': r'\usepackage[utf8]{inputenc}',
    'fontenc': r'\usepackage[T1]{fontenc}',
    'babel': r'\usepackage[brazil]{babel}',

    # Additional packages for better Unicode support
    'preamble': r'''
        \usepackage{amsmath}
        \usepackage{amsfonts}
        \usepackage{amssymb}
        \usepackage{textgreek}
        \usepackage{textcomp}
        \usepackage{gensymb}
    ''',
}

latex_documents = [
    ('index', 'analise_de_sinais.tex', 'Análise de Sinais UFU - Notas de aula',
     'Cristofer Antoni Souza Costa', 'manual'),
]
