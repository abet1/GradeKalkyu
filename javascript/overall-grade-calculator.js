
document.addEventListener('DOMContentLoaded', () =>{
    document.getElementById("subjects-container").innerHTML='';
    for(let i=0; i<5; i++){
        addSubjectRow();
    }
});

function addSubjectRow(){
    const container = document.getElementById("subjects-container");
    const rowDiv = document.createElement("div");
    rowDiv.className = "subjects-row";
    rowDiv.innerHTML = `
        <input type="text" class="subject-name" placeholder="Subject Name">
        <input type="number" class="units" placeholder="Units" min="1" max="6" required>
        <input type="number" class="grade" placeholder="Grade" min="0" max="100" required>
        <button type="button" class="remove-button" onclick="removeRow(this)">×</button>
    `;

    container.appendChild(rowDiv);
}

function removeRow(button){
    const row = button.parentElement;
    const container = row.parentElement;

    if(container.children.length>1){
        container.removeChild(row);
    }else{
        alert('You must have atleast one subject');
    }
}

function calculateOverallGrade(){
    const rows = document.querySelectorAll('.subjects-row');
    let totalWeightedGrade = 0;
    let totalUnits = 0;
    let isValid = true;

    rows.forEach(row => {
        const units = parseFloat(row.querySelector('.units').value);
        const grade = parseFloat(row.querySelector('.grade').value);

        if(isNaN(units)||isNaN(grade)){
            return;
        }

        if(grade<0||grade>100){
            isValid = false;
            return;
        }
        
        totalWeightedGrade += (units*grade);
        totalUnits += units; 
    });

    if(!isValid){
        alert('Please fill in all fields correctly');
        return;
    }

    if(totalUnits == 0){
        alert('Total units cannot be zero');
        return;
    }

    const finalGrade = totalWeightedGrade/totalUnits;

    document.getElementById('final-grade').textContent = finalGrade.toFixed(4)

    if(finalGrade<=1.50 && finalGrade>=1.00){
        document.getElementById('congrats-message').textContent = "WOW! You're a University Scholar!";
    }else if(finalGrade<=1.75 && finalGrade>1.50){
        document.getElementById('congrats-message').textContent = "WOW! You're a College Scholar!";
    }
    
    
    
}

document.head.insertAdjacentHTML('beforeend', `
    <style>
        
        .component-row, .subject-row {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
            align-items: center;
        }
        
        .component-row input, .subject-row input {
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
    </style>
`);