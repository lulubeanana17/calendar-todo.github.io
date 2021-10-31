let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
const monthAll = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const leftBtn = document.querySelector("#previousMove");
const rightBtn = document.querySelector("#nextMove");
const selectBtn = document.querySelector("#jumpMove");
const modalJump = document.querySelector("#jumpMoveModal");
const jumpBtn = document.querySelector("#selectButton");


function listUp(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const header = document.querySelector("#monthYear");
    header.innerText = `${monthAll[month]} / ${year}`;

    const dates = document.querySelector("#dates");
    dates.innerHTML = "";
    let dateCount = 1;
    for(let i = 0; i < 6; i++) {
        const line = document.createElement("div");
        line.id = i;
        for(let j = 0; j < 7; j++) {
            if(i == 0) {
                if(j >= firstDay) {
                    const cell = document.createElement("div");
                    cell.id = "dateCell";
                    cell.innerText = dateCount;
                    line.appendChild(cell);
                    dateCount++;
                } else {
                    const cell = document.createElement("div");
                    cell.id = "emptyCell";
                    cell.innerText = " ";
                    line.appendChild(cell);
                }
            } else if(i > 0 && dateCount <= lastDate) {
                const cell = document.createElement("div");
                    cell.id = "dateCell";
                    cell.innerText = dateCount;
                    line.appendChild(cell);
                    dateCount++;
            } else {
                const cell = document.createElement("div");
                    cell.id = "emptyCell";
                    cell.innerText = " ";
                    line.appendChild(cell);
            }
        }
        dates.appendChild(line);
    }
}

function previous(event) {
    event.preventDefault();
    currentYear = currentYear;
    currentMonth = currentMonth -1;
    if(currentMonth < 0) {
        currentMonth = 11;
        currentYear = currentYear -1;
        listUp(currentYear, currentMonth);
    } else {
        listUp(currentYear, currentMonth);
    }
}

function next(event) {
    event.preventDefault();
    currentYear = currentYear;
    currentMonth = currentMonth + 1;
    if(currentMonth > 11) {
        currentMonth = 0;
        currentYear = currentYear + 1;
        listUp(currentYear, currentMonth);
    } else {
        listUp(currentYear, currentMonth);
    }
}

function selectMonth(event) {
    event.preventDefault();
    modalJump.classList.toggle("hidden");
}

function jumpYearMonth(event) {
    event.preventDefault();
    const yearInput = document.querySelector("#jumpMoveModal input").value;
    const monthInput = parseInt(document.querySelector("#selectMonth").value);
    currentYear = yearInput;
    currentMonth = monthInput;
    listUp(currentYear, currentMonth);
}

listUp(currentYear, currentMonth);
leftBtn.addEventListener("click", previous);
rightBtn.addEventListener("click", next);
selectBtn.addEventListener("click", selectMonth);
jumpBtn.addEventListener("click", jumpYearMonth);