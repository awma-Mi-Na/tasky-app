const taskContainer = document.querySelector(".task__container");

const globalStore = [];

const makeNewCard = (taskData) =>
  `
    <div class="col-md-6 col-lg-4" id=${taskData.id}>
            <div class="card">
              <div class="card-header d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-outline-success">
                  <i class="fas fa-pencil-alt"></i>
                </button>
                <button type="button" class="btn btn-outline-danger">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
              <img
                src=${taskData.imageUrl}
                class="card-img-top"
                alt="nothing"
              />

              <div class="card-body">
                <h5 class="card-title">${taskData.taskTitle}</h5>
                <p class="card-text">
                  ${taskData.taksDescription}
                </p>
                <a href="#" class="btn btn-primary">${taskData.taskType}</a>
              </div>
              <div class="card-footer">
                <button type="button" class="btn btn-outline-primary float-end">
                  Open Task
                </button>
              </div>
            </div>
          </div>
    `;

const loadInitialCardData = () => {
  //get card data from the localstorage
  const getCardData = localStorage.getItem("tasky");

  //convert the retrieved data into an object
  const { cards } = JSON.parse(getCardData);

  //for each of the card objects we create html code or in other words we are injecting html for each card object to DOM
  cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend", makeNewCard(cardObject));

    //update globalStore
    globalStore.push(cardObject);
  });
};

const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`, //unique number for id
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("taskTitle").value,
    taskType: document.getElementById("taskType").value,
    taksDescription: document.getElementById("taskDesrciption").value,
  };

  taskContainer.insertAdjacentHTML("beforeend", makeNewCard(taskData));

  globalStore.push(taskData);

  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore })); //cards:globalStire is needed because json expects an object parameter, so we use cards as our key for the globalStore array
};
