const conversationComments = document.querySelector('.conversation__comments');

let commentsArray = [];

const displayComment = (comment, container) => {
    const conversationComment = createElement({ tagName: 'article', classes: ['conversation__comment'] });

    const conversationAvatar = createElement({ tagName: 'div', classes: ['conversation__avatar'] });

    const conversationContent = createElement({ tagName: 'div', classes: ['conversation__content'] });

    const conversationTop = createElement({ tagName: 'div', classes: ['conversation__top'] });

    const conversationName = createElement({
        tagName: 'p',
        classes: ['conversation__name'],
        innerText: comment.name
    });

    const conversationDate = createElement({
        tagName: 'time',
        classes: 'conversation__date',
        innerText: formatDateString(comment.timestamp)
    });
    conversationDate.setAttribute('title', new Date(comment.timestamp));

    const conversationText = createElement({
        tagName: 'p',
        classes: 'conversation__text',
        innerText: comment.comment
    });

    const conversationActions = createElement({ tagName: 'div', classes: ['conversation__actions'] });

    const conversationLike = createElement({ tagName: 'div', classes: ['conversation__like', 'like'] });

    const likeBtn = createElement({ tagName: 'button', classes: ['like__btn'] });
    likeBtn.dataset.commentId = comment.id;

    const likeCounter = createElement({
        tagName: 'span',
        classes: ['like__counter'],
        innerText: comment.likes
    });

    const conversationDelete = createElement({ tagName: 'button', classes: ['conversation__delete'] });
    conversationDelete.dataset.commentId = comment.id;

    conversationTop.append(conversationName, conversationDate);
    conversationLike.append(likeBtn, likeCounter);
    conversationActions.append(conversationLike, conversationDelete);
    conversationContent.append(conversationTop, conversationText, conversationActions);
    conversationComment.append(conversationAvatar, conversationContent);
    container.append(conversationComment);
};

const replaceComment = (currentCommentsArray, commentIdToReplace, newComment) => {
    const newComments = [...currentCommentsArray];
    const commentIndexToReplace = newComments.findIndex((comment) => {
        if (comment.id === commentIdToReplace) {
            return true;
        }
    });
    newComments[commentIndexToReplace] = newComment;
    return newComments;
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
        comment: form.textArea.value
    };

    axios({
        header: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        url: COMMENTS_API,
        data: newComment
    })
        .then((response) => {
            if (response.status !== 200) {
                return;
            }
            commentsArray.unshift(response.data);
            displayCommentsList(commentsArray, conversationComments);
        })
        .catch((error) => {
            console.log(error);
        });
    form.reset();
};

conversationForm.addEventListener('submit', formSubmit);

conversationComments.addEventListener('click', (e) => {
    if (e.target.classList.contains('conversation__delete')) {
        axios
            .delete(`https://project-1-api.herokuapp.com/comments/${e.target.dataset.commentId}?api_key=${API_KEY}`)
            .then((response) => {
                if (response.status !== 200) {
                    return;
                }
                commentsArray = commentsArray.filter((comment) => comment.id !== e.target.dataset.commentId);
                displayCommentsList(commentsArray, conversationComments);
            })
            .catch((error) => {
                console.log(error);
            });
    }
});

conversationComments.addEventListener('click', (e) => {
    if (e.target.classList.contains('like__btn')) {
        axios
            .put(`https://project-1-api.herokuapp.com/comments/${e.target.dataset.commentId}/like?api_key=${API_KEY}`)
            .then((response) => {
                if (response.status !== 200) {
                    return;
                }
                commentsArray = replaceComment(commentsArray, e.target.dataset.commentId, response.data);
                displayCommentsList(commentsArray, conversationComments);
            })
            .catch((error) => {
                console.log(error);
            });
    }
});

axios
    .get(COMMENTS_API)
    .then((response) => {
        if (response.status !== 200) {
            return;
        }
        commentsArray = response.data;
        commentsArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        displayCommentsList(commentsArray, conversationComments);
    })
    .catch((error) => {
        console.log(error);
    });
