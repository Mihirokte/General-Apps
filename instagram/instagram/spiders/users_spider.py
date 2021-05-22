import scrapy
import json
 
NIFTY_FIFTY = "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050"
 
 
class LiveSpider(scrapy.Spider):
    name = "new"
    start_urls = [NIFTY_FIFTY]
 
    # Custom Settings are needed to send the User Agent.         
    custom_settings = {
        'USER_AGENT' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'
    }
 
    def parse(self, response):
        json_response = json.loads(response.text)
        listings = json_response["data"]
        for listing in listings:
            yield {
                "Symbol": listing["symbol"],
                "dayHigh": listing["dayHigh"],
            }