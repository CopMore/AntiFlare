import requests

data = {
'method':'session',
'url':'https://www.sneakersnstuff.com/',
'timeout':'20'
}

r = requests.post('http://127.0.0.1:3000/request',json=data)
print(r.text)
print(r.headers)
