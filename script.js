

// Список дел
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
let tasks = [];

const savedTasks = localStorage.getItem('tasks');
if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    console.log('Загружено задач:', tasks.length);
}

addTaskButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});


function loadTask() {
    if (!tasks || tasks.length === 0) return;

    tasks.forEach((task) => {
        createTaskElement(task.text);
    });
}

function createTaskElement(taskText) {

    if (taskText === '') return;

    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', function () {
        taskList.removeChild(li);
        tasks = tasks.filter(t => t.text !== taskText);
        saveTasksToLocalStorage();
    });

    li.addEventListener('click', function () {
        li.classList.toggle('completed');
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
};



function addTask() {
    const taskText = newTaskInput.value.trim();

    createTaskElement(taskText)
    newTaskInput.value = '';

    tasks.push({ text: taskText });

    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Сохранено:', tasks);
}

loadTask();

// Таймер Pomodoro
let timer;
let workTime = 25 * 60; // 25 минут в секундах
let breakTime = 5 * 60; // 5 минут в секундах
let timeLeft = workTime;
let isRunning = false;
let isWorkSession = true;
let sessionCount = 0;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const sessionCountDisplay = document.getElementById('session-count');
const statusDisplay = document.getElementById('status');
const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');
const applySettingsButton = document.getElementById('apply-settings');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
applySettingsButton.addEventListener('click', applySettings);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timer);
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    timeLeft = workTime;
    isWorkSession = true;
    updateDisplay();
}

function applySettings() {
    const newWorkTime = parseInt(workTimeInput.value);
    const newBreakTime = parseInt(breakTimeInput.value);

    if (newWorkTime < 1 || newWorkTime > 50) {
        alert('Время работы должно быть от 1 до 50 минут.');
        return;
    }
    if (newBreakTime < 1 || newBreakTime > 20) {
        alert('Время отдыха должно быть от 1 до 20 минут.');
        return;
    }

    workTime = newWorkTime * 60;
    breakTime = newBreakTime * 60;
    timeLeft = workTime;
    isWorkSession = true;
    updateDisplay();
}

function updateTimer() {
    timeLeft--;
    if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        if (isWorkSession) {
            sessionCount++;
            sessionCountDisplay.textContent = sessionCount;
            if (sessionCount % 4 === 0) {
                timeLeft = 20 * 60; // Длинный перерыв 20 минут (максимум)
                statusDisplay.textContent = 'Длинный перерыв';
            } else {
                timeLeft = breakTime; // Короткий перерыв
                statusDisplay.textContent = 'Короткий перерыв';
            }
            isWorkSession = false;
            alert('Время работы вышло! Начинается перерыв.');
            startTimer(); // Автоматически запустить перерыв
        } else {
            timeLeft = workTime; // Рабочая сессия
            statusDisplay.textContent = 'Работа';
            isWorkSession = true;
            alert('Время перерыва вышло! Начинается работа.');
            startTimer(); // Автоматически запустить работу
        }
    }
    updateDisplay();
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

updateDisplay();