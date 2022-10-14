const fetchBook=()=>{
    fetch('https://api.itbook.store/1.0/new')
    .then(response=>response.json())
    .then(data=>showBook(data))
}
const showBook=(data)=>{
    // console.log(data);
    const bookContainer=document.getElementById('display-book');
    for (let i = 7; i <=12; i++) {
        const book = data.books[i];
        console.log(book);
        const div=document.createElement('div');
        div.classList.add('col');
        const price = book.price.slice(1);
        console.log(price);
        div.innerHTML=`
        <div class="cards p-3">
            <img src="${book.image}" class="img-thumbnail" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <div class="card-info">
                    <p class="card-text">${book.price}</p>
                    <button onclick="countBook(${price})"><i class="fas fa-cart-arrow-down"></i></button>
                </div>
            </div>
        </div>
        `;
        bookContainer.appendChild(div);
    };

}

fetchBook();

let count=0;
const countBook=(price)=>{
   count++;
   const cart=document.getElementById('total-product').innerText = count;
   updatePrice(price);
   total();
}

const updatePrice=(price)=>{
    const oldPrice = parseFloat(document.getElementById('price').innerText);
    const newPrice = oldPrice + price;
    document.getElementById('price').innerText = newPrice.toFixed(2);
    deliveryCharge(newPrice);

}
const deliveryCharge=(price)=>{
    let charge =0;
    if(price<500){
       charge = 0;
    }
    else if(price>=500 && price<800){
        charge = 100;
    }
    else if(price>=800 && price<1000){
        charge = 150;
    } else{
        charge = 200;
    }
    document.getElementById('delivery-charge').innerText=charge;
    document.getElementById('shipping-charge').innerText=charge;
    subtotal = price+charge+charge;
    document.getElementById('subtotal').innerText=subtotal.toFixed(2);
   tax(subtotal);
}
const tax=(subtotal)=>{
    const tax = subtotal*0.15;
    document.getElementById('tax').innerText=tax.toFixed(2);
    subtotal+=tax;
    total(subtotal);
}
const total=(total)=>{
    document.getElementById('total-price').innerText=total.toFixed(2);
}

const greetings=()=>{
    const totalPrice = parseFloat(document.getElementById('total-price').innerText);
    if(totalPrice==0){
        swal("Please add some books at cart", "", "error");
    }
    else{
        swal("Thank you for buying","Your total price is: "+totalPrice, "success");
        count=0;
        document.getElementById('total-product').innerText=count;
        document.getElementById('price').innerText=0;
        document.getElementById('delivery-charge').innerText=0;
        document.getElementById('shipping-charge').innerText=0;
        document.getElementById('subtotal').innerText=0;
        document.getElementById('tax').innerText=0;
        document.getElementById('total-price').innerText=0;
        
    }
}
