// window.addEventListener("DOMContentLoaded", ()=>{
//     axios
//     .get("https://crudcrud.com/api/fb5925419edb47e895abb7a9d7220ce3/appointmentDetails")
//     .then((response)=>{
//         console.log(response)
//         for(let i=0; i<response.data.length; i++){
//             displayUsersOnScreen(response.data[i])
//         }
//     })
// })

// function displayAllUsersOnScreen(details){
//     const newLi = document.createElement('li')
//     newLi.innerHTML = `${details.amtV} - ${details.desV} - ${details.catV} <button class="dlt">Delete Expense</button>  <button class="edt">Edit Expense</button>`
//     newLi.className = "list-group-item"
    
//     ul.appendChild(newLi)
// }


document.addEventListener('DOMContentLoaded',()=>{
    const form = document.querySelector('form')
    const amount = document.getElementById('amount')
    const desc = document.getElementById('description')
    const category = document.getElementById('category')
    const ul = document.querySelector('.expenseUl')


    axios
    .get("https://crudcrud.com/api/fb5925419edb47e895abb7a9d7220ce3/appointmentDetails")
    .then((response)=>{
        for(let i=0; i<response.data.length; i++){
            displayUserOnScreen(response.data[i])
        }
    })
    .catch((err)=>{
        console.log(err)
    })


    function displayUserOnScreen(details){
        const newLi = document.createElement('li')
        newLi.innerHTML = `${details.amtV} - ${details.desV} - ${details.catV} <button class="dlt">Delete Expense</button>  <button class="edt">Edit Expense</button>`
        newLi.className = "list-group-item"
        
        ul.appendChild(newLi)
    }

    form.addEventListener('submit',(event)=>{
        event.preventDefault()
        const amountVal = amount.value 
        const descVal = desc.value 
        const categoryVal = category.value 

        const details = {
            amtV : amountVal,
            desV : descVal,
            catV : categoryVal
        }

        axios
        .post("https://crudcrud.com/api/fb5925419edb47e895abb7a9d7220ce3/appointmentDetails",
            details
        )
        .then((result) => displayUserOnScreen(result.data))
        .catch((err)=>{
            console.log(err)
        })
        
        amount.value = ''
        desc.value = ''
        category.value = 'Food'

    })

    

    ul.addEventListener('click', (event)=>{
        const text = event.target.parentElement.textContent
        const textArr = text.split('-').map((item)=> item.trim())
        const storageKey = textArr[1]
        if(event.target.classList.contains('dlt')){
            const listToDlt = event.target.parentElement
            ul.removeChild(listToDlt)
            localStorage.removeItem(storageKey)
            
        }
        else if(event.target.classList.contains('edt')){
            const listToDlt = event.target.parentElement
            ul.removeChild(listToDlt)
            localStorage.removeItem(storageKey)

            amount.value = textArr[0]
            desc.value = textArr[1]
            category.value = textArr[2].split(' ')[0]
        }
    })


})





