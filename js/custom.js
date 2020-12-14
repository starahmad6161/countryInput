var errMap = ["Invalid number", "Invalid country code", "too short", "too long", "invalid number"]

var input = document.getElementById("phone");
var iti = window.intlTelInput(input, {
    utilsScript: "js/utils.js"
});
let placeholder = '';
input.addEventListener('countrychange', function () {
    input.removeAttribute('maxlength');
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
input.addEventListener('input', function () {
    placeholder = input.getAttribute('placeholder');
    if (iti.isValidNumber()) {
        input.setAttribute('maxlength', placeholderNumLength(placeholder));
    } else {
        input.removeAttribute('maxlength');
    }
});
input.addEventListener('blur', function () {
    var dialCode = iti.getSelectedCountryData().dialCode;
    if (placeholderNumLength(placeholder) == this.value.length) {
        input.value = replacePlaceholderWithNum(placeholder, this.value);
    }
});

function replacePlaceholderWithNum(placeholder, inputValue) {
    let arr = [];
    let arrLength = 0;
    let val = '';
    for (let i = 0; i <= placeholder.length; i++) {
        if (!isNaN(parseInt(placeholder[i]))) {
            arr.push(i)
        }
    }
    for (let i = 0; i < inputValue.length; i++) {
        placeholder = setCharAt(placeholder, arr[i], inputValue[i]);
    }
    console.log(placeholder);
    return placeholder;
}
function placeholderNumLength(placeholder, inputValue) {
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