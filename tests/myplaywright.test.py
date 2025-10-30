from playwright.sync_api import sync_playwright
import time

sync_playwright = sync_playwright().start()
browser = sync_playwright.chromium.launch(proxy={"server": "http://localhost:38080"})
browser.on('disconnected', lambda : print("Browser disconnected"))
context = browser.new_context()
context.on('close', lambda : print("Context closed"))
page = context.new_page()
page.on('close', lambda : print("Page closed"))

input("Press Enter to close the page...")