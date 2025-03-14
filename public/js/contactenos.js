const BtnContactenos = document.getElementById("contactanos-btn");


BtnContactenos.addEventListener("click", 
    function GuardarLocalStorage () {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const motive = document.getElementById("razon").value;

    const data = {
        name : name,
        email : email,
        phone : phone,
        motive : motive
    };

    localStorage.setItem("data", JSON.stringify(data));

    alert("Gracias por comunicarte con nosotros. Nos contactaremos contigo lo más pronto posible.")
});
export default GuardarLocalStorage;