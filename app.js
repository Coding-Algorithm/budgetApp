let balanceAmount = document.querySelector("#balanceAmount");
let incomeAmount = document.querySelector(".incomeAmount");
let expensesAmount = document.querySelector(".expensesAmount");

let ulList = document.querySelectorAll(".items ul")

let expensesBtn = document.querySelector("#expensesBtn");
let incomeBtn = document.querySelector("#incomeBtn");
let allBtn = document.querySelector("#allBtn");
let btnGroup = document.querySelectorAll(".tabButtonContainer button")
Array.from(btnGroup)

let edit = document.querySelectorAll(".edit")
let del = document.querySelectorAll(".delete")

let form = document.querySelector("#form")
let inputTitle = document.querySelector("#inputTitle");
let inputAmount = document.querySelector("#inputAmount");
let submitBtn = document.querySelector("#form button");

let expensesItems = document.querySelector("#expensesItems");
let incomeItems = document.querySelector("#incomeItems");
let allItems = document.querySelector("#allItems");

let ADD_ENTRY = JSON.parse(localStorage.getItem("budget_list")) || [];
updator(ADD_ENTRY)

let username = document.querySelector("#upperSection h1")


let giveUsername = prompt("What is your username: ")

console.log(giveUsername)
username.innerText = giveUsername;




function updateExpenses(array){
  expensesItems.innerHTML = "";
  array.forEach((item) =>{
    if(item.type == "expensesBtn"){
      expensesItems.innerHTML += `
       <li class="item">
             <span class="info">
             <p class="itemTitle">${item.title} </p>
             <p class="itemAmount"><span>#</span>${item.amount}</p>
             </span>
             
           <span class="actions">
            <span class="edit">
              <img src="./edit.png" alt="" />
              </span>
            <span class="delete">
              <img src="./trash.png" alt="" />
           </span>
           </span>
           </li>
      `
    }
  })
}
function updateIncome(array){
  incomeItems.innerHTML = ""
  array.forEach((item) =>{
    if(item.type == "incomeBtn"){
      incomeItems.innerHTML += `
       <li class="item">
             <span class="info">
             <p class="itemTitle">${item.title}</p>
             <p class="itemAmount"><span>#</span>${item.amount}</p>
             </span>
             
           <span class="actions">
            <span class="edit">
              <img src="./edit.png" alt="" />
              </span>
            <span class="delete">
              <img src="./trash.png" alt="" />
           </span>
           </span>
           </li>
      `
    }
  })
}
function updateAll(array){
  allItems.innerHTML = ""
  array.forEach((item) =>{
      allItems.innerHTML += `
       <li class="item">
             <span class="info">
             <p class="itemTitle">${item.title}</p>
             <p class="itemAmount"><span>#</span>${item.amount}</p>
             </span>
             
           <span class="actions">
            <span class="edit">
              <img src="./edit.png" alt="" />
              </span>
            <span class="delete">
              <img src="./trash.png" alt="" />
           </span>
           </span>
           </li>
      `
})
}


function show(element){
  element.classList.remove("hide")
  element.classList.add("show")
}
function hide(element){
  element.classList.remove("show")
  element.classList.add("hide")
}

function updateIOAmount(array){
  let incomeAmounts = [];
  let expensesAmounts = [];
  
  array.forEach((item) =>{
    if(item.type == "incomeBtn"){
      incomeAmounts.push(parseFloat(item.amount))
    }else if(item.type == "expensesBtn"){
      expensesAmounts.push(parseFloat(item.amount))
    }
  })

  let totalIncome = incomeAmounts.reduce((amount, prevAmount) =>{
    return amount + prevAmount;
  }, 0)
  
  let totalExpenses = expensesAmounts.reduce((amount, prevAmount) =>{
    return amount + prevAmount;
  }, 0)
  
  balanceTotal = totalIncome - totalExpenses
  
  incomeAmount.innerText = "#" + totalIncome;
  expensesAmount.innerText = "#"+ totalExpenses;
  balanceAmount.innerText = (balanceTotal < 0 ? "-#" : "#")+ (balanceTotal < 0 ? (balanceTotal.toString()). slice(1): balanceTotal);
  
  // console.log(expensesAmounts)
  // console.log(incomeAmounts)
}

function expensesActive(e){
  this.classList.add("active")
  incomeBtn.classList.remove("active")
  allBtn.classList.remove("active")
  
  show(expensesItems);
  hide(incomeItems);
  form.style.display = "flex"
  hide(allItems);

}
expensesBtn.addEventListener("click", expensesActive)

function incomeActive(e){
  this.classList.add("active")
  expensesBtn.classList.remove("active")
  allBtn.classList.remove("active")
  
  hide(expensesItems);
  show(incomeItems);
  form.style.display = "flex"
  hide(allItems);
}
incomeBtn.addEventListener("click", incomeActive)

function allActive(e){
   
  
  this.classList.add("active")
  expensesBtn.classList.remove("active")
  incomeBtn.classList.remove("active")
  
  hide(expensesItems);
  hide(incomeItems);
  form.style.display = "none"
  show(allItems);
}
allBtn.addEventListener("click", allActive)

function addItem(){
  
  if(inputTitle.value && inputAmount.value){
    let type;
    
    btnGroup.forEach((e) =>{
      e.classList.contains("active" ) ? type = e.id : "" ;
    })
    
    let title = inputTitle.value;
    let amount = inputAmount.value;
    
    updateArray(title, amount, type)
    
    inputTitle.value = "";
    inputAmount.value = "";
    
}
} 

function updateArray(title, amount, type){
  ADD_ENTRY.push({
    type:type, 
    title:title,
    amount:amount
  })
  
  ADD_ENTRY.forEach((item, index)=>{
    //console.log(index)
    item.index = index;
  })
    //console.log(ADD_ENTRY)
  
  updator(ADD_ENTRY)
}
submitBtn.addEventListener("click", addItem)

function updator(ADD_ENTRY){
  updateExpenses(ADD_ENTRY)
  updateIncome(ADD_ENTRY)
  updateAll(ADD_ENTRY)
  updateIOAmount(ADD_ENTRY)
  
   localStorage.setItem("budget_list", JSON.stringify(ADD_ENTRY))
} 

function action(e){
  let target = e.target;
  
  let parentElement = target.parentElement
  let list= parentElement.parentElement.parentElement
  
  let listIndex;
  
  ADD_ENTRY.forEach((item) => {
  let sentence = list.innerText;
  let word = item.title;
    if(sentence.indexOf(word)!= -1) {
      listIndex = item.index
    }
  })
  
 
  let finalParent = list.parentElement
  
  if(parentElement.className == "delete"){
    console.log("Deleted")
    finalParent.removeChild(list)
    ADD_ENTRY.splice(listIndex, 1) ;
    updator(ADD_ENTRY)
  }else if(parentElement.className == "edit"){
    console.log("Edited")
  console.log(ADD_ENTRY[listIndex].title)
    inputTitle.value = ADD_ENTRY[listIndex].title;
    inputAmount.value = ADD_ENTRY[listIndex].amount;
    finalParent.removeChild(list)
    ADD_ENTRY.splice(listIndex, 1) ;
    updator(ADD_ENTRY)
  }
 
  console.log(ADD_ENTRY);
  console.log(ADD_ENTRY);
  
}

/* 
function delIt(e){
  let target = e.target;
  console.log("Working..")
  let listParent = target.parentElement.parentElement.parentElement
  
  let finalParent = listParent.parentElement
  
  finalParent.removeChild(listParent)
  
}
*/


ulList.forEach((item) => item.addEventListener("click", action))