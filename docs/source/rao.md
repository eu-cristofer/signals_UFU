# Mechanical Vibrations

**Singiresu S. Rao**

### 🎯 **Capítulos Essenciais**

| Capítulo | Tópico | Relevância para Tese (Diagnóstico/HOS) | Páginas |
|----------|--------|----------------------------------------|---------|
| **1** | **Fundamentals of Vibration** | ⭐⭐⭐⭐ Modelagem básica de rigidez/amortecimento | 1-120 |
| **2** | **Free Vibration of SDOF Systems** | ⭐⭐⭐⭐⭐ Frequências naturais e amortecimento (Log Decrement) | 121-220 |
| **3** | **Harmonically Excited Vibration** | ⭐⭐⭐⭐⭐ **Crítico:** Desbalanceamento rotativo e resposta em frequência | 221-330 |
| **4** | **Vibration Under General Forcing** | ⭐⭐⭐⭐ Resposta ao impulso e convolução (Link com Sinais) | 331-400 |
| **5-6** | **Two/Multi-Degree-of-Freedom Systems** | ⭐⭐⭐⭐⭐ Base para modelagem de rotores (MDOF) e Análise Modal | 401-580 |
| **8** | **Continuous Systems** | ⭐⭐⭐ Modelagem de eixos flexíveis (Vigas de Euler-Bernoulli) | 650-750 |
| **10** | **Vibration Measurement** | ⭐⭐⭐⭐ Sensores e processamento de sinais de vibração | 850-920 |
| **11** | **Numerical Integration Methods** | ⭐⭐⭐⭐⭐ **Fundamental para Simulações Numéricas (ROSS)** | 921-980 |
| **13** | **Nonlinear Vibration** | ⭐⭐⭐⭐⭐ **Essencial para HOS:** Origem das não-linearidades e harmônicos | 1050+ |

### 📋 **Plano de Fichamento Estruturado**

#### 🗓️ **Cronograma Sugerido (14 semanas)**

| Semana | Capítulo(s) | Foco Principal | Tempo Estimado |
|--------|-------------|----------------|----------------|
| **1-2** | **1-2** | Modelagem de parâmetros concentrados e vibração livre | 16h |
| **3-4** | **3** | **Desbalanceamento Rotativo** e Isolamento | 20h |
| **5** | **4** | Resposta transitória e convolução | 10h |
| **6-8** | **5-6** | Sistemas MDOF, Autovalores/Autovetores (Modos de vibrar) | 24h |
| **9** | **8** | Eixos contínuos (opcional para modelos discretos finos) | 8h |
| **10** | **11** | **Métodos Numéricos** (Runge-Kutta, Newmark) para simulação | 12h |
| **11-12** | **13** | **Não-linearidades** (Duffing, folgas) -> Link com HOS | 16h |
| **13-14** | **10** | Medição e Análise de Sinais Experimental | 12h |

#### 📝 **Metodologia de Fichamento**

**Para cada capítulo, criar:**

1. **📖 Resumo de Modelagem**
   - Equações de movimento (EOM)
   - Suposições físicas
   - Soluções analíticas vs. numéricas

2. **🔍 Conexão com Rotodinâmica**
   - Como isso se aplica a um eixo rotativo?
   - Onde entram as falhas (trincas = rigidez variável)?

3. **💡 Link com Simulação (ROSS)**
   - Como implementar isso numericamente?
   - Quais parâmetros influenciam a resposta?

4. **❓ Perguntas para HOS**
   - Onde surgem não-linearidades?
   - Que harmônicos são gerados?

---

### 🔍 **Perguntas Fundamentais por Capítulo**

#### ⚙️ **Capítulo 1-2: Fundamentos e Vibração Livre**

> **🎯 Objetivo:** Entender a física básica (massa, rigidez, amortecimento) e a resposta natural.

**Para sua dissertação, pergunte-se:**
- [ ] Como estimar rigidez e amortecimento de mancais em modelos numéricos?
- [ ] O que o decremento logarítmico revela sobre o amortecimento do sistema simulado?
- [ ] Como a frequência natural muda com a presença de uma trinca (perda de rigidez)?

#### 🔄 **Capítulo 3: Excitação Harmônica (Desbalanceamento)**

> **🚨 CRÍTICO para Máquinas Rotativas**

**Conceitos-chave:** Desbalanceamento rotativo, Whirling, Fator de amplificação.

**Perguntas essenciais:**
- [ ] Como modelar matematicamente a força de desbalanceamento ($me\omega^2$)?
- [ ] Qual a relação entre a fase da vibração e a posição do desbalanceamento?
- [ ] Como o desalinhamento gera harmônicos (1X, 2X) na resposta forçada?
- [ ] Como distinguir desbalanceamento de outras falhas olhando apenas para a frequência fundamental?

#### 🧩 **Capítulo 5-6: MDOF e Análise Modal**

> **🎯 Foco:** Modelagem de Rotores (Elementos Finitos/Discretos)**

**Perguntas essenciais:**
- [ ] Como montar as matrizes de Massa [M], Rigidez [K] e Amortecimento [C] para um sistema rotativo?
- [ ] O que é o efeito giroscópico e como ele altera as frequências naturais (Campbell Diagram)?
- [ ] Como as formas modais ajudam a decidir onde colocar sensores para melhor detecção de falhas?
- [ ] Como falhas localizadas afetam a ortogonalidade dos modos?

#### 💻 **Capítulo 11: Métodos de Integração Numérica**

> **🎯 Foco:** Simulações no Tempo (Time-domain simulations)**

**Perguntas essenciais:**
- [ ] Qual método (Runge-Kutta 4, Newmark-beta, Wilson-theta) é mais estável para sistemas rotativos rígidos?
- [ ] Como escolher o passo de tempo ($\Delta t$) para garantir precisão nos harmônicos superiores (necessário para HOS)?
- [ ] Como introduzir ruído numérico ou experimental nas simulações para testar robustez?
- [ ] Como modelar eventos transientes (partida/parada) numericamente?

#### 🌊 **Capítulo 13: Vibração Não-Linear**

> **🚨 A MINA DE OURO para HOS**

**Conceitos-chave:** Salto (Jump phenomenon), Sub-harmônicos, Super-harmônicos, Ciclos limite.

**Perguntas essenciais:**
- [ ] Quais falhas em máquinas rotativas introduzem não-linearidades claras (ex: trinca que abre/fecha - *breathing crack*)?
- [ ] Como a folga em mancais (*rubbing*) gera comportamento caótico ou quase-periódico?
- [ ] Como as equações de Duffing ou Van der Pol se relacionam com comportamentos de falhas mecânicas?
- [ ] **HOS Link:** Como as não-linearidades transferem energia entre modos (acoplamento de fase detetável pelo Bi-espectro)?

---

### 🚀 **Perguntas Específicas para Tese (Rotodinâmica + HOS)**

#### 🧠 **Modelagem de Falhas**
- [ ] **Trincas:** Como modelar a "breathing crack" (função de rigidez variante no tempo)? Isso gera intermodulação?
- [ ] **Desalinhamento:** Como ele gera forças 2X e como isso interage com o desbalanceamento 1X?
- [ ] **Roçamento (Rub):** Como modelar o contato intermitente estator-rotor? Isso gera "clipping" no sinal (típico de gerar harmônicos altos)?

#### 📊 **Conexão com Processamento de Sinais**
- [ ] Se eu simular uma falha não-linear usando Rao (Cap 13), o Bi-espectro (Oppenheim) vai mostrar correlação de fase quadrática?
- [ ] Posso usar os modelos de MDOF (Cap 6) para gerar um banco de dados sintético para treinar o classificador?
- [ ] A simulação numérica captura o "ruído de processo" real que afeta o cálculo de HOS?

---

### 📚 **Plano de Fichamento Detalhado**

#### 🎯 **Objetivos**
1. **Dominar a Física:** Entender *por que* o sinal vibra de certa forma.
2. **Validar Simulações:** Saber se o output do ROSS faz sentido físico.
3. **Justificar HOS:** Provar que falhas criam as não-linearidades que o HOS detecta.

#### 📋 **Template de Fichamento**

```markdown
## Capítulo X: [Título]

### 🏗️ Modelagem Física
- **Equações:** [EOM principais]
- **Parâmetros:** [M, K, C - como obter?]
- **Suposições:** [Linear? Pequenos deslocamentos?]

### 🏭 Aplicação em Máquinas Rotativas
- **Relevância:** [Alta/Média/Baixa]
- **Falhas Relacionadas:** [Desbalanceamento, Desalinhamento, Trinca...]
- **Sintoma na Vibração:** [Aumento de 1X, aparecimento de harmônicos, órbita...]

### 💻 Implementação Numérica (Simulação)
- **Método:** [RK4, Elementos Finitos...]
- **Desafios:** [Rigidez numérica, tempo de computação]
- **Validação:** [Comparar com analítico?]

### 🧠 Conexão com HOS (Não-linearidade)
- **Fonte da Não-linearidade:** [Geométrica, Material, Contato?]
- **Assinatura Esperada:** [Harmônicos acoplados, Distorção de fase]

### 📝 Notas e Insights
- **Ideia para Tese:** [Ex: Simular trinca com rigidez variável e rodar Bi-espectro]
- **Dúvida:** [Como modelar amortecimento hysterético?]
```

#### 📊 **Sistema de Avaliação**
- [ ] **Física Entendida** (Consigo explicar o fenômeno?)
- [ ] **Modelo Matemático Claro** (Consigo escrever a EOM?)
- [ ] **Simulável** (Sei como programar isso?)
- [ ] **Relevante para HOS** (Gera não-linearidade/Gaussianidade?)

