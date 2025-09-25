// Puzzle data: Story-Driven Code Quest and Algorithm Flow
const puzzles = [
    {
        title: "Story-Driven Code Quest: Fix Spaceship Thrusters",
        blocks: ["let power = 50;", "power += 25;", "console.log(power);", "power = 100;"],
        solution: ["let power = 50;", "power += 25;", "console.log(power);"],
        expectedOutput: "75"
    },
    {
        title: "Algorithm Flow: Bubble Sort Step",
        blocks: ["for (let i = 0; i < n; i++)", "if (arr[j] > arr[j+1])", "swap(arr[j], arr[j+1])", "let temp = arr[j];"],
        solution: ["for (let i = 0; i < n; i++)", "if (arr[j] > arr[j+1])", "let temp = arr[j];", "swap(arr[j], arr[j+1])"],
        expectedOutput: "Sorted array"
    }
];

let currentPuzzleIndex = 0;
let workspaceBlocks = [];

// DOM elements
const puzzleBlocksEl = document.getElementById('puzzle-blocks');
const workspaceEl = document.getElementById('workspace');
const feedbackEl = document.getElementById('feedback');
const checkSolutionBtn = document.getElementById('check-solution');
const switchPuzzleBtn = document.getElementById('switch-puzzle');
const puzzleTitleInput = document.getElementById('puzzle-title');
const puzzleBlocksInput = document.getElementById('puzzle-blocks');
const puzzleSolutionInput = document.getElementById('puzzle-solution');
const savePuzzleBtn = document.getElementById('save-puzzle');

// Initialize puzzle
function loadPuzzle(index) {
    const puzzle = puzzles[index];
    puzzleBlocksEl.innerHTML = `<h3>${puzzle.title}</h3>`;
    workspaceEl.innerHTML = '';
    workspaceBlocks = [];
    puzzle.blocks.forEach((block, i) => {
        const blockEl = document.createElement('div');
        blockEl.className = 'code-block';
        blockEl.textContent = block;
        blockEl.draggable = true;
        blockEl.id = `block-${i}`;
        blockEl.addEventListener('dragstart', dragStart);
        puzzleBlocksEl.appendChild(blockEl);
    });
    workspaceEl.addEventListener('dragover', dragOver);
    workspaceEl.addEventListener('drop', drop);
    feedbackEl.textContent = '';
}

// Drag-and-drop handlers
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => e.target.classList.add('dragging'), 0);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const blockId = e.dataTransfer.getData('text/plain');
    const blockEl = document.getElementById(blockId);
    blockEl.classList.remove('dragging');
    workspaceEl.appendChild(blockEl);
    workspaceBlocks = [...workspaceEl.querySelectorAll('.code-block')].map(el => el.textContent);
}

// Check solution
function checkSolution() {
    const puzzle = puzzles[currentPuzzleIndex];
    const isCorrect = workspaceBlocks.length === puzzle.solution.length &&
        workspaceBlocks.every((block, i) => block === puzzle.solution[i]);
    
    feedbackEl.textContent = isCorrect ? 'Correct! Great job!' : 'Incorrect. Try again!';
    workspaceEl.querySelectorAll('.code-block').forEach(el => {
        el.classList.remove('correct', 'incorrect');
        el.classList.add(isCorrect ? 'correct' : 'incorrect');
    });
}

// Switch puzzle
function switchPuzzle() {
    currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length;
    loadPuzzle(currentPuzzleIndex);
}

// Save custom puzzle
function savePuzzle() {
    const title = puzzleTitleInput.value.trim();
    const blocks = puzzleBlocksInput.value.trim().split('\n').filter(b => b);
    const solution = puzzleSolutionInput.value.trim().split('\n').filter(b => b);
    
    if (title && blocks.length && solution.length) {
        const newPuzzle = { title, blocks, solution, expectedOutput: 'Custom Output' };
        puzzles.push(newPuzzle);
        localStorage.setItem('customPuzzles', JSON.stringify(puzzles.slice(2)));
        feedbackEl.textContent = 'Puzzle saved!';
        puzzleTitleInput.value = '';
        puzzleBlocksInput.value = '';
        puzzleSolutionInput.value = '';
    } else {
        feedbackEl.textContent = 'Please fill all fields.';
    }
}

// Load custom puzzles from localStorage
function loadCustomPuzzles() {
    const saved = localStorage.getItem('customPuzzles');
    if (saved) {
        puzzles.push(...JSON.parse(saved));
    }
}

// Event listeners
checkSolutionBtn.addEventListener('click', checkSolution);
switchPuzzleBtn.addEventListener('click', switchPuzzle);
savePuzzleBtn.addEventListener('click', savePuzzle);

// Initialize
loadCustomPuzzles();
loadPuzzle(currentPuzzleIndex);
