let data= []
axios.get("http://localhost:3001/contact")
.then(response =>{
    console.log(response)
    const listHTML=document.querySelector('#contact>div')
    data= response.data

    data.forEach(item => {
        const {id, name, address, phone, email, company}=item;
        const itemHTML=`<div class="mar-contact col-sm-6 col-md-4">
        <img class="img-contact" src="./assets/img/undraw_profile_pic_ic5t.png" alt="">
        <br>
        <h2> ${name}</h2>
        Address : ${address}
        <br>
        Phone : ${phone}
        <br>
        E-mail : ${email}
        <br>
        Company : ${company}
        <br>
        <button class="btn btn-light" onclick="edit(${id})"> <i class="fas fa-pencil-alt"></i> Edit</button>
        <button class="btn btn-danger" onclick="erase(${id})"> <i class="fas fa-trash-alt"></i> Erase</button>
        </div>
        <br>`
        listHTML.innerHTML += itemHTML
    });
})

const erase = id =>{
    axios.delete(`http://localhost:3001/contact/${id}`)
}

const edit = id =>{
    const contact = data.find(item=>{
        return item.id === id
    })

    if (contact){
        const name =window.prompt('Name', contact.name)
        const address= window.prompt('Address', contact.address)
        const phone= window.prompt('Phone', contact.phone)
        const email= window.prompt('E-mail', contact.email)
        const company= window.prompt('Company', contact.company)
        axios.put(`http://localhost:3001/contact/${id}`,{
            name,
            address,
            phone,
            email,
            company
        });
    }
}

document.getElementById('saveContact').addEventListener('click',()=> {
    
    const name = document.getElementsByName('name')[0].value;
    const address = document.getElementsByName('address')[0].value;
    const phone = document.getElementsByName('phone')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const company = document.getElementsByName('company')[0].value;

    axios.post('http://localhost:3001/contact', {
        name,
        address,
        phone,
        email,
        company
    })
})
