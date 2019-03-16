import json
# import pprint
import time
from random import randint
import urllib.request
with open('../../bracket/src/data/ncaa.org.shools.json2') as data_file:
    data = json.load(data_file)
    for school in data:
        url = "https://i.turner.ncaa.com/sites/default/files/images/logos/schools/bgl/"+school["slug"]+".svg"
        print(url)
        opener = urllib.request.build_opener()
        opener.addheaders = [('User-agent', 'Mozilla/5.0')]
        urllib.request.install_opener(opener)
        try:
            urllib.request.urlretrieve (url, school["slug"]+".svg")
        except:
            print("er")
        time.sleep(randint(0,10) / 100)
