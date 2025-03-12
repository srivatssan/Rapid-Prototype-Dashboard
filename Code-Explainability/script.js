document.getElementById('addField').addEventListener('click', function() {
    let inputFields = document.getElementById('inputFields');
    let newInput = document.createElement('div');
    newInput.classList.add('input-container');
    newInput.innerHTML = `
        <input type="text" class="repo-input" placeholder="Enter GitHub Repository URL">
    `;
    inputFields.appendChild(newInput);
});

document.getElementById('validateBtn').addEventListener('click', function() {
    let banner = document.getElementById('validationBanner');
    banner.classList.remove('hidden');
    banner.style.display = 'block';

    setTimeout(() => {
        window.location.href = 'persona.html';
    }, 1000);
});
