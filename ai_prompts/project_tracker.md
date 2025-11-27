Considerando o estabelecido no plejamento da minha pesquisa @planejamento/ , por favor me ensine a criar, passo a passo, uma solução de acompanhamento do projeto. Rascunhe ela, valide os principais pontos comigo, e depois me explique como implementar. Vamos documentar os passos da criação do software de forma prossional e educativa. Quero apredender. Vc é meu professor.

## Requisitos:

### Project Tracking System Prototype

#### Project Overview
Comprehensive project tracking system prototype for managing a master's dissertation project on "Diagnóstico de Falhas em Máquinas Rotativas por Meio de Simulações Numéricas e Análise de Espectros de Ordem Superior" (Rotating Machinery Fault Diagnosis using Numerical Simulations and Higher-Order Spectra Analysis).

### 📋 Core Requirements

#### 1. System Architecture
- Backend: Node.js with Express.js framework
- Database: JSON file-based storage (no external database required)
- Frontend: Interactive web dashboard + command-line interface
- API: RESTful endpoints for data access

#### 2. Project Structure Management
Implement a 6-phase dissertation structure

```json
{
  "phases": [
    {
      "id": 1,
      "name": "Revisão Bibliográfica",
      "status": "completed",
      "progress": 100,
      "milestones": [...]
    },
    {
      "id": 2, 
      "name": "Modelagem Numérica",
      "status": "in_progress",
      "progress": 60,
      "milestones": [...]
    },
    {
      "id": 3,
      "name": "Simulações Sistemáticas", 
      "status": "pending",
      "progress": 0,
      "milestones": [...]
    },
    {
      "id": 4,
      "name": "Análise HOS",
      "status": "pending", 
      "progress": 0,
      "milestones": [...]
    },
    {
      "id": 5,
      "name": "Validação e Classificação",
      "status": "pending",
      "progress": 0,
      "milestones": [...]
    },
    {
      "id": 6,
      "name": "Redação e Defesa",
      "status": "pending",
      "progress": 0,
      "milestones": [...]
    }
  ]
}
```

#### 4. Command-Line Interface (CLI)
Implement an interactive CLI with these options:

```
📊 Sistema de Acompanhamento de Progresso
==========================================
1. Ver status atual do projeto
2. Atualizar progresso de uma fase  
3. Atualizar progresso de uma atividade
4. Adicionar nova atividade
5. Registrar tempo gasto
6. Ver próximos marcos
7. Ver riscos
0. Sair
```

**CLI Features Required:**
- Interactive menu system with readline
- Real-time data validation
- Progress percentage updates (0-100%)
- Time logging with 0.5-hour precision
- Status management (pending/in_progress/completed)
- Milestone deadline tracking with color-coded alerts

#### 5. Web Dashboard
Create a responsive web interface with:

**Visual Components:**
- Metrics Cards: Overall progress, completed phases, time spent, activities
- Progress Charts: Bar charts showing phase completion using Chart.js
- Timeline View: Visual representation of project phases and milestones
- Risk Monitor: Color-coded risk assessment (red/yellow/green)
- Recent Activities: List of latest project activities

**Dashboard Features:**
- Real-time data updates
- Interactive charts and graphs
- Responsive design for different screen sizes
- Professional styling with gradients and shadows
- Font Awesome icons for visual appeal

#### 7. Report Generation System
Create automated report generation in multiple formats:

**PDF Reports:**
- Executive summary format
- Professional layout with headers/footers
- Phase progress details
- Activity summaries
- Risk assessments

**HTML Reports:**
- Visual format with CSS styling
- Interactive elements
- Responsive design
- Template-based generation using Handlebars

**CSV Reports:**
- Tabular data export
- Activity tracking data
- Milestone information
- Time logging data

