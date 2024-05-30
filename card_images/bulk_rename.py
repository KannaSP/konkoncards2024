import os
import json

def rename_files_from_list(directory, list_file):
    # Iterate through lines in the list file
    iterator = 0;

# Example usage:
directory_path = "C:/Users/Klemens/Downloads/GitHub/bempfoobq052021/card_images"
list_file_path = "in.txt"
json_file_path = 'server_card_list.json'
filenames = []
relative_filenames = []
counter = 0

with open(json_file_path) as json_file:
    data = json.load(json_file)
json_file.close()

with open(list_file_path, 'r') as f:
    lines = f.readlines()
f.close()

for line in lines: 
    filenames.append(os.path.join(directory_path, line.strip("\n")))
    relative_filenames.append(line.strip("\n"))
    
print('sample filename: ', filenames[0])

for datum in data:
    working_dir = filenames[counter]
    print('current json data : ', datum)
    os.replace(filenames[counter]+"/front.webp", filenames[counter]+"thumb_front.webp")
    if "back.png" in os.listdir(working_dir):
        datum["back_art"] = relative_filenames[counter] + "/back.png"
    if "front.png" in os.listdir(working_dir):
        datum["front_art"] = relative_filenames[counter] + "/front.png"
    datum["pulled"] = False
    data[counter] = datum
    counter+=1

with open(json_file_path, 'w') as json_file:
    json.dump(data, json_file, indent=4)
print("JSON data written to : ", json_file_path)
