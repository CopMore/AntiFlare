const express = require('express');
const app = express();
const port = 3000;
const instance = require('./src/session.js');

app.post('/request', (req, res) => {
    req.on('data',async (data)=>{ 
        if (JSON.parse(data).method == 'session'){
            const response = await instance.SessionCreate(JSON.parse(data));
            res.send(response);
        }
	});
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})
