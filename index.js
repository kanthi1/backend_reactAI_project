const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { OpenAI} = require('openai')


//use dotenv instead of doing it this way
const openai = new OpenAI({ apiKey: "YOUR_API_KEY" });




// const config = new OpenAIApi(new Configuration({
//     apiKey:"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"
    
// }))


const app = express()
app.use(bodyParser.json())
app.use(cors())

// const openAIConfig = new OpenAIApi("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");

app.post('/query1',async (req,res)=>{

    let prompt = req.body
    prompt=JSON.stringify(prompt)

    const completion =  await openai.chat.completions.create({
        model : "gpt-3.5-turbo",
        messages: [{"role": "system", "content": prompt}]
    })

    console.log("data from gpt",completion.choices[0].message.content)

    console.log("data from frontend",typeof(completion.choices[0].message.content))

    let dataToSend = {
        "data": `${completion.choices[0].message.content}`
    }

    res.send(dataToSend)
})

app.get("/query",async(req,res)=>{
    const completion =  await openai.chat.completions.create({
        model : "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "tell me about facebook"}]
    })

    console.log("data from gpt",completion.choices[0].message.content)

    res.send(completion.choices[0].message.content)

})

app.listen('8080',(err)=>{
    if(err) console.log(err)
    else
    console.log("server running")
});