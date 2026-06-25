export {showLoading, hideLoading};

function showLoading() {
    let loadingTXT = document.createElement('h1');
    loadingTXT.textContent = "Loading...";
    loadingTXT.setAttribute('id', 'loading-txt');

    document.body.appendChild(loadingTXT);
}

function hideLoading() {
    let loadingTXT = document.querySelector('#loading-txt');
    loadingTXT.remove();

}