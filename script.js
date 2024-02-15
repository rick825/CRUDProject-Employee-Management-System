let employeeList = [
  {id:"10001",Name:"John Doe", Age:30,Department:"IT Department", Salary:15000},
  {id:"10002",Name:"Jane Smith", Age:28,Department:"HR Department", Salary:10000}, 
];

window.onload=function() {
    showEmployee();
}

// Add employee
const addEmployee = (event) =>{
    event.preventDefault();

    let eName = document.getElementById('employeeName').value;
    let eAge = document.getElementById('employeeAge').value;
    let eDepartment = document.getElementById('employeeDepartment').value;
    let eSalary = parseFloat(document.getElementById('employeeSalary').value);

    if(eName && eAge && eDepartment && eSalary){

        let allId = employeeList.map(emp => emp.id);
        if (allId.length > 0) {
            const lastEmployeeId = allId.pop();
            var newEmpId = parseInt(lastEmployeeId)+1;
            console.log('ID of the last employee:', lastEmployeeId);
        } else {
            console.log('Employee list is empty.');
        }

        let employee = {
            id: newEmpId,
            Name: eName,
            Age: eAge,
            Department: eDepartment,
            Salary: eSalary
        }

        console.log("Adding Employee to EmployeeList",employee); 
        employeeList.push(employee);
        showEmployee();
    }else{
        console.log("Empty Field!!"); 
        alert('Please fill in all fields');
    }
}

// Search Department
const searchDepartment = (event) =>{
    event.preventDefault();

    let deptmnt = document.getElementById('findDepartment').value.toLowerCase();

    let result = employeeList.filter(emp => emp.Department.toLowerCase() == deptmnt);
    showEmployee(result);
    let noti = "Showing  employees from "+deptmnt.toUpperCase();
    showNotification(noti);
}

// Increase Salary
const inSalary = (event) =>{
    event.preventDefault();

    let inpercent = document.getElementById('increaseSalary').value;
    
    let result = employeeList.map((emp)=>{
      return{
        ...emp,
        Salary: emp.Salary + (emp.Salary * inpercent/100)
      }; 
    });
     
    employeeList = result;

    console.log("Salary Increased by ", inpercent,"%");  
    showEmployee(result);
    let noti = "Salary Increased By" +" "+inpercent+"%";
    showNotification(noti);
}

// Average Salary
const averageSalary = () =>{
    let averageSalary;
    if(employeeList.length < 0){
        averageSalary = "No Employee to show Average Salary"
    }else{
        let totalSalary = employeeList.reduce((accumulator, currentValue) => accumulator += currentValue.Salary , 0 );
        let totalEmployee = employeeList.length;
        avgsal = totalSalary/totalEmployee;
        averageSalary = "Average Salary  is : $"+avgsal+".00";
    }

    showNotification(averageSalary);
}

//Sorting
const sortTable = (event) => {
    event.preventDefault();

    const sortBy = document.getElementById('sortBy').value;
   let result;
    switch (sortBy) {
        case 'department':
           result = employeeList.slice().sort((a, b) => a.Department.localeCompare(b.Department));
            break;
        case 'salary':
            result = employeeList.slice().sort((a, b) => a.Salary - b.Salary);
            break;
        case 'age':
            result =  employeeList.slice().sort((a, b) => a.Age - b.Age);
            break;
        default:
            result = [...employeeList];
            break;
    }

    showEmployee(result);
};

// Show Notification
const showNotification = (noti) =>{
    let NotiContainer = document.getElementById('notification');
    NotiContainer.innerHTML = " ";
    
    let notification = document.createElement('div');
    notification.innerHTML= `
      <h2>${noti}</h2>
    `;
  
    console.log("Showing Notification");
    NotiContainer.appendChild(notification);
}

// Show Employee
const showEmployee = (employee = employeeList) =>{
    const employeesTable = document.getElementById('employeeBody');
    employeesTable.innerHTML = '';
  
    console.log("Running");
    employee.forEach((emp) => {
        const employeeRow = document.createElement('tr');
        employeeRow.innerHTML = `
        <td>${emp.id}</td>
        <td>${emp.Name}</td>
        <td>${emp.Age}</td>
        <td>${emp.Department}</td>
        <td>$${emp.Salary}</td>
        `;
        console.log("Running2");
        employeesTable.appendChild(employeeRow);
    });

}