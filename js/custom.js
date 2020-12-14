var errMap = ["Invalid number", "Invalid country code", "too short", "too long", "invalid number"];

var input = document.getElementById("phone");
var iti = window.intlTelInput(input, {
    utilsScript: "js/utils.js"
});
let placeholder = '';
/**
 * 
 */
input.addEventListener('countrychange', function () {
    reset();
    //input.removeAttribute('maxlength');
    this.value = '';
    placeholder = input.getAttribute('placeholder');

    var dialCode = iti.getSelectedCountryData().dialCode;
    document.getElementById("dialCode").innerHTML = "+" + dialCode;
    let wid = 0;
    let dialCodeEleWid = document.querySelector("#dialCode").getBoundingClientRect().width;
    if (dialCodeEleWid > 16 && dialCodeEleWid < 23) {
        wid = 4;
    } else if (dialCodeEleWid > 23 && dialCodeEleWid < 30) {
        wid = 3;
    } else if (dialCodeEleWid > 30 && dialCodeEleWid < 40) {
        wid = 2.5;
    }
    input.style.paddingLeft = (dialCodeEleWid * wid) + "px";
    input.value = '';
});
var errMsg = document.querySelector('.err-msg');
var validMsg = document.querySelector('.valid-msg');
function reset() {
    errMsg.classList.add('hide');
    validMsg.classList.add('hide');
}
/**
 * 
 */
let state = false;
let inpValue = '';
input.addEventListener('input', function () {
    reset();
    placeholder = input.getAttribute('placeholder');
    if (iti.isValidNumber()) {
        if (!state) {
            inpValue = this.value;
            state = true;
        }
        //this.value = inpValue;
        validMsg.classList.remove('hide'); 
        //input.setAttribute('maxlength', placeholderNumLength(placeholder));
    } else {
        if (this.value.length <= placeholderNumLength(placeholder)) {
            //console.log(placeholderNumLength(placeholder), this.value.length);
            inpValue = this.value;
            state = false;
            //input.removeAttribute('maxlength');
            errMsg.innerHTML = errMap[iti.getValidationError()];
            errMsg.classList.remove("hide");
        } else {
            this.value = inpValue;
            validMsg.classList.remove('hide');
            errMsg.classList.add("hide");
        }
    }
});
/**
 * 
 */
input.addEventListener('blur', function () {
    if (placeholderNumLength(placeholder) == this.value.length) {
        input.value = replacePlaceholderWithNum(placeholder, this.value);
    }
});

function replacePlaceholderWithNum(placeholder, inputValue) {
    let arr = [];
    for (let i = 0; i <= placeholder.length; i++) {
        if (!isNaN(parseInt(placeholder[i]))) {
            arr.push(i)
        }
    }
    for (let i = 0; i < inputValue.length; i++) {
        placeholder = setCharAt(placeholder, arr[i], inputValue[i]);
    }
    return placeholder;
}
function placeholderNumLength(placeholder) {
    let arr = [];
    for (let i = 0; i <= placeholder.length; i++) {
        if (!isNaN(parseInt(placeholder[i]))) {
            arr.push({ index: i, num: placeholder[i] })
        }
    }
    return arr.length;
}


function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}