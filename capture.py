from playwright.sync_api import sync_playwright
import time

def capture_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1400, 'height': 800})
        
        # Capture Executive Summary
        page.goto('http://localhost:5173')
        time.sleep(3) # Wait for animations and data
        page.screenshot(path='/Users/SAC project/AirPulse BI/assets/executive_summary.png')
        
        # Capture Detailed Analytics (Drilldown)
        page.get_by_text("Trend Drilldown").click()
        time.sleep(2) # Wait for charts to render
        page.screenshot(path='/Users/SAC project/AirPulse BI/assets/detailed_analytics.png')
        
        browser.close()

if __name__ == '__main__':
    capture_screenshots()
