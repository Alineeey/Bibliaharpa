document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('biblia').style.display = 'block';
    const iframe = document.getElementById('harpaIframe');

    iframe.addEventListener('load', () => {
        console.log('Iframe carregado com sucesso.');
    });

});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    tablinks = document.getElementsByClassName('tablink');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    document.getElementById(tabName).style.display = 'block';
    if (evt) evt.currentTarget.className += ' active';
}

let currentBook = '';
let currentChapter = 0;
let currentVerse = 0;

function searchVerse() {
    const book = document.getElementById('bookInput').value.toLowerCase();
    const chapterVerse = document.getElementById('chapterInput').value;
    
    [currentChapter, currentVerse] = chapterVerse.split(':').map(Number);
    currentBook = book;

    fetchVerse(book, currentChapter, currentVerse);
}

function fetchVerse(book, chapter, verse) {
    const apiUrl = `https://bible-api.com/${book} ${chapter}:${verse}?translation=almeida`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const verseContent = document.getElementById('verseContent');
            if (data.error) {
                verseContent.innerHTML = `<div class="verse-box"><h2>Erro</h2><p>Versículo não encontrado.</p></div>`;
            } else {
                verseContent.innerHTML = `<div class="verse-box"><h2>${data.reference}</h2><p>${data.text}</p></div>`;
            }
        })
        .catch(error => {
            console.error('Erro ao buscar o versículo:', error);
            const verseContent = document.getElementById('verseContent');
            verseContent.innerHTML = `<div class="verse-box"><h2>Erro</h2><p>Não foi possível buscar o versículo.</p></div>`;
        });
}

function navigateVerse(direction) {
    currentVerse += direction;
    fetchVerse(currentBook, currentChapter, currentVerse);
}
