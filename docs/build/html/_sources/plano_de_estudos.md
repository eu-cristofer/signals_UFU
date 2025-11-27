# Plano de Estudos

> *Atualizado em **27.XI.2025***.

Este planto tem por objetivo estruturar um estudo integrado da literatura clássica abordando Vibrações Mecânicas e Processamento de Sinais, com foco em aplicações para detecção de falhas em máquinas rotativas.

---

## Referências

Para o referido objetivo, as seguintes obras foram adotadas: **Rao**, "Mechanical Vibrations" {cite}`rao_mechanical_2018` e **Oppenheim**, "Signals and Systems" {cite}`oppenheim_signals_1997`.

Dados completos das referências adotadas:

```{bibliography}
:filter: docname in docnames
:style: unsrt
```
---

## Fase 1: Fundamentos e Conexões Iniciais

**Objetivo:** Construir o vocabulário básico de ambas as áreas, entendendo como um sinal de vibração é gerado (Rao) e como ele pode ser representado e analisado matematicamente (Oppenheim).

| Tópico de Vibrações (Rao) ⚙️ | Capítulos (Rao) | Tópico de Sinais (Oppenheim) 📊 | Capítulos (Oppenheim) | Objetivo da Semana |
| :--- | :--- | :--- | :--- | :--- |
| **Fundamentos da Vibração e Vibração Livre de Sistemas com 1 GDL** | **Cap. 1:** Fundamentals of Vibration <br> **Cap. 2:** Free Vibration of Single-Degree-of-Freedom Systems | **Introdução aos Sinais e Sistemas** | **Cap. 1:** Signals and Systems | Entender a "anatomia" de uma vibração (equação do movimento) e a "anatomia" de um sinal (representação matemática). |
| **Vibração Forçada (Harmonicamente Excitada) de Sistemas com 1 GDL** | **Cap. 3:** Harmonically Excited Vibration | **Sistemas Lineares Invariantes no Tempo (LTI)** | **Cap. 2:** Linear Time-Invariant Systems | Conectar a **causa** (força, desbalanceamento) com o **efeito** (sinal de vibração resultante) usando o conceito de resposta de um sistema a uma entrada. |
| **Vibração Sob Condições Gerais de Força** (foco em forças periódicas) | **Cap. 4:** Vibration Under General Forcing Conditions (Seções 4.1 a 4.4) | **Análise de Sinais Periódicos: Séries de Fourier** <br> **A Transformada de Fourier (Tempo Contínuo)** | **Cap. 3:** Fourier Series Representation of Periodic Signals <br> **Cap. 4:** The Continuous-Time Fourier Transform | **Ponto Chave:** Unificar o conceito de Fourier, vendo como ele descreve tanto a *força de excitação* (Rao) quanto o *sinal de resposta* (Oppenheim). |

## Fase 2: Modelagem de Sistemas Reais e Análise Digital

**Objetivo:** Aplicar os fundamentos a sistemas mais complexos (Múltiplos GDLs, Rotores) e focar nas ferramentas computacionais que você efetivamente usará no seu projeto. Esta fase deve ser desenvolvida em paralelo com o início do seu trabalho prático no software ROSS.

| Tópico de Vibrações (Rao) ⚙️ | Capítulos (Rao) | Tópico de Sinais (Oppenheim) 📊 | Capítulos (Oppenheim) | Objetivo da Semana |
| :--- | :--- | :--- | :--- | :--- |
| **Sistemas com Dois Graus de Liberdade** | **Cap. 5:** Two-Degree-of-Freedom Systems | **Amostragem** | **Cap. 7:** Sampling | Entender como modelar sistemas com múltiplos modos de vibrar e como coletar dados desses sistemas para um computador (Teorema de Nyquist, aliasing). |
| **Dinâmica de Rotores** (Tópico Central para sua Dissertação) | **Cap. 11:** Mechanical Vibration and Rotor Dynamics (foco nas seções de velocidade crítica, resposta a desbalanceamento, etc.) | **A Transformada de Fourier de Tempo Discreto (DTFT)** <br> **A Transformada Discreta de Fourier (DFT)** | **Cap. 5:** The Discrete-Time Fourier Transform (conceitual) <br> **Seções 8.6 e 8.7** do **Cap. 8:** The Discrete Fourier Transform | **Foco Prático:** Aprender a física dos sinais que o ROSS irá gerar (Rotores) e a ferramenta matemática (DFT/FFT) que você usará para analisá-los. |
| **Determinação de Frequências Naturais e Vettres Modais** <br> **Método dos Elementos Finitos (MEF)** | **Cap. 6:** Multi-Degree-of-Freedom Systems <br> **Cap. 8:** The Finite Element Method | **Propriedades e Aplicações da DFT** | **Cap. 8 e 9:** (revisar DFT e suas aplicações como filtragem e correlação) | Aprofundar no método numérico por trás do ROSS (MEF) e nas técnicas para aplicar a FFT corretamente (janelamento, vazamento espectral, etc.). |

## Fase 3: Tópicos Avançados e Foco na Pesquisa

**Objetivo:** Transicionar dos livros-texto para a literatura específica da sua proposta, usando a base construída para entender e implementar os Espectros de Ordem Superior (HOS).

| Ação de Pesquisa 🔬 | Leitura de Apoio e Referência | Objetivo |
| :--- | :--- | :--- |
| **Modelagem de Falhas (Trincas) no ROSS:** Investigar como a trinca introduz não-linearidades no modelo (ex: rigidez variante no tempo). | **Rao (referência):** `Cap. 13: Nonlinear Vibration`. <br> **Artigos:** Buscar por "breathing crack model", "rotor dynamics with crack". | Entender a **origem física** das assinaturas não-lineares que você buscará nos sinais de vibração. |
| **Estudo de Espectros de Ordem Superior (HOS):** Focar na leitura do artigo de Sinha (2007) e outros artigos sobre bi-espectro e tri-espectro. | **Oppenheim (referência):** Usar como consulta para qualquer dúvida fundamental sobre teoria de sinais (convolução, correlação, propriedades de Fourier) que surgir ao ler os artigos. | Aprender a teoria por trás da **ferramenta de análise principal** do seu trabalho. |
| **Implementação e Análise:** Começar a implementar algoritmos (em Python/MATLAB) para calcular o bi-espectro dos sinais simulados pelo ROSS. | Documentação de bibliotecas científicas (ex: `scipy.signal`, `matplotlib`, `numpy`, e possíveis pacotes específicos de análise espectral como `scipy.signal.csd`, além de exemplos e artigos que detalham implementação prática de bi-espectro); consultar códigos de referência em repositórios como GitHub ou MATLAB File Exchange. | Consolidar a capacidade de aplicar ferramentas de análise de espectros de ordem superior em dados simulados, identificando possíveis desafios práticos e estabelecendo uma base reprodutível para a etapa experimental da dissertação. |