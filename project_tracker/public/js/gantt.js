// Gantt Chart Application
// This file contains all the JavaScript logic for the Gantt chart functionality

// Default tasks data (fallback when JSON file is not available)
const DEFAULT_TASKS = [
    {
        id: 'Task 1',
        name: 'Task 1',
        start: '2024-01-01',
        end: '2024-01-05',
        progress: 100
    },
    {
        id: 'Task 2',
        name: 'Task 2',
        start: '2024-01-03',
        end: '2024-01-08',
        progress: 60
    },
    {
        id: 'Task 3',
        name: 'Task 3',
        start: '2024-01-06',
        end: '2024-01-12',
        progress: 30
    }
];

// Global variables
let tasks = [];
let currentProjectData = null; // Store the full project data including metadata
let currentFilename = 'tasks.json'; // Store the current filename being used
let gantt = null;
const DEFAULT_VIEW_MODE = 'Month'; // Set your preferred default view mode here
let saveStatusTimeout = null; // Track timeout for hiding save status

/**
 * Formats a Date object to YYYY-MM-DD string
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Loads tasks from JSON file with fallback to default tasks
 * @param {string} filename - The filename to load (e.g., 'tasks.json')
 * @returns {Promise<Object>} Object with tasks array and metadata
 */
async function loadTasks(filename = 'tasks.json') {
    currentFilename = filename; // Store the current filename
    try {
        const response = await fetch(`/data/${filename}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        
        // Handle both old format (array) and new format (object with metadata)
        if (Array.isArray(jsonData)) {
            return {
                name: 'Default Project',
                description: 'Default project timeline',
                tasks: jsonData
            };
        } else {
            return jsonData;
        }
    } catch (error) {
        console.warn(`Could not load tasks from ${filename}, using default tasks`);
        return {
            name: 'Default Project',
            description: 'Default project timeline',
            tasks: DEFAULT_TASKS
        };
    }
}

/**
 * Shows the save status indicator
 * @param {string} status - Status type: 'saving', 'saved', or 'error'
 * @param {string} message - Message to display
 */
function showSaveStatus(status, message) {
    const saveStatusEl = document.getElementById('saveStatus');
    if (!saveStatusEl) return;
    
    // Clear any existing timeout
    if (saveStatusTimeout) {
        clearTimeout(saveStatusTimeout);
        saveStatusTimeout = null;
    }
    
    // Show the status immediately
    saveStatusEl.textContent = message;
    saveStatusEl.className = `save-status ${status}`;
    saveStatusEl.style.opacity = '1';
    
    // Auto-hide after 2 seconds for success/error states
    if (status === 'saved' || status === 'error') {
        saveStatusTimeout = setTimeout(() => {
            saveStatusEl.style.opacity = '0';
            setTimeout(() => {
                saveStatusEl.className = 'save-status';
            }, 300); // Wait for fade out transition
        }, 2000);
    }
}

/**
 * Saves a single task update to the database
 * @param {string} taskId - The ID of the task to update
 * @param {Object} updateData - The data to update (e.g., {start, end, progress})
 */
async function saveTaskUpdate(taskId, updateData) {
    try {
        showSaveStatus('saving', '💾 Saving...');
        
        const response = await fetch(`/api/tasks/${taskId}?file=${currentFilename}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        showSaveStatus('saved', '✓ Saved');
        return result;
    } catch (error) {
        console.error('Save failed:', error.message);
        showSaveStatus('error', '❌ Save failed');
        throw error;
    }
}

/**
 * Saves all tasks to the database
 * @param {Array} tasksArray - Array of all tasks
 */
async function saveAllTasks(tasksArray) {
    try {
        showSaveStatus('saving', '💾 Saving all tasks...');
        
        // Prepare data to send - maintain the project structure
        let dataToSend;
        if (currentProjectData && currentProjectData.name) {
            // New format - send the full project data with updated tasks
            dataToSend = {
                ...currentProjectData,
                tasks: tasksArray
            };
        } else {
            // Old format - just send the tasks array
            dataToSend = tasksArray;
        }
        
        const response = await fetch(`/api/tasks?file=${currentFilename}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        showSaveStatus('saved', '✓ All tasks saved');
        return result;
    } catch (error) {
        console.error('Save failed:', error.message);
        showSaveStatus('error', '❌ Save failed');
        throw error;
    }
}

/**
 * Initializes the Gantt chart with the provided tasks
 * @param {Object} projectData - Object containing tasks array and metadata
 */
function initializeGantt(projectData) {
    currentProjectData = projectData;
    tasks = projectData.tasks || projectData;
    
    // Initialize the Gantt chart
    gantt = new Gantt("#gantt", tasks, {
        view_mode: DEFAULT_VIEW_MODE,
        view_mode_select: true,
        scroll_to: 'start',
        today_button: true,  // Enable today marker
        
        // Event handler for when a task's date is changed by dragging
        on_date_change: function (task, start, end) {
            const taskToUpdate = tasks.find(t => t.id === task.id);
            if (taskToUpdate) {
                const formattedStart = formatDate(start);
                const formattedEnd = formatDate(end);
                
                taskToUpdate.start = formattedStart;
                taskToUpdate.end = formattedEnd;
                
                // Save to database with visual feedback
                saveTaskUpdate(task.id, {
                    start: formattedStart,
                    end: formattedEnd
                }).catch(() => {});
            }
        },
        // Event handler for when a task's progress is changed
        on_progress_change: function (task, progress) {
            const taskToUpdate = tasks.find(t => t.id === task.id);
            if (taskToUpdate) {
                taskToUpdate.progress = progress;
                
                // Save to database with visual feedback
                saveTaskUpdate(task.id, {
                    progress: progress
                }).catch(() => {});
            }
        }
    });
    
    // Synchronize dropdown with the initial view mode
    syncDropdownWithViewMode(DEFAULT_VIEW_MODE);
    
    // Add custom today marker line after initialization
    addTodayMarker();
}

/**
 * Adds a visual marker for today's date on the Gantt chart
 */
function addTodayMarker() {
    setTimeout(() => {
        const existingMarker = document.querySelector('.today-marker-line');
        const existingLabel = document.querySelector('.today-marker-label');
        if (existingMarker) existingMarker.remove();
        if (existingLabel) existingLabel.remove();
        
        const ganttSvg = document.querySelector('#gantt svg');
        if (!ganttSvg || tasks.length === 0) return;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (!gantt || !gantt.gantt_start || !gantt.gantt_end) return;
        
        const ganttStart = new Date(gantt.gantt_start);
        const ganttEnd = new Date(gantt.gantt_end);
        ganttStart.setHours(0, 0, 0, 0);
        ganttEnd.setHours(0, 0, 0, 0);
        
        if (today < ganttStart || today > ganttEnd) return;
        
        const gridHeader = ganttSvg.querySelector('.grid-header');
        if (!gridHeader) return;
        
        const headerRect = gridHeader.getBBox();
        const svgHeight = parseFloat(ganttSvg.getAttribute('height'));
        const gridStartX = headerRect.x;
        const gridWidth = headerRect.width;
        
        const totalDays = (ganttEnd - ganttStart) / (1000 * 60 * 60 * 24);
        const daysFromStart = (today - ganttStart) / (1000 * 60 * 60 * 24);
        const xPosition = gridStartX + (daysFromStart / totalDays) * gridWidth;
        
        const markerLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        markerLine.setAttribute('class', 'today-marker-line');
        markerLine.setAttribute('x1', xPosition);
        markerLine.setAttribute('y1', 0);
        markerLine.setAttribute('x2', xPosition);
        markerLine.setAttribute('y2', svgHeight);
        markerLine.setAttribute('stroke', '#667eea');
        markerLine.setAttribute('stroke-width', '2');
        markerLine.setAttribute('stroke-dasharray', '5,5');
        markerLine.style.opacity = '0.8';
        
        const markerLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        markerLabel.setAttribute('class', 'today-marker-label');
        markerLabel.setAttribute('x', xPosition + 5);
        markerLabel.setAttribute('y', 15);
        markerLabel.setAttribute('fill', '#667eea');
        markerLabel.setAttribute('font-size', '12');
        markerLabel.setAttribute('font-weight', 'bold');
        markerLabel.textContent = 'TODAY';
        
        ganttSvg.appendChild(markerLine);
        ganttSvg.appendChild(markerLabel);
    }, 200);
}

/**
 * Parse date from Gantt header text
 */
function parseDateFromHeader(headerText) {
    if (!headerText) return null;
    
    // Try to parse various date formats
    // Format examples: "Oct 4", "October 2024", "Q4 2024", "2024"
    const months = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11,
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    
    // Try "Month Day" format (e.g., "Oct 4")
    const monthDayMatch = headerText.match(/([A-Za-z]+)\s+(\d+)/);
    if (monthDayMatch) {
        const month = months[monthDayMatch[1]];
        const day = parseInt(monthDayMatch[2]);
        const year = new Date().getFullYear();
        if (month !== undefined) {
            return new Date(year, month, day);
        }
    }
    
    // Try ISO format (YYYY-MM-DD)
    const isoMatch = headerText.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
        return new Date(isoMatch[0]);
    }
    
    return null;
}

/**
 * Check if two dates are the same day
 */
function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

/**
 * Custom function to scroll to today's date
 */
function scrollToToday() {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    
    // Find the task closest to today's date
    let closestTask = tasks[0];
    let minDiff = Math.abs(new Date(tasks[0].start) - today);
    
    tasks.forEach(task => {
        const taskStart = new Date(task.start);
        const diff = Math.abs(taskStart - today);
        if (diff < minDiff) {
            minDiff = diff;
            closestTask = task;
        }
    });
    
    // Try to scroll to the closest task
    const taskElement = document.querySelector(`[data-id="${closestTask.id}"]`);
    if (taskElement) {
        taskElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'center'
        });
    } else {
        // Fallback: scroll the gantt container to show today's date
        const ganttContainer = document.getElementById('gantt');
        const ganttSvg = ganttContainer.querySelector('svg');
        if (ganttSvg) {
            // Calculate approximate position for today
            const startDate = new Date(Math.min(...tasks.map(t => new Date(t.start))));
            const daysDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
            const scrollPosition = daysDiff * 30; // Approximate pixel width per day
            
            ganttSvg.scrollLeft = scrollPosition;
        }
    }
}

/**
 * Function to scroll to the start (earliest task)
 */
function scrollToStart() {
    const earliestTask = tasks.reduce((earliest, current) => {
        return new Date(current.start) < new Date(earliest.start) ? current : earliest;
    });
    
    const taskElement = document.querySelector(`[data-id="${earliestTask.id}"]`);
    if (taskElement) {
        taskElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'start'
        });
    } else {
        // Fallback: scroll to the very beginning
        const ganttContainer = document.getElementById('gantt');
        const ganttSvg = ganttContainer.querySelector('svg');
        if (ganttSvg) {
            ganttSvg.scrollLeft = 0;
        }
    }
}

/**
 * Function to scroll to the end (latest task)
 */
function scrollToEnd() {
    const latestTask = tasks.reduce((latest, current) => {
        return new Date(current.end) > new Date(latest.end) ? current : latest;
    });
    
    const taskElement = document.querySelector(`[data-id="${latestTask.id}"]`);
    if (taskElement) {
        taskElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'end'
        });
    } else {
        // Fallback: scroll to the very end
        const ganttContainer = document.getElementById('gantt');
        const ganttSvg = ganttContainer.querySelector('svg');
        if (ganttSvg) {
            ganttSvg.scrollLeft = ganttSvg.scrollWidth;
        }
    }
}

/**
 * Synchronizes the dropdown selection with the current view mode
 * @param {string} viewMode - The view mode to set in the dropdown
 */
function syncDropdownWithViewMode(viewMode) {
    const viewModeSelect = document.getElementById('viewModeSelect');
    if (viewModeSelect) {
        viewModeSelect.value = viewMode;
    }
}

/**
 * Changes the view mode of the Gantt chart
 * @param {string} viewMode - The new view mode (Day, Week, Month, Quarter, Year)
 */
function changeViewMode(viewMode) {
    if (gantt) {
        gantt.change_view_mode(viewMode);
        syncDropdownWithViewMode(viewMode);
        setTimeout(() => {
            addTodayMarker();
        }, 100);
    }
}

/**
 * Loads a new project file and updates the Gantt chart
 * @param {string} filename - The filename to load (e.g., 'tasks.json')
 */
async function loadProjectFile(filename) {
    try {
        showSaveStatus('saving', '📂 Loading project...');
        const projectData = await loadTasks(filename);
        
        // Clear existing gantt
        const ganttContainer = document.getElementById('gantt');
        if (ganttContainer) {
            ganttContainer.innerHTML = '';
        }
        
        // Reinitialize with new data
        initializeGantt(projectData);
        
        // Update page title if available
        if (projectData.name) {
            document.title = `${projectData.name} - Gantt Chart`;
        }
        
        showSaveStatus('saved', '✓ Project loaded');
    } catch (error) {
        console.error('Error loading project:', error);
        showSaveStatus('error', '❌ Failed to load project');
    }
}

/**
 * Sets up event listeners for navigation buttons and dropdowns
 */
function setupEventListeners() {
    // Navigation buttons
    document.getElementById('startButton').addEventListener('click', scrollToStart);
    document.getElementById('todayButton').addEventListener('click', scrollToToday);
    document.getElementById('endButton').addEventListener('click', scrollToEnd);
    
    // File selector dropdown
    const fileSelect = document.getElementById('fileSelect');
    if (fileSelect) {
        fileSelect.addEventListener('change', function(event) {
            const selectedFile = event.target.value;
            loadProjectFile(selectedFile);
        });
    }
    
    // View mode dropdown
    const viewModeSelect = document.getElementById('viewModeSelect');
    if (viewModeSelect) {
        viewModeSelect.addEventListener('change', function(event) {
            const selectedViewMode = event.target.value;
            changeViewMode(selectedViewMode);
        });
    }
}

/**
 * Main initialization function
 * Loads tasks and initializes the Gantt chart
 */
async function initializeApp() {
    try {
        const projectData = await loadTasks('tasks.json');
        initializeGantt(projectData);
        setupEventListeners();
        
        // Update page title if available
        if (projectData.name) {
            document.title = `${projectData.name} - Gantt Chart`;
        }
    } catch (error) {
        console.error('Error initializing Gantt chart:', error);
        initializeGantt({ name: 'Default Project', tasks: DEFAULT_TASKS });
        setupEventListeners();
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
