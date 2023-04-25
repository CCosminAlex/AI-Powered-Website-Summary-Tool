from flask import Flask, request, jsonify
from flask_cors import CORS
import Service
app = Flask(__name__)
CORS(app)

@app.route("/submit-url", methods=["POST"])
def submit_url():
    url = request.json.get("url")

    if url is None:
        return jsonify({"error": "URL is missing from the request body"}), 400

    # Log the received URL to the console
  
    scraped_data = Service.scrape_website(url)
    
    # Do something with the URL, e.g. save it to a database
    
    return jsonify(scraped_data), 200

if __name__ == "__main__":
    app.run(debug=True)
