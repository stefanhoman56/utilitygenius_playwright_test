from playwright.sync_api import sync_playwright, Page
import time
import slack
from csv import DictReader
import numpy as np
from concurrent.futures import ThreadPoolExecutor




with open("./data.csv", 'r') as f:
        dict_reader = DictReader(f)
        list_of_dict = list(dict_reader)

dictionary_pages = list_of_dict
dict_arr = np.array(dictionary_pages)
arrays = np.array_split(dict_arr , 6)
count = len(dictionary_pages)

failed_pages=[]
reattempt_lst = []

headless = False
def check_widget_in_page(pass_dict_pages: dict ):
    page_name = pass_dict_pages.get('Manufacturer')        
    page_url = pass_dict_pages.get('URL')
 
    with sync_playwright() as p:
        
        browser = p.chromium.launch(headless=headless)
        pass_page = browser.new_page()
        
        print(f"Checking {page_name}....." , flush=True)
        
        if page_name == "Cooper":
            pass_page.goto(page_url, wait_until="domcontentloaded", timeout=90000)
            time.sleep(10)
            elementHandle = pass_page.wait_for_selector('iframe[title="TrustArc Cookie Consent Manager"]')
            frame = elementHandle.content_frame()
            frame.wait_for_selector('//a[text()[contains(.,"Agree and proceed")]]').click()
            pass_page.wait_for_selector('select[class="ee-widget-form-control"]')
            
        elif page_name == "Dialight":
            pass_page.goto(page_url, wait_until="networkidle", timeout=90000)
            time.sleep(10)
            pass_page.locator('#onetrust-accept-btn-handler').click()
            pass_page.wait_for_selector('select[class="ee-widget-form-control"]')
        elif page_name == "FSC":
            time.sleep(5)
            pass_page.goto(page_url, wait_until="networkidle", timeout=90000)
        elif page_name == "Universal":
            pass_page.goto(page_url, wait_until="networkidle", timeout=90000)
            pass_page.wait_for_selector(".ee-widget-form-control")
            number_of_matched_item = pass_page.locator('select[class="ee-widget-form-control"]').count()
        elif page_name == "Signify":
            pass_page.goto(page_url, wait_until="networkidle", timeout=150000)
            pass_page.wait_for_selector(".ee-widget-form-control")
            number_of_matched_item = pass_page.locator('select[class="ee-widget-form-control"]').count()
        elif page_name == "LED Stick":
            new_page_url = page_url.replace("/widget", "/rebateguide")
            pass_page.goto(new_page_url, wait_until="networkidle", timeout=90000)
            pass_page.wait_for_selector(".ee-widget-form-control")
            number_of_matched_item = pass_page.locator('select[class="ee-widget-form-control"]').count()
        elif page_name == "Acuity":
            pass_page.goto("https://www.acuitybrands.com/resources/retrofit-and-renovation/energy-efficient-products" ,timeout=90000)
            pass_page.wait_for_selector(".ee-widget-form-control")
            number_of_matched_item = pass_page.locator('select[class= "ee-widget-form-control"]').count()
        else:
                pass_page.goto(page_url, wait_until="networkidle", timeout=90000)
        if page_name == "Topaz":
            elementHandle = pass_page.wait_for_selector('iframe[src]')
            frame = elementHandle.content_frame()
            frame.wait_for_selector('select[class="ee-widget-form-control"]')
            number_of_matched_item=frame.locator('select[class="ee-widget-form-control"]').count()
        else: 
                pass_page.wait_for_selector(".ee-widget-form-control")
                number_of_matched_item = pass_page.locator('select[class= "ee-widget-form-control"]').count()
        browser.close()
        
        if number_of_matched_item == 0:
            failed_pages.append(page_name)
 
        print(f"{page_name} checked successfully" , flush= True)


    
def get_result_to_send(failed_page_item:list , total_pages:int):
    result = ""
    
    total_pgs = total_pages
    if len(failed_page_item) == 0:
        result = f"The test for checking widgets is : SUCCESSFUL \n{total_pgs} pages were tested \n{total_pgs} pages were passed"
    else:
        result = f"The test for checking widgets is : UNSUCCESSFUL \n{total_pgs} pages were tested \n{len(failed_page_item)} pages were failed which are {failed_page_item}"
    return result

def send_result_to_Slack(channel:str, token:str, result:str):
    client = slack.WebClient(token=token)
    client.chat_postMessage(channel=channel, text = result)
    

    
    

if __name__ == '__main__':   

    try:
        browser_mode = input("Press y if you want to use headless mode or else press any other key to continue: ")
        if browser_mode == "y":
            headless = True
            print("Running in Headless mode.... " , flush = True) 
        else :
            headless = False
            print("Running in Non-Headless mode.... " , flush = True)
        with ThreadPoolExecutor() as p:
            p.map(check_widget_in_page, dict_arr)
        result = get_result_to_send(failed_pages , count)
        print(result)
        #send_result_to_Slack("#encentivizerbots","xoxb-10764095623-3759999133462-vvZGSqukPkzWOEXg4DvY9if8",result)
        print("Result sent to Slack")
        print("Closing app.....")

    except Exception as e:
        print("Program failed to execute due to an error !!" , e)

    
        
