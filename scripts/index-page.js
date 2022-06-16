let conversationComments = document.querySelector(".conversation__comments");
const commentsArray = [
    {
        name: "Connor Walton",
        timestamp: "02/17/2021",
        commentText: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        name: "Emilie Beach",
        timestamp: "01/09/2021",
        commentText: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        name: "Miles Acosta",
        timestamp: "12/20/2020",
        commentText: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
]

const displayCommentsList = (commentsList, container) => {
    container.innerText = "";
    for (let comment of commentsList) {
        displayComment(comment, container)
    }
}

const displayComment = (comment, container) => {

    let conversationComment = document.createElement("article");
    conversationComment.classList.add("conversation__comment");
    let conversationCircle = document.createElement("div");
    conversationCircle.classList.add("conversation__circle");
    let conversationGroup = document.createElement("div");
    conversationGroup.classList.add("conversation__group");
    let conversationName = document.createElement("p");
    conversationName.classList.add("conversation__name");
    conversationName.innerText = `${comment.name}`;
    let conversationDate = document.createElement("time");
    conversationDate.classList.add("conversation__date");
    conversationDate.innerText = `${comment.timestamp}`;
    let conversationText = document.createElement("p");
    conversationText.classList.add("conversation__text");
    conversationText.innerText = `${comment.commentText}`;
    conversationGroup.append(conversationName, conversationDate);
    conversationComment.append(conversationCircle, conversationGroup, conversationText);
    container.append(conversationComment);
}

let conversationForm = document.querySelector(".conversation__form");
let conversationInput = document.querySelector(".conversation__input");

const formSubmit = (submitFormEvent) => {
    submitFormEvent.preventDefault();

    const form = submitFormEvent.target;
    if (!validateForm(form)) {
        return;
    }
    const newComment = {
        name: form.name.value,
        timestamp: new Date().toLocaleDateString("en-US"),
        commentText: form.textArea.value
    };
    commentsArray.unshift(newComment);
    displayCommentsList(commentsArray, conversationComments);
    form.reset();
}


conversationForm.addEventListener("submit", formSubmit);
displayCommentsList(commentsArray, conversationComments);

const validateForm = (form) => {
    let isValid = true;
    isValid = validateInput(form.name) && isValid;
    isValid = validateInput(form.textArea) && isValid;
    return isValid;
}



const validateInput = (input) => {
    if (input.value === "") {
        input.classList.add("conversation__input--error");
        return false;
    } else {
        input.classList.remove("conversation__input--error");
        return true;
    }
}
