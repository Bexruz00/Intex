let elProductsList =  document.querySelector(".products")
let elProductsinfList =  document.querySelector(".inf-products")
let elProductsData = JSON.parse(localStorage.getItem("products"))

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModaInner = document.querySelector(".modal-inner")

let orderList = JSON.parse(localStorage.getItem("order-products")) || []

// render pard
function renderProducts(arr, list, id){
    list.innerHTML = null
    arr.filter(item => item.cotegoryId == id).forEach(item => {
        let elItem = document.createElement("li")
        elItem.className = "relative w-[340px] pt-[40px] pb-[30px] bg-white shadow-[0px_5px_10px_0px_#00000040] rounded-tr-[30px] rounded-b-[30px]"
        elItem.innerHTML = `
        <h2 class="font-bold text-[20px] lending-[23px] text-[#009398] text-center mb-[25px]">${item.frame}</h2>
            <img class="mx-auto mb-[30px]" src="${item.imgUrl}" alt="pool" width="275px"> 
            <div class="flex items-center justify-around">
                <div class="flex flex-col gap-[5px]">
                    <span class="before:w-[60px] before:rotate-[5deg] before:top-[10px] before:h-[1.5px] before:absolute before:rounded-full before:bg-[#FF0000] relative text-[12px] leanding-[13px]">${item.oldPrice} сум</span>
                    <strong class="text-[15px] text-black leanding-[13px]">${item.newPrice} сум</strong>
                </div>
                <button onclick="hendleOrderBtnClick(${item.id})" class="shadow-[0px_1px_7px_0px_#00000040] w-[107px] bg-[#FFE600] text-[16px] font-bold py-[3px] rounded-tr-[20px] rounded-bl-[20px]">Заказать</button>
            </div>
            <button class="absolute w-[140px] text-white top-0 text-[15px] py-[3px] ${item.status == "0" && "bg-[#139D4B]"} ${item.status == "1" && "bg-[#FFD600]"} ${item.status == "2" && "bg-[#ED2020]"} rounded-br-[20px] font-bold shadow-[0px_1px_7px_0px_#00000040]">
            ${item.status == "0" ? "Рекомендуем" : ""}
            ${item.status == "1" ? "Cкидка" : ""}
            ${item.status == "2" ? "Нет в наличии" : ""}
            </button>
        `
        list.append(elItem)
    })
}
renderProducts(elProductsData, elProductsList, "0")
renderProducts(elProductsData, elProductsinfList, "1")
// render pard

let date = new Date()
const time = `${String(date).split(" ")[4].split(":").splice(0, 2).join(":")} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear() % 100}`


// Oreder pard
function hendleOrderBtnClick(id){
    const findProduct = elProductsData.find(item => item.id == id)
    elModalWrapper.classList.remove("scale-0")

    elModaInner.innerHTML = `
    <div class="flex gap-[48px] items-center justify-center p-[40px]">
      <div class="w-[640px] p-[40px] rounded-[30px] bg-white shadow-[0px_5px_10px_0px_#00000040]">
        <h2 class="font-bold text-[20px] lending-[23px] text-[#009398] text-center mb-[25px]">${findProduct.frame}</h2>
        <img class=""src=${findProduct.imgUrl} alt="POOL" width="490" height="305"/>
        <p class="font-normal text-center text-[25px] leanding-[14px]">${findProduct.newPrice} сум</p>
      </div>
      <div class="">
        <form class="order-form flex flex-col gap-[20px]">
          <input name="username" type="text" required placeholder="Ваше имя" class="placeholder:font-bold placeholder:text-[25px] outline-none px-[20px] py-[15px] border-[1px] border-solid rounded-[20px] leanding-[29px] text-[25px] text-[#494949] shadow-[0px_0px_7px_0px_#00000040]">
          <input name="number" type="number" required placeholder="Ваш номер" class="placeholder:font-bold placeholder:text-[25px] outline-none px-[20px] py-[15px] border-[1px] border-solid rounded-[20px] leanding-[29px] text-[25px] text-[#494949] shadow-[0px_0px_7px_0px_#00000040]">
          <input name="address" type="text" required placeholder="Ваш адрес" class="placeholder:font-bold placeholder:text-[25px] outline-none px-[20px] py-[15px] border-[1px] border-solid rounded-[20px] leanding-[29px] text-[25px] text-[#494949] shadow-[0px_0px_7px_0px_#00000040]">
          <button type="submit" class="sent-btn mx-auto w-[237px] h-[48px] text-white font-bold text-[25px] leanding-[29px] bg-[#3F8C8E] rounded-[15px]">Заказать</button>
        </form>
      </div>
    </div>
    `

    let elOrderForm = document.querySelector(".order-form")
    elOrderForm.addEventListener("submit", function(e){
        e.preventDefault()
        const orderData = {
            username: e.target.username.value,
            phoneNumber: e.target.number.value,
            imgUrl: findProduct.imgUrl,
            price: findProduct.newPrice,
            address: e.target.address.value,
            orderedAd: time,
            iscomfirmed: false
        }

        let elOrderBtn = document.querySelector(".sent-btn")
        elOrderBtn.innerHTML = `<img src="images/loading.png" width="50px" alt="loading" class="scale-[1.5] mx-auto">`
        setTimeout(() => {
            elOrderBtn.innerHTML = "Заказать"
            orderList.push(orderData)
            localStorage.setItem("order-product", JSON.stringify(orderList))

            elModaInner.innerHTML = `
                <div class="flex flex-col gap-[40px]">
                    <img class="mx-auto" src="../images/check.svg" alt="check">
                    <h2 class="font-bold text-[60px] leanding-[70px] text-center">Спасибо!</h2>
                    <p class="font-normal text-[25px] leanding-[30px text-center">Ваш заказ успешно оформлен. Мь свяжемся с вами в ближайшее время.</p>
                </div>
            `
            setTimeout(() => {
                elModalWrapper.classList.add("scale-0")
            }, 2000)
        },1000)
    })
}
elModalWrapper.addEventListener("click", (e) => e.target.id == "wrapper" && elModalWrapper.classList.add("scale-0"))
// Oreder pard