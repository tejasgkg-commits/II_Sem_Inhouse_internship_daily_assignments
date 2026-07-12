// Configuration & State
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let allPosts = [];

// DOM Elements
const postsContainer = document.getElementById('posts-container');
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');
const cardCount = document.getElementById('card-count');
const searchBar = document.getElementById('search-bar');

// 1. Working fetch() Call with Error Handling
async function fetchPosts() {
    showLoading(true);
    hideError();
    
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        
        allPosts = await response.json();
        
        // Handle Edge Case: If the API returns an empty array
        if (allPosts.length === 0) {
            displayEmptyState();
        } else {
            renderPosts(allPosts);
        }
        
    } catch (error) {
        console.error("Fetch failed:", error);
        showError(`Failed to load data: ${error.message}. Please try again later.`);
    } finally {
        showLoading(false);
    }
}

// 2. Render Cards into the Bootstrap Grid
function renderPosts(posts) {
    postsContainer.innerHTML = '';
    
    // Update Badge Count
    cardCount.textContent = posts.length;

    posts.forEach(post => {
        const cardCol = document.createElement('div');
        cardCol.className = 'col';
        
        cardCol.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body d-flex flex-column">
                    <span class="text-muted small mb-2">Post ID: #${post.id}</span>
                    <h5 class="card-title text-dark fw-bold">${post.title}</h5>
                    <p class="card-text text-secondary flex-grow-1">${post.body}</p>
                    <a href="#" class="btn btn-outline-primary btn-sm mt-3 w-fit">Read More</a>
                </div>
            </div>
        `;
        postsContainer.appendChild(cardCol);
    });
}

// Bonus: Search / Filter Logic
searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPosts = allPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm)
    );
    renderPosts(filteredPosts);
});

// UI Helper Functions (Loading & Error States)
function showLoading(isLoading) {
    if (isLoading) {
        loadingSpinner.classList.remove('d-none');
        postsContainer.classList.add('opacity-50');
    } else {
        loadingSpinner.classList.add('d-none');
        postsContainer.classList.remove('opacity-50');
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
    cardCount.textContent = 0;
}

function hideError() {
    errorMessage.classList.add('d-none');
}

function displayEmptyState() {
    postsContainer.innerHTML = '';
    cardCount.textContent = 0;
    errorMessage.textContent = "No data returned from the server.";
    errorMessage.className = "alert alert-warning";
    errorMessage.classList.remove('d-none');
}

// Initialize App
document.addEventListener('DOMContentLoaded', fetchPosts);
