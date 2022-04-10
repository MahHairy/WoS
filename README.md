# WoS

### Terminal
- If your IDE uses PowerShell, to run commands directly into it (instead of having to open another terminal externally):
  - open Windows PowerShell as an admin
  - execute `Get-ExecutionPolicy -list` 
  - execute `Set-ExecutionPolicy -scope LocalMachine RemoteSigned` to change the execution policy from Undefined -> RemoteSigned. It will remove the restrictions 
  
![image](https://user-images.githubusercontent.com/78240268/155800502-54ef1501-3548-4f22-9e74-efdf8d7e628f.png)

### Setup
- clone the repository on your IDE
- execute `npm install` into the terminal of your IDE

### Symbols
- change the symbol from *%* to your preference to write next to a word, for your bot to type that word, on lines 69, 75, 200 of **bot.js**

![image](https://user-images.githubusercontent.com/78240268/162595720-97cba62c-395b-4fcb-8b73-a7d99accda8c.png)
![image](https://user-images.githubusercontent.com/78240268/162595728-1681c80f-3ef7-498b-8416-bb224f213566.png)


- change the symbol from *;* to your preference to write next to the big word, for the bot to type the big word with its letters capitalized and spaced out, on lines 69, 80, 206 of **bot.js**

![image](https://user-images.githubusercontent.com/78240268/162595764-3d3d8ba0-892e-46ad-8541-e27c039d90a4.png)
![image](https://user-images.githubusercontent.com/78240268/162595780-f2779802-f6a0-4357-84e0-468aef11a41f.png)


- change the symbol from *lw* to your preference, for the bot to retype the big word with its letters capitalized and spaced out, on lines 69, 96 of **bot.js**

![image](https://user-images.githubusercontent.com/78240268/162595843-c46c8755-c2e1-443d-9f37-f7db3842db66.png)

### Environment
- create a *.env* file based on the *.env.example* file by executing `cp .env.example .env` into the terminal of your IDE
- edit the values of the variables of your *.env* file according to the template in the *.env.example* file

![image](https://user-images.githubusercontent.com/78240268/162596380-9214f6c6-a87c-4a8e-93e2-c21d0a921a97.png)

### Deployment
- execute `node bot.js` into the terminal of your IDE to deploy your bot into the channel specified in the *.env* file



