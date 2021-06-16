const express = require('express');
const app = express();
const port = 3000;
const instance = require('./src/session.js')

app.post('/request', (req, res) => {
    req.on('data',async (data)=>{
		obj=JSON.parse(data);      
        if (obj.method == 'session'){
            const response = await instance.SessionCreate(obj);
            res.send(response);
        }
	});
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})