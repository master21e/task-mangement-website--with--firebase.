firebase.initializeApp({
    apiKey: "AIzaSyAA2tYPZiqv282jVgjDkfn-qwi0OhRM3fU",
    authDomain: "to-do-list-101-db803.firebaseapp.com",
    projectId: "to-do-list-101-db803",
    storageBucket: "to-do-list-101-db803.appspot.com",
    messagingSenderId: "1025915437775",
    appId: "1:1025915437775:web:5625f760a7c22046646dba",
});

const db = firebase.firestore();

// function to add tasks
function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            taskInput.value = "";
            console.log("Task added.");
        })
        .catch((error) => {
            console.error("Error adding task: ", error);
        });
    }
}

function renderTasks(doc) {
    const tasklist = document.getElementById("task-list");
    const taskitem = document.createElement("li");
    taskitem.className = "task-item";
    taskitem.innerHTML = `
        <span>${doc.data().task}</span>
        <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    tasklist.appendChild(taskitem);
}

db.collection("tasks")
  .orderBy("timestamp", "desc")
  .onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
      if (change.type === "added") {
        renderTasks(change.doc);

      }
    });
  });

  function deleteTask(id){
    db.collection("tasks").doc(id).delete();

  }