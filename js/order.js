let elorderList = document.querySelector(".order-table")
let orderData = JSON.parse(localStorage.getItem("order-product"))

// Render pard
function renderProducts(arr, list){
    list.innerHTML = null
    arr.forEach(item => {
        let elTr = document.createElement("tr")
        elTr.innerHTML = `
            <td class="py-[20px] text-center">${item.username}</td>
            <td class="py-[20px] text-center">${item.phoneNumber}</td>
            <td class="py-[20px] text-[20px]"><img src="${item.imgUrl}" class="mx-auto" width-[110] alt=""></td>
            <td class="py-[20px] text-[20px]">${item.price}</td>
            <td class="py-[20px] text-[20px]">${item.address}</td>
            <td class="py-[20px] text-[20px]">${item.orderedAd}</td>
            <td class="py-[20px]">
                <button class="" onclick="hendleOrderClick(${item.id})">
                    <img src="./images/delete.svg" alt="delete" width="22px">
                </button>
            </td>
        `
        list.append(elTr)
    });
}
renderProducts(orderData, elorderList)
// Render pard

function hendleOrderClick(id){
    const deleteIndex = orderData.findIndex(item => item.id == id)
    orderData.splice(deleteIndex, 1)
    renderProducts(orderData, elorderList)
    localStorage.getItem("order-product", JSON.stringify(orderData))
}

