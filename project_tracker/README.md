# Project Tracker - MVC Architecture

A minimal MVC-based project tracker for research projects, specifically designed for thesis and dissertation tracking.

## Project Structure

```
project-tracker/
├── src/
│   ├── models/           # Data models
│   │   ├── Project.js
│   │   ├── Phase.js
│   │   └── Presentation.js
│   ├── views/            # View templates (future implementation)
│   ├── controllers/      # Business logic controllers
│   │   ├── DashboardController.js
│   │   ├── PresentationsController.js
│   │   └── ProgressController.js
│   ├── routes/           # Route definitions
│   │   ├── dashboard.js
│   │   ├── presentations.js
│   │   └── progress.js
│   └── app.js            # Main application entry point
├── public/               # Static assets
│   ├── css/
│   │   └── styles.css
│   ├── js/               # Client-side JavaScript
│   ├── assets/           # Images, fonts, etc.
│   ├── index.html        # Main dashboard
│   └── progresso.html    # Progress presentation
├── config/               # Configuration files
│   ├── app.js
│   └── database.js
└── package.json
```

## Features

- **Dashboard**: Overview of project phases and progress
- **Presentations**: Management of thesis presentations (qualification, defense, progress)
- **Progress Tracking**: Visual progress reports and phase management
- **MVC Architecture**: Clean separation of concerns

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Available Routes

- `/` or `/dashboard` - Main dashboard
- `/presentations` - Presentations overview
- `/presentations/defesa` - Defense presentation
- `/presentations/qualificacao` - Qualification presentation
- `/presentations/progresso` - Progress presentation
- `/progress/report` - API endpoint for progress data

## Models

### Project
Represents the main research project with metadata and progress tracking.

### Phase
Represents individual phases of the project with status and progress information.

### Presentation
Manages different types of presentations (qualification, defense, progress reports).

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication
- Real-time progress updates
- File upload for presentations
- Analytics and reporting
- Mobile-responsive design improvements

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript
- **Architecture**: MVC Pattern
- **Presentation**: Reveal.js (for presentations)

## Author

Cristofer Antoni Souza Costa  
Universidade Federal de Uberlândia  
Programa de Pós-Graduação em Engenharia Mecânica
