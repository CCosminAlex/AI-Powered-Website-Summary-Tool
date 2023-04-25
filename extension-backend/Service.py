import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
def scrape_website(url):
    # Construct the Google search query
    parsed_url = urlparse(url)
    domain = parsed_url.netloc.strip()
    parts = domain.split(".")
    if len(parts) >= 3:
        main_domain = parts[-2]
    else:
        main_domain = parts[0]
   
    
    search_url = f"https://www.google.com/search?q={main_domain}"
    
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    response = requests.get(search_url, headers=headers)
    html = response.content

    # Parse the HTML with BeautifulSoup
    soup = BeautifulSoup(html, 'html.parser')

    # Find the first search result
    result = soup.find('div', {'class': 'VwiC3b yXK7lf MUxGbd yDYNvb lyLwlc lEBKkf'})
    

    summary = result.text
    parsedSummary = summary
    if summary[-3:] == "...":
       parsedSummary = summary[:-3]

    return {"summary": parsedSummary}

