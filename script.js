function showSection(id){

  document
    .querySelectorAll('.section')
    .forEach(section => {
      section.classList.remove('active');
    });

  document
    .getElementById(id)
    .classList.add('active');

}

function saveProfile(){

  const profile = {

    name:
      document.getElementById('name').value,

    branch:
      document.getElementById('branch').value,

    roll:
      document.getElementById('roll').value,

    college:
      document.getElementById('college').value

  };

  localStorage.setItem(
    'studentProfile',
    JSON.stringify(profile)
  );

  alert('Profile Saved Successfully');

}

let subjects = [];
let attendance = [];
let chart = null;

function getGrade(total){

  if(total >= 90){
    return { grade:'O', point:10 };
  }

  if(total >= 80){
    return { grade:'A+', point:9 };
  }

  if(total >= 70){
    return { grade:'A', point:8 };
  }

  if(total >= 60){
    return { grade:'B', point:7 };
  }

  if(total >= 50){
    return { grade:'C', point:6 };
  }

  return { grade:'F', point:0 };

}

function addSubject(){

  const subject =
    document.getElementById('subject').value;

  const credits =
    Math.max(
      0,
      Number(
        document.getElementById('credits').value
      )
    );

  const mid1 =
    Math.max(
      0,
      Number(
        document.getElementById('mid1').value
      )
    );

  const mid2 =
    Math.max(
      0,
      Number(
        document.getElementById('mid2').value
      )
    );

  const weightage =
    Number(
      document.getElementById('weightage').value
    );

  const internal =
    Math.max(
      0,
      Number(
        document.getElementById('internal').value
      )
    );

  const externalTheory =
    Math.max(
      0,
      Number(
        document.getElementById('externalTheory').value
      )
    );

  const externalLab =
    Math.max(
      0,
      Number(
        document.getElementById('externalLab').value
      )
    );

  if(subject.trim() === ''){
    alert('Enter Subject Name');
    return;
  }

  const weightedMid1 =
    Number(
      (((mid1 / 50) * weightage).toFixed(2))
    );

  const weightedMid2 =
    Number(
      (((mid2 / 50) * weightage).toFixed(2))
    );

  const internalTotal =
    weightedMid1 +
    weightedMid2 +
    internal;

  const externalTotal =
    externalTheory +
    externalLab;

  const total =
    internalTotal +
    externalTotal;

  const gradeData =
    getGrade(total);

  subjects.push({

    subject,

    credits,

    weightedMid1:
      weightedMid1.toFixed(2),

    weightedMid2:
      weightedMid2.toFixed(2),

    internals:
      internalTotal.toFixed(2),

    externals:
      externalTotal.toFixed(2),

    total:
      total.toFixed(2),

    grade:
      gradeData.grade,

    point:
      gradeData.point

  });

  renderSubjects();

  calculateSGPA();

  renderChart();

  document.getElementById('subject').value = '';
  document.getElementById('credits').value = '';
  document.getElementById('mid1').value = '';
  document.getElementById('mid2').value = '';
  document.getElementById('internal').value = '';
  document.getElementById('externalTheory').value = '';
  document.getElementById('externalLab').value = '';

}

function renderSubjects(){

  const list =
    document.getElementById('subjectList');

  list.innerHTML =
    subjects.map(subject => `

      <div class="subject-card">

        <h3>${subject.subject}</h3>

        <p>Credits : ${subject.credits}</p>

        <p>Mid-1 Weightage : ${subject.weightedMid1}</p>

        <p>Mid-2 Weightage : ${subject.weightedMid2}</p>

        <p>Internals : ${subject.internals}/60</p>

        <p>Externals : ${subject.externals}/40</p>

        <p>Total : ${subject.total}/100</p>

        <p>Grade : ${subject.grade}</p>

        <p>Grade Point : ${subject.point}</p>

      </div>

    `).join('');

}

function calculateSGPA(){

  let totalCredits = 0;
  let totalGradePoints = 0;

  subjects.forEach(subject => {

    totalCredits += subject.credits;

    totalGradePoints +=
      subject.credits *
      subject.point;

  });

  const sgpa =
    totalGradePoints /
    totalCredits;

  document.getElementById('sgpa').textContent =
    sgpa.toFixed(2);

  const percentage =
    (((sgpa - 0.75) * 10).toFixed(2));

  document.getElementById('percentage').textContent =
    percentage + '%';

  document.getElementById('dashboardSgpa').textContent =
    sgpa.toFixed(2);

  document.getElementById('dashboardPercentage').textContent =
    percentage + '%';

}

function renderChart(){

  const ctx =
    document.getElementById('chart');

  if(chart){
    chart.destroy();
  }

  chart = new Chart(ctx, {

    type:'bar',

    data:{

      labels:
        subjects.map(subject =>
          subject.subject
        ),

      datasets:[{

        label:'Total Marks',

        data:
          subjects.map(subject =>
            subject.total
          ),

        backgroundColor:[
          '#2563eb',
          '#3b82f6',
          '#60a5fa',
          '#93c5fd'
        ],

        borderRadius:12

      }]

    }

  });

}

function addAttendance(){

  const subject =
    document.getElementById('attSubject').value;

  const totalClasses =
    Number(
      document.getElementById('totalClasses').value
    );

  const attendedClasses =
    Number(
      document.getElementById('attendedClasses').value
    );

  const percentage =
    (
      (
        attendedClasses /
        totalClasses
      ) * 100
    ).toFixed(1);

  attendance.push({

    subject,

    totalClasses,

    attendedClasses,

    percentage

  });

  renderAttendance();

  document.getElementById('attSubject').value = '';
  document.getElementById('totalClasses').value = '';
  document.getElementById('attendedClasses').value = '';

}

function renderAttendance(){

  const list =
    document.getElementById('attendanceList');

  list.innerHTML =
    attendance.map(item => `

      <div class="att-card">

        <h3>${item.subject}</h3>

        <p>Total Classes : ${item.totalClasses}</p>

        <p>Attended : ${item.attendedClasses}</p>

        <h2>${item.percentage}%</h2>

      </div>

    `).join('');

}
