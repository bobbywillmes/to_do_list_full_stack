$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }  
});

var indexTasks = function (successCB, errorCB) {
  var request = {
    type: 'GET',
    url: 'api/tasks?api_key=1',
    success: successCB,
    error: errorCB
  }
  $.ajax(request);
};
// indexTasks();

// ---------------  create a task  ------------------------
var postTask = function (content, successCB, errorCB) {
  console.log(`postTask -------`)
  var request = {
    type: 'POST',
    url: 'api/tasks?api_key=1',
    data: {
      task: {
        content: content
      }
    },
    success: successCB,
    error: errorCB
  }
  $.ajax(request);
};
// postTask('another task...');

// ---------------  delete a task  ------------------------
var deleteTask = function(id, successCB, errorCB) {
  console.log(`deleteTask ------`)
  var request = {
    type: 'DELETE',
    url: `api/tasks/${id}?api_key=1`,
    success: successCB,
    error: errorCB
  }
  $.ajax(request);
}

// ---------------  mark task complete   ------------------------
var markTaskComplete = function(id, successCB, errorCB) {
  console.log(`markTaskComplete -----`)
  console.log(id)
  var request = {
    type: 'PUT',
    url: `api/tasks/${id}/mark_complete?api_key=1`,
    success: successCB,
    error: errorCB
  }
  $.ajax(request);
}

// ---------------  mark task active   ------------------------
var markTaskActive = function(id, successCB, errorCB) {
  console.log(`markTaskActive -----`)
  console.log(id)
  var request = {
    type: 'PUT',
    url: `api/tasks/${id}/mark_active?api_key=1`,
    success: successCB,
    error: errorCB
  }
  $.ajax(request);
}