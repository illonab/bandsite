const conversationComments = document.querySelector('.conversation__comments');
const commentsArray = [
    {
        name: 'Connor Walton',
        timestamp: new Date('02/17/2021'),
        commentText:
            'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.'
    },
    {
        name: 'Emilie Beach',
        timestamp: new Date('01/09/2021'),
        commentText:
            'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.'
    },
    {
        name: 'Miles Acosta',
        timestamp: new Date('12/20/2020'),
        commentText:
            "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];

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

    if (monthDiff(comment.timestamp, new Date()) < 1) {
        conversationDate.innerText = timeago.format(comment.timestamp);
        conversationDate.setAttribute('title', comment.timestamp);
    } else {
        conversationDate.innerText = comment.timestamp.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });
    }

    const conversationText = document.createElement('p');
    conversationText.classList.add('conversation__text');
    conversationText.innerText = comment.commentText;

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
        timestamp: new Date(),
        commentText: form.textArea.value
    };
    commentsArray.unshift(newComment);
    displayCommentsList(commentsArray, conversationComments);
    form.reset();
};

conversationForm.addEventListener('submit', formSubmit);
displayCommentsList(commentsArray, conversationComments);
