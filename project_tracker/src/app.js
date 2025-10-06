
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const PORT = 3000;

// Queue to handle file operations sequentially
let fileOperationQueue = Promise.resolve();

// Helper function to queue file operations
function queueFileOperation(operation) {
  fileOperationQueue = fileOperationQueue.then(operation, operation);
  return fileOperationQueue;
}

// Helper function to safely read tasks file with retry
async function readTasksFile(filePath, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      if (!data || data.trim() === '') {
        throw new Error('Empty file');
      }
      return JSON.parse(data);
    } catch (error) {
      if (i === retries - 1) throw error;
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
}

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve static files from node_modules (for FontAwesome)
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

// Serve static files from data directory
app.use('/data', express.static(path.join(__dirname, '../data')));

// Serve your main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Serve dashboard page
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/dashboard.html'));
  });

// Serve progresso page
app.get('/progresso', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/progresso.html'));
});

// Serve gantt page
app.get('/gantt', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/gantt_frame.html'));
});

// Serve clean gantt page
app.get('/gantt-clean', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/gant_clean.html'));
});

// API endpoint to update tasks
app.put('/api/tasks', async (req, res) => {
  try {
    const updatedData = req.body;
    
    // Get the filename from query parameter or default to tasks.json
    const filename = req.query.file || 'tasks.json';
    
    // Handle both old format (array) and new format (object with metadata)
    let dataToWrite;
    if (Array.isArray(updatedData)) {
      // Old format - just an array of tasks
      dataToWrite = updatedData;
    } else if (updatedData && Array.isArray(updatedData.tasks)) {
      // New format - object with metadata and tasks array
      dataToWrite = updatedData;
    } else {
      return res.status(400).json({ error: 'Invalid data format. Expected an array of tasks or an object with tasks array.' });
    }
    
    const tasksFilePath = path.join(__dirname, '../data', filename);
    
    // Queue the write operation
    await queueFileOperation(async () => {
      await fs.writeFile(tasksFilePath, JSON.stringify(dataToWrite, null, 4));
    });
    
    res.json({ success: true, message: 'Tasks updated successfully' });
  } catch (error) {
    console.error('Error updating tasks:', error);
    res.status(500).json({ error: 'Failed to update tasks', details: error.message });
  }
});

// API endpoint to update a single task
app.put('/api/tasks/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const updatedTaskData = req.body;
    
    // Get the filename from query parameter or default to tasks.json
    const filename = req.query.file || 'tasks.json';
    const tasksFilePath = path.join(__dirname, '../data', filename);
    
    // Queue the read-modify-write operation
    const result = await queueFileOperation(async () => {
      // Read current data with retry logic
      const data = await readTasksFile(tasksFilePath);
      
      // Handle both old format (array) and new format (object with metadata)
      let tasks;
      let dataToWrite;
      
      if (Array.isArray(data)) {
        // Old format - just an array of tasks
        tasks = data;
        dataToWrite = data;
      } else if (data && Array.isArray(data.tasks)) {
        // New format - object with metadata and tasks array
        tasks = data.tasks;
        dataToWrite = data;
      } else {
        throw new Error('Invalid data format in file');
      }
      
      // Find and update the specific task
      const taskIndex = tasks.findIndex(t => t.id === taskId);
      
      if (taskIndex === -1) {
        throw new Error('Task not found');
      }
      
      // Update the task with new data
      tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTaskData };
      
      // Write back to file
      await fs.writeFile(tasksFilePath, JSON.stringify(dataToWrite, null, 4));
      
      return tasks[taskIndex];
    });
    
    res.json({ success: true, message: 'Task updated successfully', task: result });
  } catch (error) {
    console.error('Error updating task:', error);
    if (error.message === 'Task not found') {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.status(500).json({ error: 'Failed to update task', details: error.message });
    }
  }
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server and provide additional startup information
app.listen(PORT, () => {
  console.log('===========================================');
  console.log('🚀 Tracker Server Started Successfully!');
  console.log(`🌐 Access the app at: http://localhost:${PORT}`);
  console.log('-------------------------------------------');
  console.log('Available routes:');
  console.log(`  • /                -> Home (index.html)`);
  console.log(`  • /dashboard       -> Dashboard`);
  console.log(`  • /progresso       -> Progresso`);
  console.log(`  • /gantt           -> Gantt Chart (frame)`);
  console.log(`  • /gantt-clean     -> Gantt Chart (clean)`);
  console.log('Static assets served from /public, /node_modules, and /data');
  console.log('Press Ctrl+C to stop the server.');
  console.log('===========================================');
});