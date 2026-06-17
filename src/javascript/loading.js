export {showLoading, hideLoading};

function showLoading() {
    let loadingTXT = document.createElement('h1');
    loadingTXT.style.zIndex = "5";
    loadingTXT.textContent = "Loading...";
    loadingTXT.style.fontSize = "30";
    loadingTXT.setAttribute('id', 'loading-txt');

    document.body.appendChild(loadingTXT);
}

function hideLoading() {
    let loadingTXT = document.querySelector('#loading-txt');
    loadingTXT.remove();

}