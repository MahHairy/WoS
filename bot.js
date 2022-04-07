require ('dotenv').config();
const tmi = require('tmi.js');
const https = require('https');




// Define configuration options
const opts = {options: { debug: true },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels: [
        process.env.CHANNEL_NAME
    ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();
let biggestWord;
let i = 0;

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();
    //select language
    const L = 'EN';

    const app_id = process.env.APP_ID;
    const app_key = process.env.APP_KEY;
    const args = commandName.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    const wordId = args.toString().trim();
    //const fields = "definitions";
    const strictMatch = "false";
    const options = {
        host: 'od-api.oxforddictionaries.com',
        port: '443',
        path: '/api/v2/entries/en-us/' + wordId + '?strictMatch=' + strictMatch,
        method: "GET",
        headers: {
            'app_id': app_id,
            'app_key': app_key
        }
    };






    //if there's a link, send nothing
    if(commandName.includes("http") === true || commandName.includes("www") === true || (commandName.length > 9 && (commandName.includes(";") || commandName.includes("%")) && command !== "define" && commandName !== 'lw') || (commandName.length < 5 && (commandName.includes(";") || commandName.includes("%")) && command !== "define" && commandName !== 'lw')){
        //client.say(target, ``);
        return;
    }

    //else, if word contains %, send it without the %
    else if (commandName.includes("%") === true){
        const word2 = word(commandName);
        client.say(target, `${word2}`);
    }
     //big word
        else if (commandName.includes(";") === true){
            const word3 = bigWord(commandName);
            biggestWord = word3;
            i++;
            if (L === 'EN')
                if (i % 2 === 1)
                    client.say(target, `${biggestWord} are  the ONLY VALID letters`);

                else if (i % 2 === 0)
                    client.say(target, `${biggestWord} are the ONLY VALID letters`);

            if (L === 'PT')
                client.say(target, `${word3} são as ÚNICAS letras VÁLIDAS`);
        }


        else if (commandName.includes('lw'))
        {
            i++;
            if (L === 'EN')
                if (i % 2 === 1)
                    client.say(target, `${biggestWord} are  the ONLY VALID letters`);

                else if (i % 2 === 0)
                    client.say(target, `${biggestWord} are the ONLY VALID letters`);




            if (L === 'PT')
                client.say(target, `${biggestWord} são  as ÚNICAS letras VÁLIDAS`);
        }

      //define command
        else if(command === 'define') {
            console.log("Input: " + args)
            console.log("Command Name: " + command)

            https.get(options, (resp) => {
                let body = '';
                resp.on('data', (d) => {
                    body += d;
                });
                resp.on('end', () => {
                    let parsed = JSON.parse(body);
                    let def = 1;

                    if(parsed.results == undefined)
                    {
                        console.log("Maybe try to define an actual word, idk")
                        client.say(target, `"${wordId}" has neither a definition nor is a derivative of any other word. Maybe try to define an actual word next time, idk`)
                    }


                    else if (parsed.results[0].lexicalEntries[0].entries[0].senses[0].definitions == undefined) {
                        wordNotDefined = parsed.id
                        derivativeOf = parsed.results[0].lexicalEntries[0].derivativeOf[0].id
                        console.log("\"" + wordNotDefined + "\"" + " has no definition, but is a derivative of " + "\"" + derivativeOf + "\". " + "Find the definition of " + "\"" + derivativeOf + "\"" + " instead.");
                        client.say(target, `"${wordNotDefined}" has no definition, but is a derivative of "${derivativeOf}". Find the definition of "${derivativeOf}" instead.`)


                    }



                    else{
                        //let definition;
                    parsed.results.forEach(result => {
                        result.lexicalEntries.forEach(lexicalEntry => {
                            lexicalEntry.entries[0].senses.forEach(sense => {

                                //{definition += " 🧠 definition " + def +  " (" + lexicalEntry.lexicalCategory.id + ")" + ": " + sense.definitions[0]}
                                if (sense.definitions != undefined)
                                {
                                    console.log("definition " + def + " of " + "\"" + result.word + "\"" + " " + "(" + lexicalEntry.lexicalCategory.id + ")" + ": " + sense.definitions[0])
                                    client.say(target, `definition ${def} of "${result.word}" (${lexicalEntry.lexicalCategory.id}): ${sense.definitions[0]}`)
                                }
                                else
                                {
                                    console.log("Couldn't find any more definitions for \"" + result.id + "\".")
                                }

                                def++
                            })

                        })

                    })
                        //client.say(target, `${definition}`)

                }
                    //client.say(target, `${parsed.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]}`);

                });
            });
        }

     //

        //Words on Stream commands
    else if(command === 'woscommands'){
        client.say(target,`➡️ !wos : mirror link`)
        client.say(target,`➡️ !continue : continue the game`)
        client.say(target,`➡️ !restart : restart the game`)
        client.say(target,`➡️ !define word : Oxford Dictionary defines the word`)
        client.say(target,`➡️ word% : @100Hairy types the word`)
        client.say(target,`➡️ word= : @EquallyHairy types the word`)
        client.say(target,`➡️ word* : @StarrilyHairy types the word`)
        client.say(target,`➡️ word; : word with letters spaced out and capitalized, like W O R D`)
        client.say(target,`➡️ lw : word with letters spaced out and capitalized, but only after the "word;" command has been used for that word`)

    }



}

function word(word)
{
    //remove %
    return word.replace("%", "").trim();
    //return word.substring(0, word.length - 1);
}

function bigWord(word)
{
    return word.split('').join(' ').toUpperCase().replace(";", "").trim();
}

// Function called when the "dice" command is issued
function rollDice () {
    const sides = 20;
    return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
