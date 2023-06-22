let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;


// set budget
totalAmountButton.addEventListener("click", () => {
    tempAmount = totalAmount.value;

    if (tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide");
    }
    else {
        errorMessage.classList.add("hide");

        amount.innerHTML = tempAmount;

        balanceValue.innerText = tempAmount - expenditureValue.innerText;

        totalAmount.value = "";
    }
});

// function to disable edit and delete button
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach(element => {
        element.disabled = bool;
    });
};

//function to modify list elements
const modifyElement = (element, edit=false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if(edit){
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }
    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
};

// function to create list
const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content","flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML =`<p class="product">${expenseName}</p>
    <p class="amount">${expenseValue}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontsize = "24px";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });
    let deletebutton = document.createElement("button");
    deletebutton.classList.add("fa-solid", "fa-trash-can", "delete");
    deletebutton.style.fontsize = "24px";
    deletebutton.addEventListener("click", () => {
        modifyElement(deletebutton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deletebutton);
    document.getElementById("list").appendChild(sublistContent);
};

//function to add expenses
checkAmountButton.addEventListener("click", () => {
    if(!userAmount.value || !productTitle.value){
        productTitleError.classList.remove("hide");
        return false;
    }
    disableButtons(false);

    let expenditure = parseInt(userAmount.value);
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;

    const totalbalance = tempAmount - sum;
    balanceValue.innerText = totalbalance;

    listCreator(productTitle.value,userAmount.value);

    productTitle.value = "";
    userAmount.value = "";
    
});