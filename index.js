const taskContainer = document.querySelector(".task__container");
let globalTaskData = [];

const generateHTML = (taskData) =>
 `  <div id=${taskData.id} class="col-md-6 col-lg-4 my-4">
        <div class="card">
            <div class="card-header gap-2 d-flex justify-content-end">
            <button class="btn btn-outline-info">
                <i class="fal fa-pencil"></i>
            </button>
            <button class="btn btn-outline-danger" name=${taskData.id} onclick="deleteCard.apply(this, arguments)">
                <i class="far fa-trash-alt" name=${taskData.id} ></i>
            </button>
            </div>
            <div class="card-body">
                <img src=${taskData.image} alt="image" class="card-img">
            <h5 class="card-title mt-4">${taskData.title}</h5>
            <p class="card-text">${taskData.description}</p>
            <span class="badge bg-primary">${taskData.type}</span>
            </div>
            <div class="card-footer">
                <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#openTask">
                    Open Task
                </button> 
            </div>
        </div>
    </div>`;

const insertToDOM = (content) => taskContainer.insertAdjacentHTML("beforeend", content);

const saveToLocalStorage = () => //update the local storage
localStorage.setItem("taskySAI", JSON.stringify({card: globalTaskData}));

const addNewCard = () => {
    //get tast data
    const taskData = {
        id: `${Date.now()}`,
        title: document.getElementById("taskTitle").value,
        image: document.getElementById("imageURL").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDescription").value,
    };
    globalTaskData.push(taskData);

    //update the local storage
    saveToLocalStorage();

    //generate html code
    const newCard = generateHTML(taskData);
    //inject it to DOM
    insertToDOM(newCard);

    //clear the form
    document.getElementById("taskTitle").value="";
    document.getElementById("imageURL").value="";
    document.getElementById("taskType").value="";
    document.getElementById("taskDescription").value="";

    return;
};

const loadExistingCards = () => {
    //check local storage
    const getData = localStorage.getItem("taskySAI");
    //parse data, if exist
    if(!getData) return;

    const taskCards = JSON.parse(getData);

    globalTaskData = taskCards.card;

    //generate HTML code for those data
    globalTaskData.map((taskData) => {
        const newCard = generateHTML(taskData);;
        //inject to DOM
        insertToDOM(newCard);
    });
    return;
};

const deleteCard = (event) => {
    const targetId = event.target.getAttribute("name");
    const elementType =event.target.tagName;
    const removeTask = globalTaskData.filter((task) => task.id !== targetId);
    globalTaskData = removeTask;
    saveToLocalStorage();

    //access DOM to remove card
    if (elementType === "BUTTON") {
        return taskContainer.removeChild(
          event.target.parentNode.parentNode.parentNode
        );
      } else {
        return taskContainer.removeChild(
          event.target.parentNode.parentNode.parentNode.parentNode
        );
      }
};