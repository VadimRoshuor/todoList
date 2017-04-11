var Task = function (opts) {
    this.title = opts.title||"";
    this.description = opts.description ||"";
}

var TasksViewer = function (opts) {
    var listEl = opts.listEl;
    var tasks = opts.tasks || [];
    function addNewTask(){
        opts.titleInput.focus();
        var task  =new Task({title:opts.titleInput.value});
        tasks.push(task);
        renderTask(task)
        opts.titleInput.value="";
    }
    opts.titleInput.onchange=function(){
        console.log("onchange")
        addNewTask()
    }

    for (var i = 0; i < tasks.length; i++) {
        renderTask(tasks[i])
    }

    function renderTask(task){
        var listItemEl = document.createElement("li");
        listItemEl.innerHTML= task.title;
        listItemEl.className = "task"
        listItemEl.onclick = showDetails.bind(listItemEl,task)
        listEl.appendChild(listItemEl)
    }
    function showEditDescription(){
        opts.detailEls.descriptionEl.style.display='none'
        opts.detailEls.descriptionEditEl.style.display='block'
        opts.detailEls.descriptionEditEl.focus()
    }
    function hideEditDescription(){
        opts.detailEls.descriptionEl.style.display='block'
        opts.detailEls.descriptionEditEl.style.display='none'
    }
    opts.detailEls.descriptionEl.onclick = function(){
        showEditDescription()
    }

    function showDetails(task){
        document.getElementsByClassName('guideWrapper')[0].style.display="none"
        document.getElementsByClassName('detailsWrapper')[0].style.display="block"
        var listEls   =document.getElementsByClassName('task')
        for (var i = 0; i < listEls.length; i++) {
            var li = listEls[i];
            li.className = 'task';
        }
        this.className +=" active";
        console.log(task)

        opts.detailEls.titleEl.innerHTML = task.title;
        opts.detailEls.descriptionEditEl.value = task.description;
        opts.detailEls.descriptionEl.innerHTML = task.description;
        if(!task.description || task.description.length==0){
            showEditDescription()
        }else{
            hideEditDescription()
        }
        opts.detailEls.descriptionEditEl.onblur=function(){
            if(this.value.length>0)
                hideEditDescription()
            task.description = this.value;
            opts.detailEls.descriptionEl.innerHTML = task.description;

        }
    }

}


window.onload = function () {
    new TasksViewer({
        listEl: document.getElementById('tasksList'),
        titleInput:document.getElementById("newTaskTitle"),
        detailEls:{
            titleEl:document.getElementById('taskTitle'),
            descriptionEditEl:document.getElementById('taskDescription'),
            descriptionEl:document.getElementById('taskDescriptionRaw')
        },
        //saveButton:document.getElementsByClassName('save')[0],
        tasks: [new Task({title: "Задача1",description:"Это нужно сделать"}), new Task({title: "Задача2"})]
    })
}