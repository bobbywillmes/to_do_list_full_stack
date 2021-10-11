$(document).on("turbolinks:load", function () {
  if ($('.static_pages.index').length > 0) {
    indexTasks(function (response) {
      // build HTML for each task
      var htmlString = response.tasks.map(function(task) {
        console.log(task)
        let checkbox
        let isComplete = ''
        if(task.completed) {
          isComplete = ' complete'
          checkbox = `<input class="form-check-input" type="checkbox" id="${task.id}" checked>`
        } else {
          checkbox = `<input class="form-check-input" type="checkbox" id="${task.id}">`
        }
        let taskHtml = 
        `<div class="form-check ${isComplete}">
          ${checkbox}
          <label class="form-check-label" for="${task.id}">
            ${task.content}
          </label>
          <span class="del" for="${task.id}"><i class="fas fa-trash-alt"></i></span>
        </div>`
        return taskHtml
      });
      $("#tasks").html(htmlString);
    });
  }
});

$(document).ready(() => {

  // create a task -------------------------------------
  $('#add-button').on('click', function(task) {
    // get the new task, then postTask to server
    let taskVal = $('#todo-input').val()
    postTask(taskVal)
    // clear input value
    $('#todo-input').val('')
    // create html for new task, then add it to page
    let taskHtml = 
        `<div class="form-check">
          <input class="form-check-input" type="checkbox" id="${task.id}">
          <label class="form-check-label" for="${task.id}">
            ${taskVal}
          </label>
          <span class="del" for="${task.id}"><i class="fas fa-trash-alt"></i></span>
        </div>`
    $('#tasks').append(taskHtml)
  })

  // delete a task -------------------------------------
  $('#tasks').on('click', 'span', function() {
    // get the task id
    let taskId = $(this).attr('for')
    console.log(`delete task: ${taskId}`)
    // delete task from DB
    deleteTask(taskId)
    // delete task from page
    let taskEl = $(`#${taskId}`).parent()
    console.log(taskEl)
    taskEl.remove()
  })

  // mark a task complete -------------------------------------
  $('#tasks').on('click', 'input', function() {
    let taskId = $(this).attr('id')
    console.log(`mark task complete: ${taskId}`)
    let taskEl = $(`#${taskId}`)
    let isChecked = taskEl.is(':checked')
    console.log(isChecked)
    if(isChecked) {
      markTaskComplete(taskId)
      taskEl.parent().addClass('complete')
    } else {
      markTaskActive(taskId)
      taskEl.parent().removeClass('complete')
    }
  })

  // show/hide trash-can on task hover -------------------------------------
  $('#tasks').on('mouseover', '.form-check', function() {
    let delBtn = $(this).find('span')
    delBtn.addClass('show')
  })
  $('#tasks').on('mouseout', '.form-check', function() {
    let delBtn = $(this).find('span')
    delBtn.removeClass('show')
  })

  // prevent page refresh when hitting 'enter' in input
  let input = document.querySelector('#todo-input')
  input.addEventListener('keydown', (e) => {
    if(e.key == 'Enter') {
      e.preventDefault()
    }
  })

  
})