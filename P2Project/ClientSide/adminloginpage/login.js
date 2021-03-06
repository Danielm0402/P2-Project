﻿import { UC } from '../js/utils.js';
import { LC } from '../adminpage/LoginUtils.js'

//#region eventSetup

//#region loginContainer

let input_Username = document.getElementById("input_Username");
input_Username.addEventListener("keyup", input_Username_keyup);
let input_Password = document.getElementById("input_Password");
input_Password.addEventListener("keyup", input_Password_keyup);
let login_SubmitButton = document.getElementById("login_SubmitButton");
login_SubmitButton.onclick = login_SubmitButton_Click;
let wrongCredentialsLabel = document.getElementById("wrongCredentialsLabel");

document.addEventListener("beforeunload", document_beforeunload);
window.addEventListener("pageshow", page_load);

//#endregion

//#endregion

//#region eventCalls

function input_Username_keyup() {
    if (event.keyCode == 13) {
        event.preventDefault;
        ClickLoginButton();
    }
}

function input_Password_keyup() {
    if (event.keyCode == 13) {
        event.preventDefault;
        ClickLoginButton();
    }
}

async function login_SubmitButton_Click() {
    await login();
}

async function document_beforeunload() {
    unloadPage();
}

function page_load() {
    loadPage();
}

//#endregion

//#region backendCode

function ClickLoginButton() {
    login_SubmitButton.click();
}

async function login() {
    let credentials = await LC.checkLogin(input_Username.value, input_Password.value);
    if (credentials) {
        sessionStorage.setItem("username", input_Username.value);
        sessionStorage.setItem("password", input_Password.value);
        let nextPage = "/adminpage/admin.html"
        window.location.href = nextPage;
    }
    else
        await UC.unfade(wrongCredentialsLabel);
}

function unloadPage() {
    sessionStorage.clear();
}

async function loadPage() {
    let credentials = await LC.getLoggedIn();
    if (credentials) {
        window.location.href = "/adminpage/admin.html";
    }
}

//#endregion