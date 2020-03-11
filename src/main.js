// A module containing all functions should be exported -> parcel isn't available in the global namespace by default
module.exports.app = {
  
  // save issue: gather form data + add to issues list
  saveIssue: function saveIssue(e) {
    // Selectors for id
    var issueDesc = document.getElementById("issueDescInput").value;
    var issueSeverity = document.getElementById("issueSeverityInput").value;
    var issueAssignedTo = document.getElementById("issueAssignedToInput").value;
    var issueId = Math.floor(Math.random() * Math.floor(10000));
    var issueStatus = "Open";
  
    // issue object that will contain form information
    var issue = {
      id: issueId,
      description: issueDesc,
      severity: issueSeverity,
      assignedTo: issueAssignedTo,
      status: issueStatus
    };

    // get issues from localstorage
    var issues = JSON.parse(localStorage.getItem("issues")) || [];
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
    document.getElementById("issueInputForm").reset();
  
    module.exports.app.fetchIssues();
  },

  // Will delete an issue by id
  deleteIssue: function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem("issues"));
    for (var i = 0; i < issues.length; i++) {
      if (Number(issues[i].id) === Number(id)) {
        issues.splice(i, 1);
      }
    }
  
    localStorage.setItem("issues", JSON.stringify(issues));
  
    module.exports.app.fetchIssues();
  },

  // Will change issue status from opened to closed
  setStatusClosed: function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem("issues"));
  
    for (var i = 0; i < issues.length; i++) {
      if (Number(issues[i].id) === Number(id)) {
        issues[i].status = "Closed";
      }
    }
  
    localStorage.setItem("issues", JSON.stringify(issues));
  
    module.exports.app.fetchIssues();
  },

  // Will load all issues from localhost
  fetchIssues: function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem("issues"));
    var issuesList = document.getElementById("issuesList");
  
    issuesList.innerHTML = "";
    if(issues){
      for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;
    
        issuesList.innerHTML += `
        <div class="well">
          <h6>Issue ID: ${id}</h6>
          <p><span class="label label-info">${status}</span></p>
          <h3>${desc}</h3>
          <p><span class="glyphicon glyphicon-time"></span> ${severity} </p>
          <p><span class="glyphicon glyphicon-user"></span> ${assignedTo} </p>
          <a href="#" onclick="issueModule.app.setStatusClosed(${id})" class="btn btn-warning">Close</a>
          <a href="#" onclick="issueModule.app.deleteIssue(${id})" class="btn btn-danger" onclick="issueModule.app.deleteIssue(this)">Delete</a>
          </div>
        `;
      }
    }
    
  }
  
}
