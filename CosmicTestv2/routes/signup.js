
// routes/index.js

router.post('/signup', (req, res) => {
  const email = req.body.email
  axios.post(`https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members/`, {
    auth: {
      url: `https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/`,
      user: `anystring:${process.env.MAILCHIMP_KEY}`
    },
    body: {
      "email_address": email,
      "status": "subscribed"
    }
  }).then(success => {
      res.redirect('/?subscribed=true')
  }).catch(err => {
    res.redirect('/?subscribed=false')
  })
})
