# Plano de Estudos Integrado: Vibrações Mecânicas e Processamento de Sinais

**Livros de Referência:**
* **Rao:** S. S. Rao, "Mechanical Vibrations", 6th Edition.
* **Oppenheim:** A. V. Oppenheim and A. S. Willsky, "Signals and Systems", 2nd Edition.

---

## Fase 1: Fundamentos e Conexões Iniciais (Duração: ~6 semanas)

**Objetivo:** Construir o vocabulário básico de ambas as áreas, entendendo como um sinal de vibração é gerado (Rao) e como ele pode ser representado e analisado matematicamente (Oppenheim).

| Semana | Tópico de Vibrações (Rao) ⚙️ | Capítulos (Rao) | Tópico de Sinais (Oppenheim) 📊 | Capítulos (Oppenheim) | Objetivo da Semana |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1-2** | **Fundamentos da Vibração e Vibração Livre de Sistemas com 1 GDL** | **Cap. 1:** Fundamentals of Vibration <br> **Cap. 2:** Free Vibration of Single-Degree-of-Freedom Systems | **Introdução aos Sinais e Sistemas** | **Cap. 1:** Signals and Systems | Entender a "anatomia" de uma vibração (equação do movimento) e a "anatomia" de um sinal (representação matemática). |
| **3-4** | **Vibração Forçada (Harmonicamente Excitada) de Sistemas com 1 GDL** | **Cap. 3:** Harmonically Excited Vibration | **Sistemas Lineares Invariantes no Tempo (LTI)** | **Cap. 2:** Linear Time-Invariant Systems | Conectar a **causa** (força, desbalanceamento) com o **efeito** (sinal de vibração resultante) usando o conceito de resposta de um sistema a uma entrada. |
| **5-6** | **Vibração Sob Condições Gerais de Força** (foco em forças periódicas) | **Cap. 4:** Vibration Under General Forcing Conditions (Seções 4.1 a 4.4) | **Análise de Sinais Periódicos: Séries de Fourier** <br> **A Transformada de Fourier (Tempo Contínuo)** | **Cap. 3:** Fourier Series Representation of Periodic Signals <br> **Cap. 4:** The Continuous-Time Fourier Transform | **Ponto Chave:** Unificar o conceito de Fourier, vendo como ele descreve tanto a *força de excitação* (Rao) quanto o *sinal de resposta* (Oppenheim). |

---

## Fase 2: Modelagem de Sistemas Reais e Análise Digital (Duração: ~8 semanas)

**Objetivo:** Aplicar os fundamentos a sistemas mais complexos (Múltiplos GDLs, Rotores) e focar nas ferramentas computacionais que você efetivamente usará no seu projeto. Esta fase deve ser desenvolvida em paralelo com o início do seu trabalho prático no software ROSS.

| Semana | Tópico de Vibrações (Rao) ⚙️ | Capítulos (Rao) | Tópico de Sinais (Oppenheim) 📊 | Capítulos (Oppenheim) | Objetivo da Semana |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **7-8** | **Sistemas com Dois Graus de Liberdade** | **Cap. 5:** Two-Degree-of-Freedom Systems | **Amostragem** | **Cap. 7:** Sampling | Entender como modelar sistemas com múltiplos modos de vibrar e como coletar dados desses sistemas para um computador (Teorema de Nyquist, aliasing). |
| **9-11** | **Dinâmica de Rotores** (Tópico Central para sua Dissertação) | **Cap. 11:** Mechanical Vibration and Rotor Dynamics (foco nas seções de velocidade crítica, resposta a desbalanceamento, etc.) | **A Transformada de Fourier de Tempo Discreto (DTFT)** <br> **A Transformada Discreta de Fourier (DFT)** | **Cap. 5:** The Discrete-Time Fourier Transform (conceitual) <br> **Seções 8.6 e 8.7** do **Cap. 8:** The Discrete Fourier Transform | **Foco Prático:** Aprender a física dos sinais que o ROSS irá gerar (Rotores) e a ferramenta matemática (DFT/FFT) que você usará para analisá-los. |
| **12-14** | **Determinação de Frequências Naturais e Vettres Modais** <br> **Método dos Elementos Finitos (MEF)** | **Cap. 6:** Multi-Degree-of-Freedom Systems <br> **Cap. 8:** The Finite Element Method | **Propriedades e Aplicações da DFT** | **Cap. 8 e 9:** (revisar DFT e suas aplicações como filtragem e correlação) | Aprofundar no método numérico por trás do ROSS (MEF) e nas técnicas para aplicar a FFT corretamente (janelamento, vazamento espectral, etc.). |

---

## Fase 3: Tópicos Avançados e Foco na Pesquisa (Contínuo)

**Objetivo:** Transicionar dos livros-texto para a literatura específica da sua proposta, usando a base construída para entender e implementar os Espectros de Ordem Superior (HOS).

| Período | Ação de Pesquisa 🔬 | Leitura de Apoio e Referência | Objetivo |
| :--- | :--- | :--- | :--- |
| **Mês 5+** | **1. Modelagem de Falhas (Trincas) no ROSS:** Investigar como a trinca introduz não-linearidades no modelo (ex: rigidez variante no tempo). | **Rao (referência):** `Cap. 13: Nonlinear Vibration`. <br> **Artigos:** Buscar por "breathing crack model", "rotor dynamics with crack". | Entender a **origem física** das assinaturas não-lineares que você buscará nos sinais de vibração. |
| **Mês 5+** | **2. Estudo de Espectros de Ordem Superior (HOS):** Focar na leitura do artigo de Sinha (2007) e outros artigos sobre bi-espectro e tri-espectro. | **Oppenheim (referência):** Usar como consulta para qualquer dúvida fundamental sobre teoria de sinais (convolução, correlação, propriedades de Fourier) que surgir ao ler os artigos. | Aprender a teoria por trás da **ferramenta de análise principal** do seu trabalho. |
| **Contínuo** | **3. Implementação e Análise:** Começar a implementar algoritmos (em Python/MATLAB) para calcular o bi-espectro dos sinais simulados pelo ROSS. | Documentação de bibliotecas científicas (ex