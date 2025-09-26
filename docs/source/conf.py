# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Análise de Sinais UFU - Notas de aula'
copyright = '2025, Cristofer Antoni'
author = 'Cristofer Antoni'
release = '1.0'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = ['myst_parser', 'sphinxcontrib.bibtex']

# if you use sphinxcontrib.bibtex you must configure the bibtex_bibfiles setting
bibtex_bibfiles = ['references.bib']

# To render math equations in markdown files
myst_enable_extensions = [
    "dollarmath",
    "amsmath",  # Optional: uncomment for advanced math like \begin{equation}
    # ... any other extensions you have ...
]

templates_path = ['_templates']
exclude_patterns = []

language = 'pt'

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output
mathjax_path = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
html_theme = 'alabaster'
html_static_path = ['_static']

# -- Options for LaTeX output ------------------------------------------------

# Grouping the document tree into LaTeX files. List of tuples:
# (source start file, target name, title, author, documentclass [howto/manual]).
latex_elements = {
    # The paper size ('letterpaper' or 'a4paper').
    'papersize': 'a4paper',

    # The font size ('10pt', '11pt' or '12pt').
    'pointsize': '11pt',
}

latex_documents = [
    ('index', 'analise_de_sinais.tex', 'Análise de Sinais UFU - Notas de aula',
     'Cristofer Antoni Souza Costa', 'manual'),
]
