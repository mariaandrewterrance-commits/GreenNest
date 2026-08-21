# Optional smoke test. Install requests first: pip install requests
import requests

BASE = "http://127.0.0.1:8000"
print("Health:", requests.get(BASE + "/api/health").json())
products = requests.get(BASE + "/api/products").json()
print("Products returned:", len(products))
