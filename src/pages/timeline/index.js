import { onNavigate } from '../../utils/history.js';
import * as services from '../../services/index.js';

export const Timeline = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
    <div class='flex-container'>
      <button class='flex-itens' id='signout-button'>Sign Out</button> 
      <p class='flex-itens' id='hello-name'></p>
      <p class='userReview'>Would you like to write a review?</p>
      <form id='form-add-review' class='flex-container'>
        <label class='flex-itens' for='movie-serie-name'>Movie/serie name:</label>
        <input class='flex-itens' id='movie-serie-name' type='text' placeholder='' required>

        <label class='flex-itens' for='review'>Review in 400 charactes:</label>
        <input class='flex-itens' id='review' type='text' placeholder='' maxLength='500' required>  

        <label class='flex-itens'>I saw it on:</label>
        <select class='select' id='platform-choices'>
          <option value='netflix'>Netflix</option>
          <option value='prime-video'>Prime Video</option>
          <option value='hbo-go'>HBO GO</option>
          <option value='globoplay'>Globoplay</option>
          <option value='disney'>Disney+</option>
          <option value='other'>Other</option>
        </select>

        <label class='flex-itens'>Rating:</label>
        <select class='select' id='rating-stars'>
          <option value='zero'>0 stars</option>
          <option value='one'>1 star</option>
          <option value='two'>2 stars</option>
          <option value='three'>3 stars</option>
          <option value='four'>4 stars</option>
          <option value='five'>5 stars</option>
        </select>

        <button class='flex-itens' id='publish-review'>Publish</button>     
      </form>
      <hr>
      <h2 class='flex-itens'>Recents reviews</h2>
      <ul class='feed' id='recent-reviews'></ul>
    </div>
  `;

  const titleHello = rootElement.querySelector('#hello-name');
  const formReview = rootElement.querySelector('#form-add-review');
  let movieName = rootElement.querySelector('#movie-serie-name');
  let reviewText = rootElement.querySelector('#review');
  let platform = rootElement.querySelector('#platform-choices');
  let rating = rootElement.querySelector('#rating-stars');
  const publish = rootElement.querySelector('#publish-review');
  const recentReviews = rootElement.querySelector('#recent-reviews');
  const signOutButton = rootElement.querySelector('#signout-button');

  signOutButton.addEventListener('click', () => {
    services.signOut();
  });

  publish.addEventListener('click', (e) => {
    e.preventDefault();
    if (reviewText.value === '' || movieName.value === '') {
      alert('Preencha todos os campos!');
    } else {
      services.UserProfileInfo()
        .then((doc) => {
          services.Review(
            movieName.value, reviewText.value,
            platform.options[platform.selectedIndex].text,
            rating.options[rating.selectedIndex].text, doc,
          )
            .then(() => {
              formReview.reset();
              onNavigate('/timeline');
            })
            .catch((error) => {
              alert(error.code + error.message);
            });
        });
    }
  });

  function deleteReviews(postId) {
    services.ReviewPost(postId).delete()
      .then(() => {
        window.location = '/timeline';
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function editReviews(postId) {
    const modal = '';
    services.ReviewPost(postId).get()
      .then((post) => {
        const modalTemplate = `
          <button class='flex-itens' id='close-button'>&#10006;</button>
          <p class='flex-itens'>${post.data().name}</p>
          <p class='flex-itens'>${post.data().username}</p>
          <form class='flex-container'>
            <label class='flex-itens' for='movie-serie-name'>Movie/serie name:</label>
            <input class='flex-itens' id='movie-serie-name' type='text' value='${post.data().movieName}' required>
            
            <label class='flex-itens' for='review'>Review in 400 charactes:</label>
            <input class='flex-itens' id='review' type='text' value='${post.data().review}' maxLength='500' required>
                        
            <label class='flex-itens'>I saw it on:</label>
            <select class='select' id='platform-choices'>
              <option value='netflix' ${post.data().platform === 'Netflix' ? 'selected' : ''}>Netflix</option>
              <option value='prime-video' ${post.data().platform === 'Prime Video' ? 'selected' : ''}>Prime Video</option>
              <option value='hbo-go'${post.data().platform === 'HBO Go' ? 'selected' : ''}>HBO Go</option>
              <option value='globoplay' ${post.data().platform === 'Globoplay' ? 'selected' : ''}>Globoplay</option>
              <option value='disney' ${post.data().platform === 'Disney+' ? 'selected' : ''}>Disney+</option>
              <option value='other' ${post.data().platform === 'Other' ? 'selected' : ''}>Other</option>
            </select>
            
            <label class='flex-itens'>Rating:</label>
            <select class='select' id='rating-stars'>
              <option value='two' ${post.data().rating === '2 stars' ? 'selected' : ''}>2 stars</option>
              <option value='three' ${post.data().rating === '3 stars' ? 'selected' : ''}>3 stars</option>
              <option value='four' ${post.data().rating === '4 stars' ? 'selected' : ''}>4 stars</option>
              <option value='five' ${post.data().rating === '5 stars' ? 'selected' : ''}>5 stars</option>
            </select>
          </form>
          <button class='flex-itens' id='update-review'>Update</button>
        `;

        modal.innerHTML = modalTemplate;

        const closeButton = modal.querySelector('#close-button');
        movieName = modal.querySelector('#movie-serie-name');
        reviewText = modal.querySelector('#review');
        platform = modal.querySelector('#platform-choices');
        rating = modal.querySelector('#rating-stars');
        const update = modal.querySelector('#update-review');

        closeButton.addEventListener('click', () => { modal.style.display = 'none'; });

        update.addEventListener('click', () => {
          services.ReviewPost(postId).update({
            movieName: movieName.value === post.data().movieName
              ? post.data().movieName : movieName.value,
            review: reviewText.value === post.data().review
              ? post.data().review : reviewText.value,
            platform: platform.options[platform.selectedIndex].text === post.data().platform
              ? post.data().platform : platform.options[platform.selectedIndex].text,
            rating: rating.options[rating.selectedIndex].text === post.data().rating
              ? post.data().rating : rating.options[rating.selectedIndex].text,
          })
            .then(() => {
              modal.style.display = 'none';
              window.location = '/timeline';
            });
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function addPost(doc) {
    doc.forEach((post) => {
      const postTemplate = `
            <li>
                
                <h1><b>${post.data().movieName}</b></h1>
                <p>${post.data().name} <i>@${post.data().username}</i></p>
                <p>${post.data().review}</p>
                <p><b>Rating:</b> ${post.data().rating}</p>
                <p><b>Watched on:</b> ${post.data().platform}</p>
                <p>${post.data().review}</p>
                <input type='checkbox' data-id='${post.id}' id='agree' name='agree' class=' ${post.data().agree.includes(services.UserInfoUid()) ? 'agree-button none vermelho' : 'agree-button none'}' ${post.data().agree.includes(services.UserInfoUid()) ? 'checked' : ''} >
                <label for='agree' class='agree'>&#128077; ${post.data().agree.length > 0 ? post.data().agree.length : '0'}</label>
                <input type='checkbox' data-id='${post.id}' id ='disagree' name='disagree' class='disagree-button none' ${post.data().disagree.includes(services.UserInfoUid()) ? 'checked' : ''}> 
                <label for='disagree' class='disagree'>&#128078; ${post.data().disagree.length > 0 ? post.data().disagree.length : '0'}</label>
                <button data-id='${post.id}' class='${post.data().userUid === services.UserInfoUid() ? 'delete-button' : 'none'}'>&#128465;</button>
                <button data-id='${post.id}' class='${post.data().userUid === services.UserInfoUid() ? 'edit-button' : 'none'}'>&#9998;</button>
                <div data-id='${post.id}' class='edit-modal flex-container'></div>
            </li>
            `;
      recentReviews.innerHTML += postTemplate;
    });

    const deleteButton = recentReviews.querySelectorAll('.delete-button');
    const editButton = recentReviews.querySelectorAll('.edit-button');
    const agreeButton = recentReviews.querySelectorAll('.agree-button');
    const disagreeButton = recentReviews.querySelectorAll('.disagree-button');

    agreeButton.forEach((button) => {
      const agreeBtn = button.parentNode.querySelector('.agree-button');
      const agreeLabel = button.parentNode.querySelector('.agree');
      if (agreeBtn.checked) {
        agreeLabel.classList.add('vermelho');
      }
    });

    disagreeButton.forEach((button) => {
      const disagreeBtn = button.parentNode.querySelector('.disagree-button');
      const disagreeLabel = button.parentNode.querySelector('.disagree');
      if (disagreeBtn.checked) {
        disagreeLabel.classList.add('vermelho');
      }
    });

    deleteButton.forEach((button) => {
      button.addEventListener('click', (event) => {
        const deleteBtn = event.target.parentNode.querySelector('.delete-button');
        services.ReviewPost(deleteBtn.dataset.id).get()
          .then((post) => {
            if (post.data().userUid === services.UserInfoUid()) {
              if (window.confirm('Are you sure you want to delete it?')) {
                deleteReviews(deleteBtn.dataset.id);
              }
            } else {
              alert("You can't delete a post from another person!");
            }
          })
          .catch((error) => {
            alert(error.message);
          });
      });
    });

    editButton.forEach((button) => {
      button.addEventListener('click', (event) => {
        const editBtn = event.target.parentNode.querySelector('.edit-button');
        const editMdl = event.target.parentNode.querySelector('.edit-modal');
        editMdl.style.display = 'block';
        services.ReviewPost(editMdl.dataset.id).get()
          .then((post) => {
            if (post.data().userUid === services.UserInfoUid()) {
              editReviews(editBtn.dataset.id, editMdl);
            } else {
              alert("You can't edit a post from another person!");
            }
          })
          .catch((error) => {
            alert(error.message);
          });
      });
    });

    agreeButton.forEach((button) => {
      button.addEventListener('click', (event) => {
        const agreeBtn = event.target.parentNode.querySelector('.agree-button');
        const disagreeBtn = event.target.parentNode.querySelector('.disagree-button');
        const agreeLabel = event.target.parentNode.querySelector('.agree');
        if (agreeBtn.checked) {
          services.AgreePostClick(agreeBtn.dataset.id);
          disagreeBtn.checked = false;
          services.DisagreePostClickOut(agreeBtn.dataset.id);
          agreeLabel.classList.add('vermelho');
        } else {
          services.AgreePostClickOut(agreeBtn.dataset.id);
        }
      });
    });

    disagreeButton.forEach((button) => {
      button.addEventListener('click', (event) => {
        const disagreeBtn = event.target.parentNode.querySelector('.disagree-button');
        const agreeBtn = event.target.parentNode.querySelector('.agree-button');
        if (disagreeBtn.checked) {
          services.DisagreePostClick(disagreeBtn.dataset.id);
          agreeBtn.checked = false;
          services.AgreePostClickOut(disagreeBtn.dataset.id);
        } else {
          services.DisagreePostClickOut(disagreeBtn.dataset.id);
        }
      });
    });
  }

  function loadReviews() {
    recentReviews.innerHTML = 'Carregando...';
    services.ReviewsData()
      .then((doc) => {
        recentReviews.innerHTML = '';
        addPost(doc);
      });
  }

  function headerName() {
    services.UserProfileInfo()
      .then((doc) => {
        titleHello.innerHTML = `Hello, ${doc.data().name}`;
      });
  }

  loadReviews();
  headerName();
  return rootElement;
};
