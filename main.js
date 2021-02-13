document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  var issueId = chance.guid();
  var issueStatus = 'Open';
  var issuetest = makeid(5);
  var isDate = Date();
  var issueDate = isDate.split(' ').slice(1, 5).join(' ');
  

  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus,
    testTo: issuetest,
    CreateDate: issueDate,

  }
  Swal.fire(
    'Good job!',
    'You clicked the button!',
    'success'
  )
  // console.log(issue)

  if (localStorage.getItem('issues') == null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  fetchIssues();

  e.preventDefault();
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// console.log(makeid(5));

function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Closed';
    }
  }
  Swal.fire(
    'Good job!',
    'You Closed the status!',
    'success'
  )

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
          issues.splice(i, 1);
        }
      }
    }
    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
  })
}

// function OKSwal() {
//   if(doc) {
//     Swal.fire({
//       title: 'Custom width, padding, background.',
//       width: 600,
//       padding: '3em',
//       background: '#fff url(/images/trees.png)',
//       backdrop: `
//         rgba(0,0,123,0.4)
//         url("./Image/tenor-cat.gif")
//         left top
//         no-repeat
//       `
//     })
//   }
//   }


function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));

  ((issues == '')? issuesList.innerHTML = '<h4 style="margin: 12em 5em 30% 45%; color: gray;">No data.</h4>' : issuesList.innerHTML = '')
 

  

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;
    var testTo = issues[i].testTo;



    var CreateDate = issues[i].CreateDate;



    issuesList.innerHTML +=   '<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              // '<p><span class="label label-info">' + status + '</span></p>'+
                              ((status == 'Open')? '<p><span class="label label-info">' + status + '</span></p>': '<p><span class="label label-default">' + status + '</span></p>') +
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '  ,' + CreateDate + '</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                              '<p><span class="glyphicon glyphicon-qrcode"></span> ' + testTo + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div>';
  }
}
