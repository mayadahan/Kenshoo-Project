const parallel = require('run-parallel');
const fetch = require('node-fetch');

parallel([
    //user 1
    async function(){
        let res = await fetch('http://localhost:8080/add_image', {method: 'POST', headers: {
            'Content-Type': 'application/json'}, body: JSON.stringify({"imageUrl": "url", "imageId": 3})});
        let id1 = await res.text();
        console.log("USER1 add image: ", res.ok ? "OK" : "Failure");

        res = await fetch(`http://localhost:8080/add_image`, {method: 'POST', headers: {
            'Content-Type': 'application/json'}, body: JSON.stringify({"imageUrl": "url", "imageId": "maya"})});
        res.text().then(function(text) {
            console.log("USER1 invalid ID (400 status): ", (res.status == 400 && text === 'Invalid ID: maya') ? "OK" : "Failure");
        });

        res = await fetch(`http://localhost:8080/add_image`, {method: 'POST', headers: {
            'Content-Type': 'application/json'}, body: JSON.stringify({"imageUrl": "url", "imageId": 2})});
        res.text().then(function(text) {
            console.log("USER1 id already exist (400 status): ", (res.status == 400 && text === 'Image id already exist') ? "OK" : "Failure");
        });
    },

    //user 2
    async function(){
        let res = await fetch('http://localhost:8080/add_image', {method: 'POST', headers: {
            'Content-Type': 'application/json'}, body: JSON.stringify({"imageUrl": "url", "imageId": 4})});
        let id1 = await res.text();
        console.log("USER2 add image: ", res.ok ? "OK" : "Failure");

        res = await fetch(`http://localhost:8080/add_image`, {method: 'POST', headers: {
            'Content-Type': 'application/json'}, body: JSON.stringify({"imageUrl": "url", "imageId": "maya"})});
        res.text().then(function(text) {
            console.log("USER2 invalid ID (400 status): ", (res.status == 400 && text === 'Invalid ID: maya') ? "OK" : "Failure");
        });

        res = await fetch(`http://localhost:8080/add_image`, {method: 'POST', headers: {
            'Content-Type': 'application/json'}, body: JSON.stringify({"imageUrl": "url", "imageId": 2})});
        res.text().then(function(text) {
            console.log("USER2 id already exist (400 status): ", (res.status == 400 && text === 'Image id already exist') ? "OK" : "Failure");
        });
    }]);