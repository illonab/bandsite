const conversationComments = document.querySelector('.conversation__comments');

const apiKey = '1c327bae-89e0-482d-9116-47630351a017';
const COMMENTS_API = `https://project-1-api.herokuapp.com/comments?api_key=${apiKey}`;

let commentsArray = [];

axios
    .get(COMMENTS_API)
    .then((data) => {
        commentsArray = data.data;
        commentsArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        displayCommentsList(commentsArray, conversationComments);
    })
    .catch((error) => {
        console.log(error);
    });

const monthDiff = (d1, d2) => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
};

const displayComment = (comment, container) => {
    const conversationComment = document.createElement('article');
    conversationComment.classList.add('conversation__comment');

    const conversationAvatar = document.createElement('div');
    conversationAvatar.classList.add('conversation__avatar');

    const conversationContent = document.createElement('div');
    conversationContent.classList.add('conversation__content');

    const conversationTop = document.createElement('div');
    conversationTop.classList.add('conversation__top');

    const conversationName = document.createElement('p');
    conversationName.classList.add('conversation__name');
    conversationName.innerText = comment.name;

    const conversationDate = document.createElement('time');
    conversationDate.classList.add('conversation__date');

    const timestampDate = new Date(comment.timestamp);

    if (monthDiff(timestampDate, new Date()) < 1) {
        conversationDate.innerText = timeago.format(timestampDate);
        conversationDate.setAttribute('title', timestampDate);
    } else {
        conversationDate.innerText = timestampDate.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });
    }

    const conversationText = document.createElement('p');
    conversationText.classList.add('conversation__text');
    conversationText.innerText = comment.comment;

    conversationTop.append(conversationName, conversationDate);
    conversationContent.append(conversationTop, conversationText);
    conversationComment.append(conversationAvatar, conversationContent);
    container.append(conversationComment);
};

const displayCommentsList = (commentsList, container) => {
    container.innerText = '';
    for (const comment of commentsList) {
        displayComment(comment, container);
    }
};

const conversationForm = document.querySelector('.conversation__form');

const validateInput = (input) => {
    if (input.value.trim() === '') {
        input.classList.add('conversation__input--error');
        return false;
    }
    input.classList.remove('conversation__input--error');
    return true;
};

const validateForm = (form) => {
    let isValid = true;
    isValid = validateInput(form.name) && isValid;
    isValid = validateInput(form.textArea) && isValid;
    return isValid;
};

const formSubmit = (submitFormEvent) => {
    submitFormEvent.preventDefault();

    const form = submitFormEvent.target;
    if (!validateForm(form)) {
        return;
    }
    const newComment = {
        name: form.name.value,
        timestamp: new Date().getTime(),
        comment: form.textArea.value
    };
    commentsArray.unshift(newComment);
    displayCommentsList(commentsArray, conversationComments);

    const newComment2 = {
        name: form.name.value,
        comment: form.textArea.value
    };

    axios({
        header: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        url: COMMENTS_API,
        data: newComment2
    });
    form.reset();
};

conversationForm.addEventListener('submit', formSubmit);
