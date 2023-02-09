// Variables

const selectedCurrency = document.querySelector("select")
const calculateBtn = document.querySelector(".calculate-btn")
const btcAmount = document.querySelector("#floatingInput")


function calculate(){
    const currency = selectedCurrency.value
    const amount = btcAmount.value
    const container = document.querySelector(".container")
    const messageBox= document.querySelector(".alert")
    if(currency !== "0" && amount !== ""){
        const apiUrl = `https://rest.coinapi.io/v1/exchangerate/BTC/${currency}?apikey=5B363A77-8930-4AC5-A7EF-ADD97398764F`
        fetch(apiUrl)
        .then(response =>{
            return response.json()
        })
        .then(data =>{            
            const successElement = document.createElement('div')
            successElement.classList.add("alert", "alert-success","d-flex","align-items-center")
            successElement.innerHTML = `<h4>
                ${(data.rate*amount).toFixed(2)} ${currency}
                </h4>
                <button type="button" class="btn-close ms-auto me-0" aria-label="Close"></button>
                `            
            if (messageBox !== null) {
                container.removeChild(messageBox)
            }            
            container.appendChild(successElement)
            checkCloseBtn()
        })
    }else{
        const dangerElement = document.createElement('div')
        dangerElement.classList.add("alert", "alert-danger","d-flex","align-items-center")
        dangerElement.innerHTML = `<h4>Please Enter correct value!</h4><button type="button" class="btn-close ms-auto me-0" aria-label="Close"></button>`
        if (messageBox !== null) {
                container.removeChild(messageBox)
            } 
        container.appendChild(dangerElement)
        checkCloseBtn()
    }

}
function checkCloseBtn(){
    const closeBtn = document.querySelector(".btn-close")
    closeBtn.addEventListener("click", () =>{
        const messageBox= document.querySelector(".alert")
        const container = document.querySelector(".container")
        container.removeChild(messageBox)
    })
}


calculateBtn.addEventListener("click", calculate)
