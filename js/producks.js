let elUsername = document.querySelector(".username")
const user = JSON.parse(localStorage.getItem("user"))
elUsername.textContent = user.username
let elProducttable = document.querySelector(".product-table")

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")

let productsList = JSON.parse(localStorage.getItem("products")) || []

elModalWrapper.addEventListener("click", function(e){
    (e.target.id == "wrapper" && elModalWrapper.classList.add("scale-0"))
})


let elCategory1 = document.querySelector(".category-1")
let elCategory2 = document.querySelector(".category-2")
// let elAddBtn = document.querySelector(".add-btn")

elCategory1.addEventListener("click", function(){
    elCategory1.className = "category-1 text-[35px] text-[#009398] leanding-[40px] pb-[8px border-b-[3px] cursor-pointer border-[#009398]"
    elCategory2.className = "category-2 text-[35px] text-[#A6A6A6] leanding-[40px] pb-[8px border-b-[3px] cursor-pointer border-[transparent]"
    renderProdct(productsList, elProducttable,"0")
})

elCategory2.addEventListener("click", function(){
    elCategory1.className = "category-1 text-[35px] text-[#A6A6A6] leanding-[40px] pb-[8px border-b-[3px] cursor-pointer border-[transparent]"
    elCategory2.className = "category-2 text-[35px] text-[#009398] leanding-[40px] pb-[8px border-b-[3px] cursor-pointer border-[#009398]"
    renderProdct(productsList, elProducttable, "1")
})

function hendleAddBtnClick(){
    elModalWrapper.classList.remove("scale-0")
    elModalInner.innerHTML = `
    <form class="add-form w-[915px] mx-auto">
        <label class="inline-block w-full mb-[33px]">
            <input class="addChooseImg hidden" type="file">
            <img class="mx-auto add-img" width="600px" src="./images/images.png" alt="images">
        </label>
        <div class="flex justify-between">
            <div class="w-[49%] flex flex-col space-y-[20px]">
                <label>
                    <span class="text-[23px] text-[#898989] pl-2 mb-1">Категории</span>
                    <select required name="cotegoryId" class="w-full py-[8px] pl-[10px] text-[25px] outline-none rounded-[5px] bg-slate-200">
                        <option value="0">Каркасные</option>
                        <option value="1">Надувные</option>
                    </select>
                </label>
                <label>
                    <span class="text-[23px] text-[#898989] pl-2 mb-1">Стартая цена (сум) </span>
                    <input required name="old_price"  type="number" placeholder="Цена" class="w-full py-[8px] pl-[10px] text-[25px] outline-none rounded-[5px] bg-slate-200">
                </label>
                <label>
                    <span class="text-[23px] text-[#898989] pl-2 mb-1">Рамка</span>
                    <input required name="frame" type="text" placeholder="Рамка" class="w-full py-[8px] pl-[10px] text-[25px] outline-none rounded-[5px] bg-slate-200">
                </label>
                <label>
                    <span class="text-[23px] text-[#898989] pl-2 mb-1">Размер (м)</span>
                    <input required name="size" type="text" placeholder="Размер" class="w-full py-[8px] pl-[10px] text-[25px] outline-none rounded-[5px] bg-slate-200">
                </label>
            </div>
            <div class="w-[49%] flex flex-col space-y-[20px]">
                <label>
                    <span class="text-[23px] text-[#898989] pl-2 mb-1">Количество</span>
                    <input required name="amount"  type="number" placeholder="Цена" class="w-full py-[8px] pl-[10px] text-[25px] outline-none rounded-[5px] bg-slate-200">
                </label>
                <label>
                    <span class="text-[23px] text-[#898989] pl-2 mb-1">Цена со скидкой (сум) </span>
                    <input required name="new_price"  type="number" placeholder="Цена" class="w-full py-[8px] pl-[10px] text-[25px] outline-none rounded-[5px] bg-slate-200">
                </label>
                <label>
                    <span class="text-[23px] text-[#898989] pl-2 mb-1">Глубина(см)</span>
                    <input required name="depth" type="text" placeholder="Размер" class="w-full py-[8px] pl-[10px] text-[25px] outline-none rounded-[5px] bg-slate-200">
                </label>
                <label>
                    <span class="text-[23px] text-[#898989] pl-2 mb-1">Статус</span>
                    <select required name="status" class="w-full py-[8px] pl-[10px] text-[25px] outline-none rounded-[5px] bg-slate-200">
                        <option value="0">Рекомендуем</option>
                        <option value="1">Cкидка</option>
                        <option value="2">Нет в наличии</option>
                    </select>
                </label>
            </div>
        </div>
        <button type="submit" class="addBtn shadow-[0px_1px_8px_0px_#00000040] mt-[33px] block w-[237px] h-[47px] text-white font-simibold text-[25px] leanding-[29px] bg-[#3F8C8E] rounded-[25px] mx-auto">Добавить</button>
    </form>
    `

    let elChoseInput = document.querySelector(".addChooseImg")
    let elAddImg = document.querySelector(".add-img")
    elChoseInput.addEventListener("change", function(e){
        elAddImg.src = URL.createObjectURL(e.target.files[0])
        
    })

    let elAddBtn = document.querySelector(".addBtn")
    
    let elAddForm = document.querySelector(".add-form")
    elAddForm.addEventListener("submit", function(e){
        e.preventDefault()
        const data = {
            id: productsList.length ? productsList[productsList.length - 1].id + 1 : 1,
            cotegoryId: e.target.cotegoryId.value,
            imgUrl: elAddImg.src,
            oldPrice: e.target.old_price.value,
            newPrice: e.target.new_price.value,
            amount: e.target.amount.value,
            frame: e.target.frame.value,
            size: e.target.size.value,
            depth: e.target.depth.value,
            status: e.target.status.value,
        }
        elAddBtn.innerHTML = `<img src="images/loading.png" width="50px" alt="loading" class="scale-[1.5] mx-auto">`
        setTimeout(() => {    
            elAddBtn.innerHTML = "Добаить"
            productsList.push(data)
            localStorage.setItem("products", JSON.stringify(productsList))
            renderProdct(productsList, elProducttable, data.cotegoryId)
            elModalWrapper.classList.add("scale-0")

            if(data.cotegoryId == "0"){
                elCategory1.className = "category-1 text-[35px] text-[#009398] leanding-[40px] pb-[8px border-b-[3px] cursor-pointer border-[#009398]"
                elCategory2.className = "category-2 text-[35px] text-[#A6A6A6] leanding-[40px] pb-[8px border-b-[3px] cursor-pointer border-[transparent]"
            }else{
                elCategory1.className = "category-1 text-[35px] text-[#A6A6A6] leanding-[40px] pb-[8px border-b-[3px] cursor-pointer border-[transparent]"
                elCategory2.className = "category-2 text-[35px] text-[#009398] leanding-[40px] pb-[8px border-b-[3px] cursor-pointer border-[#009398]"
            }
        },1000)
    })
    
}

// // Render product
function renderProdct(arr, list, cotegoryId){
    list.innerHTML = null
    arr.filter(item => item.cotegoryId == cotegoryId).forEach(item => {
        let elTr = document.createElement("tr")
        elTr.innerHTML = `
           <td class="py-[20px] text-center">
             <img
               src="${item.imgUrl}"
               width="97"
               alt="pool"
               class="mx-auto"
             />
           </td>
           <td class="py-[20px] flex flex-col">
             <span
               class="before:w-[72px] before:rotate-[5deg] before:top-[10px] before:h-[1.5px] before:absolute before:rounded-full before:bg-[#FF0000] relative text-[12px] leanding-[13px]"
               >${item.oldPrice} сум</span
             >
             <strong class="text-[15px] text-black leanding-[13px]"
               >${item.newPrice} сум</strong
             >
           </td>
           <td class="py-[20px] text-[20px]">${item.amount}</td>
           <td class="py-[20px] text-[20px]">${item.frame}</td>
           <td class="py-[20px] text-[20px]">${item.size}</td>
           <td class="py-[20px] text-[20px]">${item.depth}</td>
           <td class="py-[20px] text-[20px]">${item.cotegoryId == "0" ? "Каркасные" : "Надувные"}</td>
           <td class="py-[20px]">
                <div class="flex items-center gap-[18px]">
                  <button onclick="hendleEditProduct(${item.id})">
                    <img src="./images/pen.svg" alt="pen" width="22px" />
                  </button>
                  <button onclick="hendleDaelteProduct(${item.id})">
                    <img src="./images/delete.svg" alt="pen" width="22px" />
                  </button>
                </div>
           </td>
        `
        list.append(elTr)
    })

}
renderProdct(productsList, elProducttable,"0")
// // Render product

// Delelete part
function hendleDaelteProduct(id){
    const findPr = productsList.find(item => item.id == id)
    const deleteIndex = productsList.findIndex(item => item.id == id)
    productsList.splice(deleteIndex, 1)
    renderProdct(productsList, elProducttable, findPr.cotegoryId)
    localStorage.setItem("products", JSON.stringify(productsList))
}
// Delelete part


// Edit part
function hendleEditProduct(id){
    elModalWrapper.classList.remove("scale-0")
    let editProduct = productsList.find(item => item.id == id)
    elModalInner.innerHTML = `
    <form class="etid-form w-[915px] mx-auto">
        <label class="inline-block w-full mb-[33px]">
            <input class="editChooseImg hidden" type="file">
            <img class="mx-auto edit-img" width="600px" src="./images/images.png" alt="images">
        </label>
        <div class="flex justify-between">
            <div class="w-[49%] flex flex-col space-y-[20px]">
                <label>
                    <span class="text-[23px] text-[#898989] pl-2 mb-1">Категории</span>
                    <select required name="cotegoryId" class="w-full py-[8px] pl-[10px] text-[25px] outline-none rounded-[5px] bg-slate-200">
                        <option ${editProduct.cotegoryId == "0" && "selected"} value="0">Каркасные</option>
                        <option ${editProduct.cotegoryId == "1" && "selected"} value="1">Надувные</option>
                    </select>
                </label>
                <label>
                    <span class="text-[23px] text-[#898989] pl-2 mb-1">Стартая цена (сум) </span>
                    <input value="${editProduct.oldPrice}" required name="old_price"  type="number" placeholder="Цена" class="w-full py-[8px] pl-[10px] text-[25px] outline-none rounded-[5px] bg-slate-200">
                </label>
                <label>
                    <span class="text-[23px] text-[#898989] pl-2 mb-1">Рамка</span>
                    <input value="${editProduct.frame}" required name="frame" type="text" placeholder="Рамка" class="w-full py-[8px] pl-[10px] text-[25px] outline-none rounded-[5px] bg-slate-200">
                </label>
                <label>
                    <span class="text-[23px] text-[#898989] pl-2 mb-1">Размер (м)</span>
                    <input value="${editProduct.size}" required name="size" type="text" placeholder="Размер" class="w-full py-[8px] pl-[10px] text-[25px] outline-none rounded-[5px] bg-slate-200">
                </label>
            </div>
            <div class="w-[49%] flex flex-col space-y-[20px]">
                <label>
                    <span class="text-[23px] text-[#898989] pl-2 mb-1">Количество</span>
                    <input value="${editProduct.amount}" required name="amount"  type="number" placeholder="Цена" class="w-full py-[8px] pl-[10px] text-[25px] outline-none rounded-[5px] bg-slate-200">
                </label>
                <label>
                    <span class="text-[23px] text-[#898989] pl-2 mb-1">Цена со скидкой (сум) </span>
                    <input value="${editProduct.newPrice}" required name="new_price"  type="number" placeholder="Цена" class="w-full py-[8px] pl-[10px] text-[25px] outline-none rounded-[5px] bg-slate-200">
                </label>
                <label>
                    <span class="text-[23px] text-[#898989] pl-2 mb-1">Глубина(см)</span>
                    <input value="${editProduct.depth}" required name="depth" type="text" placeholder="Размер" class="w-full py-[8px] pl-[10px] text-[25px] outline-none rounded-[5px] bg-slate-200">
                </label>
                <label>
                    <span class="text-[23px] text-[#898989] pl-2 mb-1">Статус</span>
                    <select required name="status" class="w-full py-[8px] pl-[10px] text-[25px] outline-none rounded-[5px] bg-slate-200">
                        <option ${editProduct.cotegoryId == "0" && "selected"} value="0">Рекомендуем</option>
                        <option ${editProduct.cotegoryId == "1" && "selected"} value="1">Cкидка</option>
                        <option ${editProduct.cotegoryId == "2" && "selected"} value="2">Нет в наличии</option>
                    </select>
                </label>
            </div>
        </div>
        <button type="submit" class="editBtn shadow-[0px_1px_8px_0px_#00000040] mt-[33px] block w-[237px] h-[47px] text-white font-simibold text-[25px] leanding-[29px] bg-[#3F8C8E] rounded-[25px] mx-auto">Изменить</button>
    </form>
    `

    
    let elChoseInput = document.querySelector(".editChooseImg")
    let elEditImg = document.querySelector(".edit-img")
    elChoseInput.addEventListener("change", function(e){
        elEditImg.src = URL.createObjectURL(e.target.files[0])
        
    })


    let elEditForm = document.querySelector(".etid-form ")
    elEditForm.addEventListener("submit", function(e){
        e.preventDefault()
        editProduct.imgUrl = elEditImg.src
        editProduct.cotegoryId = e.target.cotegoryId.value
        editProduct.oldPrice = e.target.old_price.value
        editProduct.frame = e.target.frame.value
        editProduct.size = e.target.size.value
        editProduct.amount = e.target.amount.value
        editProduct.newPrice = e.target.new_price.value
        editProduct.depth = e.target.depth.value
        editProduct.status = e.target.status.value

        let elEditBtn = document.querySelector(".editBtn")
        elEditBtn.innerHTML = `<img src="images/loading.png" width="50px" alt="loading" class="scale-[1.5] mx-auto">`

        setTimeout(() => {
            elEditBtn.innerHTML = "Изменить"
            elModalWrapper.classList.add("scale-0")
            renderProdct(productsList, elProducttable, e.target.cotegoryId.value)
            localStorage.setItem("products", JSON.stringify(productsList))

            if(e.target.cotegoryId.value == "0"){
                elCategory1.className = "category-1 text-[35px] text-[#009398] leanding-[40px] pb-[8px border-b-[3px] cursor-pointer border-[#009398]"
                elCategory2.className = "category-2 text-[35px] text-[#A6A6A6] leanding-[40px] pb-[8px border-b-[3px] cursor-pointer border-[transparent]"
            }else{
                elCategory1.className = "category-1 text-[35px] text-[#A6A6A6] leanding-[40px] pb-[8px border-b-[3px] cursor-pointer border-[transparent]"
                elCategory2.className = "category-2 text-[35px] text-[#009398] leanding-[40px] pb-[8px border-b-[3px] cursor-pointer border-[#009398]"
            }
        },1000)
    })

}
// Edit part

