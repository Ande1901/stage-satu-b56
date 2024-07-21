function getdata(){
    
   let name = document.getElementById("Nameinput").value;
   let email = document.getElementById("emailinput").value; 
   let position = document.getElementById("position").value;  
   let address = document.getElementById("address").value;
   let Phone = document.getElementById("numberinput").value
   
    console.log(name);
    console.log(email);
    console.log(Phone);
    console.log(position);
    console.log(address);

    if(name==""){
    alert("NAMANYA WOI KOCAK!!")
    return
    }

    else if(email==""){
    alert("minta nomor hp nya dong")
    return
    }  
    
    else if(Phone==""){
    alert("isi duluuu!")
    return    
    }

    else if(position==""){
    alert("ini diisi juga dong")
    return    
    }

    else if(address==""){
    alert("ini diisi juga mas")
    return    
    }

    let emailSaya="andefranata@gmail.com"
    let kirimEmail=document.createElement("a")
    kirimEmail.href=`mailto:${emailSaya}?subject=${position}&body=halo nama saya ${name},rumah saya ${address},email saya ${email},nomor telephone ${Phone}`
    kirimEmail.click()
}