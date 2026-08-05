// ===== State =====
const STORAGE_KEY = "daybook.tasks";
let tasks = loadTasks();
let currentFilter = "all";

// ===== DOM references =====
const taskList = document.getElementById("taskList");
const addForm = document.getElementById("addForm");
const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const filterTabs = document.getElementById("filterTabs");
const emptyState = document.getElementById("emptyState");
const statTotal = document.getElementById("statTotal");
const statOpen = document.getElementById("statOpen");
const statDone = document.getElementById("statDone");
const progressFill = document.getElementById("progressFill");
const todayDate = document.getElementById("todayDate");

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  renderDate();
  render();
});

// ===== Storage helpers =====
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Could not read saved tasks:", err);
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error("Could not save tasks:", err);
  }
}

// ===== Date display =====
function renderDate() {
  const now = new Date();
  const options = { weekday: "short", month: "short", day: "numeric" };
  todayDate.textContent = now.toLocaleDateString(undefined, options);
}

// ===== Task actions =====
function addTask(text, priority) {
  const trimmed = text.trim();
  if (!trimmed) return;

  tasks.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    text: trimmed,
    priority: priority || "medium",
    done: false,
    createdAt: Date.now(),
  });

  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  task.done = !task.done;
  saveTasks();
  render();
}

function deleteTask(id) {
  const item = taskList.querySelector(`[data-id="${id}"]`);
  if (item) {
    item.style.transition = "opacity 0.15s ease, transform 0.15s ease";
    item.style.opacity = "0";
    item.style.transform = "translateX(8px)";
    setTimeout(() => {
      tasks = tasks.filter((t) => t.id !== id);
      saveTasks();
      render();
    }, 140);
  } else {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    render();
  }
}

// ===== Filtering =====
function getFilteredTasks() {
  if (currentFilter === "open") return tasks.filter((t) => !t.done);
  if (currentFilter === "done") return tasks.filter((t) => t.done);
  return tasks;
}

// ===== Rendering =====
function render() {
  const filtered = getFilteredTasks();
  taskList.innerHTML = "";

  filtered.forEach((task) => {
    taskList.appendChild(buildTaskElement(task));
  });

  emptyState.classList.toggle("visible", tasks.length === 0);
  emptyState.textContent =
    tasks.length === 0
      ? "Nothing on the ledger yet. Add your first task above."
      : "No tasks match this filter.";
  emptyState.classList.toggle("visible", filtered.length === 0);

  updateStats();
}

function buildTaskElement(task) {
  const li = document.createElement("li");
  li.className = "task-item" + (task.done ? " done" : "");
  li.dataset.id = task.id;
  li.dataset.priority = task.priority;

  const checkbox = document.createElement("button");
  checkbox.className = "checkbox";
  checkbox.type = "button";
  checkbox.setAttribute("aria-label", task.done ? "Mark as open" : "Mark as done");
  checkbox.innerHTML = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  checkbox.addEventListener("click", () => toggleTask(task.id));

  const main = document.createElement("div");
  main.className = "task-main";

  const text = document.createElement("p");
  text.className = "task-text";
  text.textContent = task.text;

  const meta = document.createElement("p");
  meta.className = "task-meta";
  meta.textContent = `${task.priority} priority`;

  main.appendChild(text);
  main.appendChild(meta);

  const stamp = document.createElement("span");
  stamp.className = "stamp-badge";
  stamp.textContent = "DONE";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.type = "button";
  deleteBtn.setAttribute("aria-label", "Delete task");
  deleteBtn.textContent = "×";
  deleteBtn.addEventListener("click", () => deleteTask(task.id));

  li.appendChild(checkbox);
  li.appendChild(main);
  li.appendChild(stamp);
  li.appendChild(deleteBtn);

  return li;
}

function updateStats() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const open = total - done;

  statTotal.textContent = total;
  statOpen.textContent = open;
  statDone.textContent = done;

  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  progressFill.style.width = pct + "%";
}

// ===== Event listeners =====
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask(taskInput.value, priorityInput.value);
  taskInput.value = "";
  taskInput.focus();
});

filterTabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;

  filterTabs.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  currentFilter = btn.dataset.filter;
  render();
});
