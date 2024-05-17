import requests

response = requests.post('http://localhost:1234', json={'ola': 'mundo'})

print(response.status_code)
print(response.json())