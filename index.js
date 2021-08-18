const express = require('express');
const app = express();
const port = 105;
const CloudHandle = require('./src/CloudHandle.js');

app.post('/request',(req, res) => {
    req.on('data',async (data)=>{ 
        let url = JSON.parse(data).url;
        let proxy = JSON.parse(data).proxy;
        let response = await CloudHandle(url,proxy);
        res.send(response);
	});
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})