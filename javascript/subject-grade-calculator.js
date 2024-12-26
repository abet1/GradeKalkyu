
document.addEventListener('DOMContentLoaded', () =>{

    document.getElementById("components-container").innerHTML='';

    for(let i=0; i<5; i++){
        addComponentRow();
    }
});

function addComponentRow(){
    const container = document.getElementById("components-container");
    const rowDiv = document.createElement("div");
    rowDiv.className = "components-row";
    rowDiv.innerHTML = `
        <input type="text" class="component-name" placeholder="Component Name" required>
        <input type="number" class="component-grade" placeholder="Grade" min="0" max="100" required>
        <input type="number" class="component-weight" placeholder="Weight" min="0" max="100" required onchange="updateRemainingWeight()">
        <button type="button" class="remove-button" onclick="removeComponentRow(this)">×</button>
    `;

    container.appendChild(rowDiv);
}

function removeComponentRow(button){
    const row = button.parentElement;
    const container = row.parentElement;

    if(container.children.length>1){
        container.removeChild(row);
        updateRemainingWeight();
    }else{
        alert('You must have atleast one component');
    }
}

function calculateSubjectGrade(){
    const rows = document.querySelectorAll('.components-row');
    let totalWeightedGrade = 0;
    let totalWeight = 0;
    let isValid = true;

    rows.forEach(row => {
        const grade = parseFloat(row.querySelector('.component-grade').value);
        const weight = parseFloat(row.querySelector('.component-weight').value);

        if(isNaN(weight)||isNaN(grade)){
            return;
        }

        if(grade<0 || grade>100 || weight<0 || weight>100){
            isValid = false;
            return;
        }
        
        totalWeightedGrade += (weight*grade);
        totalWeight += weight; 
    });

    if(!isValid){
        alert('Please fill in all fields correctly');
        return;
    }

    if(totalWeight == 0){
        alert('Total weight cannot be zero');
        return;
    }

    const finalGrade = totalWeightedGrade/totalWeight;
    document.getElementById('subject-grade').textContent = finalGrade.toFixed(4);
}

function calculateRequiredGrade(){
    const targetGrade = parseFloat(document.getElementById('target-grade').value);
    const missingWeight = parseFloat(document.getElementById('missing-weight').value);

    if(isNaN(targetGrade)||isNaN(missingWeight)){
        alert('Please enter fill in all fields correctly');
        return;
    }

    if(targetGrade<0 || targetGrade>100 || missingWeight<0 || missingWeight>100){
        alert('Grades and weights must be between 0 and 100')
        return;
    }

    const rows = document.querySelectorAll('.components-row');
    let currentWeightedGrade=0;
    let currentWeight=0;

    rows.forEach(row =>{
        const grade = parseFloat(row.querySelector('.component-grade').value) || 0;
        const weight = parseFloat(row.querySelector('.component-weight').value) || 0;

        currentWeightedGrade += (grade*(weight/100));
        currentWeight += weight;
    });


    const remainingWeight = missingWeight;
    const requiredGrade = ((targetGrade) - (currentWeightedGrade)) / (remainingWeight/100);

    if (requiredGrade < 0) {
        document.getElementById('required-grade').textContent = 
            "Target grade already achieved!";
    } else if (requiredGrade > 100) {
        document.getElementById('required-grade').textContent = 
            "Target grade not possible";
    } else {
        document.getElementById('required-grade').textContent = 
            requiredGrade.toFixed(4);
    }
}

function updateRemainingWeight(){
    const rows = document.querySelectorAll('.components-row');
    let totalWeight = 0;

    rows.forEach(row => {
        const weight = parseFloat(row.querySelector('.component-weight').value)||0;
        totalWeight += weight;

    });

    const remainingWeight = 100 - totalWeight;
    document.getElementById('missing-weight').value = remainingWeight>=0 ? remainingWeight:0;
}

document.head.insertAdjacentHTML('beforeend', `
    <style>
        .remove-button {
            background: #718355;
            color: white;
            border: none;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            cursor: pointer;
            font-size: 16px;
            line-height: 1;
            padding: 0;
        }
        .remove-button:hover {
            background: #cc0000;
        }
        
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