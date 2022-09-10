const fetchBook=()=>{
    fetch('https://api.itbook.store/1.0/new')
    .then(response=>response.json())
    .then(data=>showBook(data))
}
const showBook=(data)=>{
    // console.log(data);
    const bookContainer=document.getElementById('display-book');
    for (let i = 0; i < 6; i++) {
        const book = data.books[i];
        console.log(book);
        const div=document.createElement('div');
        div.classList.add('col');
        const price = book.price.slice(1);
        console.log(price);
        div.innerHTML=`
        <div class="cards">
            <img src="${book.image}" class="card-img-top" alt="..." width="50px" height="350px">
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
   console.log(price);
   count++;
   const cart=document.getElementById('total-product');
   cart.innerText=count;
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
    if(price<500){
        document.getElementById('delivery-charge').innerText=0;
    }
    else if(price>=500 && price<800){
        document.getElementById('delivery-charge').innerText=100;
    }
    else if(price>=800 && price<1000){
        document.getElementById('delivery-charge').innerText=150;
    } else{
        document.getElementById('delivery-charge').innerText=200;
    }
    shippingCharge(price);
}

const shippingCharge=(price)=>{
    if(price<500){
        document.getElementById('shipping-charge').innerText=0;
    }
    else if(price>=500 && price<800){
        document.getElementById('shipping-charge').innerText=100;
    }
    else if(price>=800 && price<1000){
        document.getElementById('shipping-charge').innerText=150;
    } else{
        document.getElementById('shipping-charge').innerText=200;
    }

    tax();
}
const tax=()=>{
    const price = parseFloat(document.getElementById('price').innerText);
    // const delivery = parseFloat(document.getElementById('delivery-charge').innerText);
    // const shipping = parseFloat(document.getElementById('shipping-charge').innerText);
    const tax = price*0.15;
    document.getElementById('tax').innerText=tax.toFixed(2);
}
const total=()=>{
    const price = parseFloat(document.getElementById('price').innerText);
    const delivery = parseFloat(document.getElementById('delivery-charge').innerText);
    const shipping = parseFloat(document.getElementById('shipping-charge').innerText);
    const tax = parseFloat(document.getElementById('tax').innerText);
    const total = price+delivery+shipping+tax;
    document.getElementById('total-price').innerText=total.toFixed(2);

}

const greetings=()=>{
    const totalPrice = parseFloat(document.getElementById('total-price').innerText);
    if(totalPrice==0){
        swal("Please add some books to cart", "", "error");
    }
    else{
        swal("Thank you for buying","Your total price is: "+totalPrice, "success");
        count=0;
        document.getElementById('total-product').innerText=count;
        document.getElementById('price').innerText=0;
        document.getElementById('delivery-charge').innerText=0;
        document.getElementById('shipping-charge').innerText=0;
        document.getElementById('tax').innerText=0;
        document.getElementById('total-price').innerText=0;
        
    }
}
