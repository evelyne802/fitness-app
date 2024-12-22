import express from 'express'
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

app.use(cors({
    origin: "http://localhost:4200",
    credentials: true 
}));

app.get('/send-email/:email/:code', (req, res) => {
    const email = req.params.email;
    const code = req.params.code;
    console.log(req.params);
    const response = `Sending email to ${email}`;
    console.log('request made it to server!');
    
    sgMail.setApiKey(process.env.SENDGRID_API);
    const msg = {
      to: email, 
      from: 'gympal.fitness.app@gmail.com',
      subject: 'Varification code for GYMPAL',
      text: `Your code is ${code}`,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error)
      })
})

app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`)
});
