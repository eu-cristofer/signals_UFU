# Signals and Systems UFU

Repository to store codes, computational results, and literature review resources related to the study of signals and systems, with a special emphasis on rotordynamics and fault analysis, developed as part of my master’s degree.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Repository Structure](#repository-structure)
3. [Technologies Used](#technologies-used)
4. [Broad Study Plan: Literature Review](#broad-study-plan-literature-review)
5. [How to Contribute](#how-to-contribute)
6. [License](#license)

## Project Overview

This project aims to support a comprehensive literature review and practical study in the field of signals and systems, with the following main objectives:

- **Survey advanced spectral analysis techniques** such as Fast Fourier Transform (FFT), bispectrum, trispectrum and time frequency analisys as applied to fault detection in rotordynamics.
- **Review machine learning methods** for signal classification, especially for distinguishing fault conditions.
- **Compare methodologies and results** with state-of-the-art approaches reported in the literature.

## Repository Structure

- `src/`: Source code for signal simulation, spectral analysis, and classification experiments.
- `data/`: Simulated and real datasets referenced in the literature and used in experiments.
- `results/`: Outputs of analysis, figures, and comparative tables.
- `docs/`: Literature review notes, summaries, and bibliographic references.

## Broad Study Plan: Literature Review

### Programa do Curso

O programa do curso conforme proposto pelo professor Marcus Antonio Ferreira Duarte.

| Letra | Tópico                                                                 | Carga Horária         |
|-------|------------------------------------------------------------------------|-----------------------|
| A     | Descrições básicas e propriedades de sinais                            | 04 teóricas           |
| B     | Fundamentos de Probabilidade                                           | 04 teóricas           |
| C     | Processamento digital de sinais                                        | 08 teóricas / 04 lab  |
| D     | Sistemas físicos lineares                                              | 04 teóricas           |
| E     | Processos Estacionários                                                | 08 teóricas / 04 lab  |
| F     | Sistemas de uma entrada e uma saída                                    | 08 teóricas / 04 lab  |
| G     | Erros estatísticos dos estimadores                                     | 08 teóricas           |

---

### Aulas de Laboratório

- **Descrição básica e propriedades estatísticas de sinais:** funções de correlação e auto densidades espectrais.
- **Análise de sistemas físicos lineares.**
- **Análise de sistemas físicos lineares** – Erros nos estimadores.
- Aulas adicionais podem ser elaboradas para auxiliar o desenvolvimento da dissertação/tese do aluno.

### 🎯 Learning Objectives

After completing this book, students will be able to:

- [ ] Classify signals and systems according to their properties
- [ ] Analyze linear time-invariant (LTI) systems using various mathematical tools
- [ ] Apply frequency domain techniques for signal analysis and system design
- [ ] Design basic filters for signal processing applications
- [ ] Understand sampling theory and its implications in digital signal processing
- [ ] Use computational tools (Python/MATLAB) for signal analysis and visualization

### 1. Fundamentals of Signals and Systems
- Review textbooks and key papers on signals, systems, and their mathematical foundations.
- Summarize key concepts: time and frequency domain analysis, linear and nonlinear system behavior.

### 2. Spectral Analysis Techniques
- Study the theory and application of FFT, bispectrum, trispectrum, and related higher-order spectral methods.
- Compare the strengths, limitations, and implementation details of each method.
- Document findings from influential publications and textbooks.

### 3. Feature Extraction and Fault Diagnosis
- Survey approaches for extracting features from spectral analysis, with emphasis on fault detection in rotordynamic systems.
- Review case studies and experiments from the literature.
- Summarize common signal characteristics associated with different fault types.

### 4. Machine Learning for Signal Classification
- Explore supervised and unsupervised learning techniques for classifying faults using extracted features.
- Compare algorithms such as SVM, Random Forest, Neural Networks, and others.
- Analyze validation methods, metrics, and benchmarking strategies as presented in the literature.

### 5. Comparative Analysis
- Synthesize methodologies and results from reviewed papers and reports.
- Identify trends, gaps, and opportunities for improvement in the field.
- Prepare comparative tables and visualizations to summarize literature findings.

### 6. Practical Implementation and Experimentation
- Validate and compare results with those reported in the literature.