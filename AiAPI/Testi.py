from g4f.client import Client

f = open("demo.txt", "r")
data = f.read()
f.close

validOutput = False

while not validOutput:
    client = Client()
    response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "Your response should be formatted as \"TaskId:\nstartdate:\nenddate]\nAiRecemondation:\"\n" + 
               "do not change anything "+
               data}],
    )
    f = open("out.txt", "w")
    f.write(response.choices[0].message.content)
    f.close()
    f = open("out.txt", "r")
    output = f.read()
    f.close
    validOutput = True
    