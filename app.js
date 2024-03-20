import { initPetActions } from './actions/petActions.js';
import { initializeGame } from './actions/gameActions.js';
import { saveGameState } from './persistence/saveGame.js';
import { loadGameState } from './persistence/loadGame.js';
import { stopSound } from './utils/util.js';
import { resetGameStates } from './actions/gameActions.js';
import { fetchAndDisplaySavedGames } from './backend/gameStateManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const newGameButton = document.getElementById('new-game');
    const confirmSelectionButton = document.getElementById('confirm-selection');
    const saveGameButton = document.getElementById('save-game');
    const loadGameButton = document.getElementById('load-game');
    const exitGameButton = document.getElementById('exit-game');
    const menuButton = document.querySelector('.menu-button');
    const mainMenu = document.getElementById('main-menu');
    const menuDivider = document.getElementById('menu-divider');
    const returnGameButton = document.getElementById('return-game');
    const petDiv = document.getElementById('pet-div');
    const savedGamesList = document.getElementById('saved-games-list');
    const loadSelectedGameButton = document.getElementById('load-selected-game');
    const backToMenuButton = document.getElementById('back-to-menu')

    
    // Function to hide the Loading buttons - select and button, when any other button pressed
    function hideLoadGameControls() {
        savedGamesList.style.display = 'none';
        loadSelectedGameButton.style.display = 'none';
    }
    
    newGameButton.addEventListener('click', () => {
        resetGameStates();
        hideLoadGameControls();
        document.getElementById('main-menu').classList.add('hidden'); // Hide the main menu
        document.getElementById('pet-div').classList.remove('hidden'); // Show the game view
        document.getElementById('choose-pet').classList.remove('hidden'); // Show the choose-pet section
        document.getElementById('pet-game').classList.add('hidden'); // Ensure the game itself is hidden until a pet is chosen
    
        // Optionally, you might want to hide the return button and divider again, if they could be visible from a previous action
        document.getElementById('return-game').classList.add('hidden');
        document.getElementById('menu-divider').classList.add('hidden');
    });

    confirmSelectionButton.addEventListener('click', () => {
        initializeGame();
    });

    backToMenuButton.addEventListener('click', () => {
        mainMenu.classList.remove('hidden'); // Hide the main menu
        menuDivider.classList.add('hidden'); // Hide the divider
        document.getElementById('pet-div').classList.add('hidden'); // hide the game view
        document.getElementById('choose-pet').classList.add('hidden'); // hide the choose-pet section
    }) 

    saveGameButton.addEventListener('click', saveGameState);
        hideLoadGameControls();
    // Make the loadGameButton show the saved games list
    loadGameButton.addEventListener('click', async () => {
        savedGamesList.style.display = 'block';
        loadSelectedGameButton.style.display = 'inline-block';
        await fetchAndDisplaySavedGames(); // Fetch and display the list
        savedGamesList.classList.remove('hidden'); // Show the dropdown
        loadSelectedGameButton.classList.remove('hidden'); // Show the "Load Selected Game" button
    });

    // Add an event listener for the "Load Selected Game" button
    loadSelectedGameButton.addEventListener('click', async () => {
        const selectedGameId = document.getElementById('saved-games-list').value;
        if (selectedGameId) {
            await loadGameState(selectedGameId);
        } else {
            alert("Please select a game to load.");
        }
    });

    
    

    exitGameButton.addEventListener('click', () => {
        alert('Exiting game...');
        // More exit logic can be added here
    });

    menuButton.addEventListener('click', () => {
        stopSound();
        mainMenu.classList.remove('hidden'); // Show the main menu
        returnGameButton.classList.remove('hidden'); // Make the return button visible
        menuDivider.classList.remove('hidden'); // Make the divider visible
        petDiv.classList.add('hidden'); // Hide the game view
    });

    returnGameButton.addEventListener('click', () => {
        mainMenu.classList.add('hidden'); // Hide the main menu
        returnGameButton.classList.add('hidden'); // Hide the return button itself
        menuDivider.classList.add('hidden'); // Hide the divider
        petDiv.classList.remove('hidden'); // Show the game view again
    });
    



   initPetActions(); // Initialize pet selection
});

export function displayGameView() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('choose-pet').classList.add('hidden');
    document.getElementById('saved-games-list').classList.add('hidden');
    document.getElementById('load-selected-game').classList.add('hidden');
    
    document.getElementById('pet-div').classList.remove('hidden');
    document.getElementById('pet-game').classList.remove('hidden');
}
