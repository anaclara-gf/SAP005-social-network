// import { createPlugin } from "stylelint";
import { Review, ReviewsData, UserProfileInfo, signOut, UserInfoUid, ReviewPost, AgreePostClick, DisagreePostClick, AgreePostClickOut, DisagreePostClickOut, SaveComment, GetComments, GetComment } from "../../services/index.js";

export const Timeline = () => {
    const rootElement = document.createElement('div');
    rootElement.classList.add("flex-container", "timeline-page")
    rootElement.innerHTML = `
        <div class="signout-button">
            <p class="flex-itens" id="hello-name"></p>
            <button class="flex-itens" id="signout-button"><img class="logout-image" src="./images/logout.png"></button> 
        </div>
        
        <button class="userReview">Would you like to write a review?</button>

        <form id="form-add-review" class="flex-container form-review none">

            <label class="flex-itens" for="movie-serie-name">Movie/serie name:</label>
            <input class="flex-itens" id="movie-serie-name" type="text" placeholder="" required>

            <label class="flex-itens" for="review">Review in 400 charactes:</label>
            <input class="flex-itens" id="review" type="text" placeholder="" maxLength="500" required>
            
            <label class="flex-itens">I saw it on:</label>
            <select class="select" id="platform-choices">
              <option value="netflix">Netflix</option>
              <option value="prime-video">Prime Video</option>
              <option value="hbo-go">HBO GO</option>
              <option value="globoplay">Globoplay</option>
              <option value="disney">Disney+</option>
              <option value="other">Other</option>
            </select>

            <label class="flex-itens">Rating:</label>
            <select class="select" id="rating-stars">
              <option value="zero">0 stars</option>
              <option value="one">1 star</option>
              <option value="two">2 stars</option>
              <option value="three">3 stars</option>
              <option value="four">4 stars</option>
              <option value="five">5 stars</option>
            </select>

            <div class="publish-cancel-buttons">
                <button class="flex-itens" id="publish-review">Publish</button>
                <button class="flex-itens" id="cancel-review">Cancel</button>
            </div>
        
        </form>
        <h2 class="flex-itens">Recents reviews</h2>
        <ul class="feed" id="recent-reviews"></ul>
    `;

    const titleHello = rootElement.querySelector("#hello-name");
    const formReview = rootElement.querySelector("#form-add-review");
    const movieName = rootElement.querySelector("#movie-serie-name");
    const reviewText = rootElement.querySelector("#review");
    const platform = rootElement.querySelector("#platform-choices");
    const rating = rootElement.querySelector("#rating-stars");
    const publish = rootElement.querySelector("#publish-review");
    const cancel = rootElement.querySelector("#cancel-review");
    const recentReviews = rootElement.querySelector("#recent-reviews");
    const signOutButton = rootElement.querySelector('#signout-button');
    const userReviewButton = rootElement.querySelector('.userReview');

    userReviewButton.addEventListener('click', () => {
        formReview.classList.toggle('none');

        if(userReviewButton.innerHTML === "Would you like to write a review?"){
            userReviewButton.innerHTML = "Close";
        }else {
            userReviewButton.innerHTML = "Would you like to write a review?";
        }
    })

    signOutButton.addEventListener('click', () => {
        signOut()
    })

    cancel.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to cancel your post?")){
            formReview.reset();
            formReview.classList.add('none');
            userReviewButton.innerHTML = "Would you like to write a review?"
        }       
    })

    publish.addEventListener('click', (e) => {
        e.preventDefault();
        if (reviewText.value === "" | movieName.value === "") {
            alert("Preencha todos os campos!")
        } else {
            UserProfileInfo()
                .then(doc => {
                    Review(movieName.value, reviewText.value, platform.options[platform.selectedIndex].text, rating.options[rating.selectedIndex].text, doc)
                        .then(() => {
                            formReview.reset();
                            formReview.classList.add('none');
                            userReviewButton.innerHTML = "Would you like to write a review?"
                            loadReviews();
                        })
                        .catch((error) => {
                            alert(error.code + error.message)
                        })
                })
        }
    })

    function deleteReviews(postId) {
        ReviewPost(postId).delete();
    }

    function editReviews(postAfter, postId, modal, postMovieName, postReview, postRating, postPlatform) {
        ReviewPost(postId).get()
            .then(post => {
                const modalTemplate = `
                    <div class="close-button">
                        <button class="flex-itens" id="close-button">&#10006;</button>
                    </div>
                    
                    <p>${post.data().name} <i>@${post.data().username}</i></p>
                    <form class="form-edit">
                        <label class="flex-itens" for="movie-serie-name">Movie/serie name:</label>
                        <input class="flex-itens" id="movie-serie-name" type="text" value="${post.data().movieName}" required>
            
                        <label class="flex-itens" for="review">Review in 400 charactes:</label>
                        <input class="flex-itens" id="review" type="text" value="${post.data().review}" maxLength="500" required>
                        
                        <label class="flex-itens">I saw it on:</label>
                        <select class="select" id="platform-choices">
                        <option value="netflix" ${post.data().platform === "Netflix" ? "selected" : ""}>Netflix</option>
                        <option value="prime-video" ${post.data().platform === "Prime Video" ? "selected" : ""}>Prime Video</option>
                        <option value="hbo-go"${post.data().platform === "HBO Go" ? "selected" : ""}>HBO Go</option>
                        <option value="globoplay" ${post.data().platform === "Globoplay" ? "selected" : ""}>Globoplay</option>
                        <option value="disney" ${post.data().platform === "Disney+" ? "selected" : ""}>Disney+</option>
                        <option value="other" ${post.data().platform === "Other" ? "selected" : ""}>Other</option>
                        </select>
            
                        <label class="flex-itens">Rating:</label>
                        <select class="select" id="rating-stars">
                        <option value="zero" ${post.data().rating === "0 stars" ? "selected" : ""}>0 stars</option>
                        <option value="one" ${post.data().rating === "1 star" ? "selected" : ""}>1 star</option>
                        <option value="two" ${post.data().rating === "2 stars" ? "selected" : ""}>2 stars</option>
                        <option value="three" ${post.data().rating === "3 stars" ? "selected" : ""}>3 stars</option>
                        <option value="four" ${post.data().rating === "4 stars" ? "selected" : ""}>4 stars</option>
                        <option value="five" ${post.data().rating === "5 stars" ? "selected" : ""}>5 stars</option>
                        </select>
                    
                        <button class="flex-itens" id="update-review">Update</button>
                    </form>
                `;

                modal.innerHTML = modalTemplate;

                const closeButton = modal.querySelector("#close-button");
                let movieName = modal.querySelector("#movie-serie-name");
                let reviewText = modal.querySelector("#review");
                let platform = modal.querySelector("#platform-choices");
                let rating = modal.querySelector("#rating-stars");
                const update = modal.querySelector("#update-review");

                closeButton.addEventListener('click', () => {
                    modal.classList.add('none');
                    postAfter.classList.remove('none');
                });

                update.addEventListener('click', (e) => {
                    e.preventDefault();
                    ReviewPost(postId).update({
                        movieName: movieName.value === post.data().movieName ? post.data().movieName : movieName.value,
                        review: reviewText.value === post.data().review ? post.data().review : reviewText.value,
                        platform: platform.options[platform.selectedIndex].text === post.data().platform ? post.data().platform : platform.options[platform.selectedIndex].text,
                        rating: rating.options[rating.selectedIndex].text === post.data().rating ? post.data().rating : rating.options[rating.selectedIndex].text,
                    })
                        .then(() => {
                            modal.classList.add("none");
                            postMovieName.innerHTML = `<b>${movieName.value}</b>`;
                            postReview.innerHTML = `${reviewText.value}`;
                            postPlatform.innerHTML = `<b>Watched on:</b> ${platform.options[platform.selectedIndex].text}`;
                            postRating.innerHTML = `<b>Rating:</b> ${rating.options[rating.selectedIndex].text}`;
                            postAfter.classList.remove("none");
                        });
                });
            });
    }

    function commentReviews(postId, modal, commentsList, name, username, userId) {
        const modalTemplate = `
            <div class="comment-input">
                <input type="text" id="comment-input" placeholder="Write a comment about this review" required>
                <button class="send-comment-button">Send</button>
            </div>
        `;
        modal.innerHTML = modalTemplate;

        const sendCommentButton = modal.querySelector(".send-comment-button");
        const comment = modal.querySelector("#comment-input");

        sendCommentButton.addEventListener('click', (e) => {
            e.preventDefault();
            SaveComment(postId, comment.value, name, username, userId)
                .then(() => {
                    comment.value = "";
                    commentsList.innerHTML = "";
                    printCommentsList(postId, commentsList);
                });
        });
    }

    function deleteComment(event, commentsList) {
        const deleteCommentBtn = event.target.parentNode.querySelector('.delete-comment-button');
        GetComment(deleteCommentBtn.dataset.id).get() 
            .then(doc => {
                if(doc.data().userId === UserInfoUid()){
                    if (confirm("Are you sure you want to delete it?")) {
                        GetComment(deleteCommentBtn.dataset.id).delete();
                        commentsList.innerHTML = "";
                    } else {
                        alert("You can't delete a post from another person!")
                    }
                }
            })
    }

    function printCommentsList(postId, commentsList) {
        GetComments(postId)
            .then(doc => {
                doc.forEach(comment => {
                    const commentTemplate = `
                        <li class="comment-item" data-id="${comment.id}">
                            <div class="comment-div">
                                <p id="comment-name">${comment.data().name} <i>@${comment.data().username}</i></p>
                                <p data-id="${comment.id}" id="comment-text">${comment.data().commentText}</p>
                            </div>
                            <button data-id="${comment.id}" class="${comment.data().userId === UserInfoUid() ? "delete-comment-button" : "none"}">&#128465;</button>
                        </li>
                    `;
                    commentsList.innerHTML += commentTemplate;
                });

                const deleteCommentButton = commentsList.querySelector(".delete-comment-button");

                if(deleteCommentButton !== null){
                    deleteCommentButton.addEventListener('click', (event) => {
                        deleteComment(event, commentsList);
                    })
                }                
            });
    }

    const addPost = (doc) => {
        doc.forEach(post => {
            const postTemplate = `
            <li class="post-li" data-id="${post.id}">
                <div class="post">

                    <div class="post-header">
                        <h1 class="movie-name"><b>${post.data().movieName}</b></h1>
                        <div class="edit-delete-buttons">
                                <button data-id="${post.id}" class="${post.data().userUid === UserInfoUid() ? "delete-button" : "none"}">&#128465;</button>
                                <button data-id="${post.id}" class="${post.data().userUid === UserInfoUid() ? "edit-button" : "none"}">&#9998;</button>
                        </div>
                    </div>

                    <p>${post.data().name} <i>@${post.data().username}</i></p>
                    <p class="review">${post.data().review}</p>
                    <p class="rating"><b>Rating:</b> ${post.data().rating}</p>
                    <p class="platform"><b>Watched on:</b> ${post.data().platform}</p>

                    <div class="user-actions">
                        <div class="agree-disagree-buttons">
                            <input type="checkbox" data-id="${post.id}" id="${post.id}-agree" name="agree" class="agree-button none" ${post.data().agree.includes(UserInfoUid()) ? "checked" : ""}>
                            <label for="${post.id}-agree" class="agree">&#128077; ${post.data().agree.length > 0 ? post.data().agree.length : "0"}</label>
                        
                            <input type="checkbox" data-id="${post.id}" id="${post.id}-disagree" name="disagree" class="disagree-button none" ${post.data().disagree.includes(UserInfoUid()) ? "checked" : ""}> 
                            <label for="${post.id}-disagree" class="disagree">&#128078; ${post.data().disagree.length > 0 ? post.data().disagree.length : "0"}</label>

                            <button data-id="${post.id}" class="comment-button"></button>
                        </div>
                    </div>

                    <div data-id="${post.id}" class="open-comments none">
                        <div data-id="${post.id}" class="comment-modal"></div>
                        <ul data-id="${post.id}" class="comments-list"></ul>
                    </div>
                </div>

                <div data-id="${post.id}" class="edit-modal none"></div>
            </li>
            `;
            recentReviews.innerHTML += postTemplate
        })

        const deleteButton = recentReviews.querySelectorAll(".delete-button");
        const editButton = recentReviews.querySelectorAll(".edit-button");
        const agreeButton = recentReviews.querySelectorAll(".agree-button");
        const disagreeButton = recentReviews.querySelectorAll(".disagree-button");
        const commentButton = recentReviews.querySelectorAll(".comment-button");

        deleteButton.forEach(button => {
            button.addEventListener('click', (event) => {
                const deleteBtn = event.target.parentNode.querySelector('.delete-button');
                const post = deleteBtn.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.post-li');
                const allPosts = post.parentNode.parentNode.parentNode.querySelector('.feed');

                ReviewPost(deleteBtn.dataset.id).get()
                    .then(doc => {
                        if (doc.data().userUid === UserInfoUid()) {
                            if (confirm("Are you sure you want to delete it?")) {
                                deleteReviews(deleteBtn.dataset.id);
                                allPosts.removeChild(post);
                            }
                        } else {
                            alert("You can't delete a post from another person!")
                        }
                    })
                    .catch((error) => {
                        alert(error.message)
                    })
            })
        })

        editButton.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                let editBtn = e.target.parentNode.querySelector('.edit-button');
                let editMdl = e.target.parentNode.parentNode.parentNode.parentNode.querySelector('.edit-modal');
                let post = e.target.parentNode.parentNode.parentNode.parentNode.querySelector('.post');
                const movieName = recentReviews.querySelector(".movie-name");
                const review = recentReviews.querySelector(".review");
                const rating = recentReviews.querySelector(".rating");
                const platform = recentReviews.querySelector(".platform");

                post.classList.add('none');
                editMdl.classList.remove('none');
                
                ReviewPost(editBtn.dataset.id).get()
                    .then(doc => {
                        if (doc.data().userUid === UserInfoUid()) {
                            editReviews(post, editBtn.dataset.id, editMdl, movieName, review, rating, platform);
                        } else {
                            alert("You can't edit a post from another person!")
                        }
                    })
                    .catch((error) => {
                        alert(error.message)
                    })
            })
        })

        agreeButton.forEach(button => {
            button.addEventListener('click', (event) => {
                const agreeBtn = event.target.parentNode.querySelector('.agree-button');
                const disagreeBtn = event.target.parentNode.querySelector('.disagree-button');
                const agreeLabel = event.target.parentNode.querySelector('.agree');
                const disagreeLabel = event.target.parentNode.querySelector('.disagree');
                ReviewPost(agreeBtn.dataset.id).get()
                    .then(doc => {
                        if (agreeBtn.checked) {
                            agreeLabel.innerHTML = "&#128077;" + parseInt(++doc.data().agree.length);
                            AgreePostClick(agreeBtn.dataset.id)
                            disagreeBtn.checked === true ? disagreeLabel.innerHTML = "&#128078;" + parseInt(--doc.data().disagree.length) : "";
                            disagreeBtn.checked = false;
                            DisagreePostClickOut(agreeBtn.dataset.id)
                        } else {
                            agreeLabel.innerHTML = "&#128077;" + parseInt(--doc.data().agree.length);
                            AgreePostClickOut(agreeBtn.dataset.id)
                        }
                    })
            })
        })

        disagreeButton.forEach(button => {
            button.addEventListener('click', (event) => {
                const disagreeBtn = event.target.parentNode.querySelector('.disagree-button');
                const agreeBtn = event.target.parentNode.querySelector('.agree-button');
                const agreeLabel = event.target.parentNode.querySelector('.agree');
                const disagreeLabel = event.target.parentNode.querySelector('.disagree');
                ReviewPost(disagreeBtn.dataset.id).get()
                    .then(doc => {
                        if (disagreeBtn.checked) {
                            disagreeLabel.innerHTML = "&#128078;" + parseInt(++doc.data().disagree.length);
                            DisagreePostClick(disagreeBtn.dataset.id)
                            agreeBtn.checked === true ? agreeLabel.innerHTML = "&#128077;" + parseInt(--doc.data().agree.length) : "";
                            agreeBtn.checked = false;
                            AgreePostClickOut(disagreeBtn.dataset.id)
                        } else {
                            disagreeLabel.innerHTML = "&#128078;" + parseInt(--doc.data().disagree.length);
                            DisagreePostClickOut(disagreeBtn.dataset.id)
                        }
                    })
            })
        })
        
        commentButton.forEach(button => {
            GetComments(button.dataset.id)
                .then(doc => {button.innerHTML = `${doc.docs.length} ${doc.docs.length > 1 ? "Comments" : "Comment"}`})
            button.addEventListener('click', (event) => {
                const commentBtn = event.target.parentNode.querySelector('.comment-button');
                const openComments = event.target.parentNode.parentNode.parentNode.querySelector('.open-comments');
                const commentMdl = openComments.querySelector(".comment-modal");
                const commentsList = openComments.querySelector(".comments-list")
                openComments.classList.toggle("none");

                if(commentBtn.innerHTML !== "Close"){
                    commentBtn.innerHTML = "Close";
                }else {
                    GetComments(button.dataset.id)
                        .then(doc => {button.innerHTML = `${doc.docs.length} ${doc.docs.length > 1 ? "Comments" : "Comment"}`})
                }

                commentsList.innerHTML = "";
                printCommentsList(openComments.dataset.id, commentsList);

                UserProfileInfo()
                    .then(doc => {
                        commentReviews(openComments.dataset.id, commentMdl, commentsList, doc.data().name, doc.data().username, doc.id);
                    })
            })
        })
    }

    function loadReviews() {
        recentReviews.innerHTML = 'Carregando...';
        ReviewsData()
            .then(doc => {
                recentReviews.innerHTML = '';
                addPost(doc);
            })
    }

    function headerName() {
        UserProfileInfo()
            .then(doc => {
                titleHello.innerHTML = `Hello, ${doc.data().name}`;
            });
    }

    loadReviews();
    headerName();
    return rootElement;
}