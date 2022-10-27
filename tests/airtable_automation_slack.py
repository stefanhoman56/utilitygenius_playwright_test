from operator import index
from playwright.sync_api import sync_playwright, Page
import time
import pandas as pd
import csv

CLIENT_URL = "https://airtable.com/shreWJlBkd5m5k6K9/tblE9rlgf1zD3fjVd"
with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    page.goto(CLIENT_URL)
    obj = page.locator("[aria-label ='More view options']").click()
    time.sleep(10)
    download_ob = page.locator('text="Download CSV"').click()
    with page.expect_download() as download_info:
        download_ob = page.locator('text="Download CSV"').click()

    download = download_info.value
    
    print(download.path())
    download.save_as("./data.csv" )

df = pd.read_csv("./data.csv" ,encoding='utf-8')

df.drop(df[df['Manufacturer'] == "RAB"].index, inplace = True)
df.drop(df[df['Manufacturer'] == "US LED"].index, inplace = True)
df.drop(df[df['Manufacturer'] == "SATCO"].index, inplace = True)
df.drop(df[df['Product'] == "Payback"].index, inplace = True)
df.drop(df[df['URL'] == "https://www.eiko.com/Account/Login?ReturnUrl=%2Fpage%2Frebatefinder"].index, inplace = True)

df.dropna(inplace = True)

df.to_csv("./data.csv",encoding= 'utf-8' , index = False)


from csv import DictReader
# open file in read mode
with open("./data.csv", 'r' , encoding= 'utf-8') as f:
	
	dict_reader = DictReader(f)
	
	list_of_dict = list(dict_reader)
print(len(list_of_dict))



for item in list_of_dict:
    
    #values = list(item.values())
    #first_value = values[0]
    #print(first_value)
    print(item.get("URL"))
    print(item.get("Manufacturer"))

print(len(list_of_dict))
print(list_of_dict)
 
