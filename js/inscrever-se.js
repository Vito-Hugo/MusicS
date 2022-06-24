class Validator{

constructor() {
    this.validations = [
        'data-min-length',
    ]
}

validate(form){

    let currentValidations = document.querySelectorAll("form error-validation");

    if(currentValidations.length > 0) {
        this.cleanValidations(currentValidations);
    }

    let inputs = form.getElementsByTagName("input");

    let inputsArray = [...inputs];

    inputsArray.forEach(function(input){        
        for(let i = 0; this.validations.length > i; i++) {
            if(input.getAttribute(this.validations[i])!= null){
                
                let method = this.validations[i].replace("data-","").replace("-","");

                let value = input.getAttribute(this.validations[i]);

                this[method](input, value);

            }
        }

    },this);

}

minlength(input, minValue){
    
    let inputLegth = input.value.length;

    let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

    if(inputLegth < minValue) {
        this.printMessege(input, errorMessage);
    }

}

printMessege(input, msg){

    let templete = document.querySelector(".error-validation").cloneNode(true);

    templete.textContent = msg;

    let inputParent = input.parentNode;

    templete.classList.remove("templete");

    inputParent.appendChild(templete);

}

cleanValidations(validations) {
    validations.forEach(el => el.remove());
}

}


let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

submit.addEventListener("click",function(e){

    e.preventDefault();


    validator.validate(form);

});