import { onNavigate } from "../../utils/history.js";
import { Review, ReviewsData, UserProfileInfo, signOut, UserInfoUid, ReviewPost} from "../../services/index.js";

export const Timeline = () => {
    const rootElement = document.createElement('div');
    rootElement.innerHTML = `
    <div class="flex-container">
        <button class="flex-itens" id="signout-button">Sign Out</button> 
        <p class="flex-itens" id="hello-name"></p>
        <p class="flex-itens">Would you like to write a review?</p>

        <form id="form-add-review" class="flex-container">

            <label class="flex-itens" for="movie-serie-name">Movie/serie name:</label>
            <input class="flex-itens" id="movie-serie-name" type="text" placeholder="" required>

            <label class="flex-itens" for="review">Review in 400 charactes:</label>
            <input class="flex-itens" id="review" type="text" placeholder="" maxLength="500" required>
            
            <label class="flex-itens">I saw it on:</label>
            <select class="select" id="platform-choices">
              <option value="netflix">Netflix</option>
              <option value="prime-video">Prime Video</option>
              <option value="hbo-go">HBO Go</option>
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

            <button class="flex-itens" id="publish-review">Publish</button>
        
        </form>
        <hr>
        <h2 class="flex-itens">Recents reviews</h2>
        <ul class="feed" id="recent-reviews"></ul>
    </div>
    `;

    const titleHello = rootElement.querySelector("#hello-name");
    const formReview = rootElement.querySelector("#form-add-review");
    const movieName = rootElement.querySelector("#movie-serie-name");
    const reviewText = rootElement.querySelector("#review");
    const platform = rootElement.querySelector("#platform-choices");
    const rating = rootElement.querySelector("#rating-stars");
    const publish = rootElement.querySelector("#publish-review");
    const recentReviews = rootElement.querySelector("#recent-reviews");
    const signOutButton = rootElement.querySelector('#signout-button');

    signOutButton.addEventListener('click', () => {
        signOut()
            .then(() => {
                onNavigate("/");
            })
            .catch((error) => {
                alert(error.code + error.message)
            })
    })
    
    publish.addEventListener('click', (e) => {
        e.preventDefault();
        Review(movieName.value, reviewText.value, platform.options[platform.selectedIndex].text, rating.options[rating.selectedIndex].text)
            .then(() => {
                formReview.reset();
                onNavigate("/timeline");
            })
    })

    const deleteReviews = (postId) => {
        ReviewPost(postId).delete().then(res => {onNavigate('/timeline')})
    }

    const editReviews = (postId, modal) => {
        ReviewPost(postId).get()
            .then(post => {
                const modalTemplate = `
                    <button class="flex-itens" id="close-button">&#10006;</button>
                    <p class="flex-itens">${post.data().name}</p>
                    <p class="flex-itens">${post.data().username}</p>
                    <form class="flex-container">
                        <label class="flex-itens" for="movie-serie-name">Movie/serie name:</label>
                        <input class="flex-itens" id="movie-serie-name" type="text" value="${post.data().movieName}" required>
            
                        <label class="flex-itens" for="review">Review in 400 charactes:</label>
                        <input class="flex-itens" id="review" type="text" value="${post.data().review}" maxLength="500" required>
                        
                        <label class="flex-itens">I saw it on:</label>
                        <select class="flex-itens" id="platform-choices">
                        <option value="netflix" ${post.data().platform === "Netflix" ? "selected" : ""}>Netflix</option>
                        <option value="prime-video" ${post.data().platform === "Prime Video" ? "selected" : ""}>Prime Video</option>
                        <option value="hbo-go"${post.data().platform === "HBO Go" ? "selected" : ""}>HBO Go</option>
                        <option value="globoplay" ${post.data().platform === "Globoplay" ? "selected" : ""}>Globoplay</option>
                        <option value="disney" ${post.data().platform === "Disney+" ? "selected" : ""}>Disney+</option>
                        <option value="other" ${post.data().platform === "Other" ? "selected" : ""}>Other</option>
                        </select>
            
                        <label class="flex-itens">Rating:</label>
                        <select class="flex-itens" id="rating-stars">
                        <option value="zero" ${post.data().rating === "0 stars" ? "selected" : ""}>0 stars</option>
                        <option value="one" ${post.data().rating === "1 star" ? "selected" : ""}>1 star</option>
                        <option value="two" ${post.data().rating === "2 stars" ? "selected" : ""}>2 stars</option>
                        <option value="three" ${post.data().rating === "3 stars" ? "selected" : ""}>3 stars</option>
                        <option value="four" ${post.data().rating === "4 stars" ? "selected" : ""}>4 stars</option>
                        <option value="five" ${post.data().rating === "5 stars" ? "selected" : ""}>5 stars</option>
                        </select>
                    </form>
                    <button class="flex-itens" id="update-review">Update</button>
                `;

                modal.innerHTML = modalTemplate;

                const closeButton = modal.querySelector("#close-button");
                let movieName = modal.querySelector("#movie-serie-name");
                let reviewText = modal.querySelector("#review");
                let platform = modal.querySelector("#platform-choices");
                let rating = modal.querySelector("#rating-stars");
                const update = modal.querySelector("#update-review");

                closeButton.addEventListener('click', () => {modal.style.display = "none"});

                update.addEventListener('click', () => {
                    ReviewPost(postId).update({
                        movieName: movieName.value === post.data().movieName ? post.data().movieName : movieName.value,
                        review: reviewText.value === post.data().review ? post.data().review : reviewText.value,
                        platform: platform.options[platform.selectedIndex].text === post.data().platform ? post.data().platform : platform.options[platform.selectedIndex].text,
                        rating: rating.options[rating.selectedIndex].text === post.data().rating ? post.data().rating : rating.options[rating.selectedIndex].text,
                    })
                    .then(() => {
                        modal.style.display = "none";
                        onNavigate("/timeline");
                    })
                })
            })
    }

    const addPost = (doc) => {
        doc.forEach(post => {
            const postTemplate = `
            <li>
                <p><b>${post.data().name}</b></p>
                <p><i>${post.data().username}</i></p>
                <p>${post.data().dataString}</p>
                <p><b>${post.data().movieName}</b></p>
                <p><b>Rating:</b> ${post.data().rating}</p>
                <p><b>Watched on:</b> ${post.data().platform}</p>
                <p>${post.data().review}</p>
                <button id="agree-button">&#128077; ${post.data().agree > 0 ? post.data().agree : ""}</button>
                <button id="disagree-button">&#128078; ${post.data().disagree > 0 ? post.data().disagree : ""}</button>
                <button data-id="${post.id}" class="${post.data().userUid === UserInfoUid() ? "delete-button" : "none"}">&#128465;</button>
                <button data-id="${post.id}" class="${post.data().userUid === UserInfoUid() ? "edit-button" : "none"}">&#9998;</button>
                <div data-id="${post.id}" class="edit-modal flex-container"></div>
                <hr>
            </li>
            `;
            recentReviews.innerHTML += postTemplate
        })

        const deleteButton = recentReviews.querySelectorAll(".delete-button");
        const editButton = recentReviews.querySelectorAll(".edit-button");
        
        deleteButton.forEach(button => {
            button.addEventListener('click', (event) => {
                let deleteBtn = event.target.parentNode.querySelector('.delete-button');
                ReviewPost(deleteBtn.dataset.id).get()
                    .then(post => {
                        if(post.data().userUid === UserInfoUid()){
                            if(confirm("Are you sure you want to delete it?")){
                                deleteReviews(deleteBtn.dataset.id);
                            }
                        }else {
                            alert("You can't delete a post from another person!")
                        }
                    })
            })
        })

        editButton.forEach(button => {
            button.addEventListener('click', (event) => {
                let editBtn = event.target.parentNode.querySelector('.edit-button');
                let editMdl = event.target.parentNode.querySelector('.edit-modal');
                editMdl.style.display = "block";
                ReviewPost(editMdl.dataset.id).get()
                    .then(post => {
                        if(post.data().userUid === UserInfoUid()){
                            editReviews(editBtn.dataset.id, editMdl);
                        }else {
                            alert("You can't edit a post from another person!")
                        }
                    })
            })
        })    
    }

    const loadReviews = () => {
        recentReviews.innerHTML = 'Carregando...';
        ReviewsData()
            .then(doc => {
                recentReviews.innerHTML = '';
                addPost(doc);
            }) 
    }

    const headerName = () => {
        firebase.auth().onAuthStateChanged(user => {
            UserProfileInfo(user.uid)
                .then(doc => {
                    titleHello.innerHTML = `Hello, ${doc.data().name}`;
                })
        })
    }
        

    loadReviews();
    headerName();

    return rootElement
}