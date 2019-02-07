// routes/index.js

router.get('/tour', async (req, res) => {
  const config = req.app.locals.cosmicConfig
  async.series({
    siteSettings(callback) {
      Cosmic.getObject(config, { slug: 'site-settings' }, (error, response) => {
        callback(null, response.object.metadata)
      })
    },
    tourDates(callback) {
      Cosmic.getObjectsByType(config, { type_slug: 'tour-dates' }, (error, response) => {
        callback(null, response.objects.all)
      })
    }
  }, (err, results) => {
    res.locals.settings = results.siteSettings
    const socials = {
      twitter: results.siteSettings.twitter,
      instagram: results.siteSettings.instagram,
      youtube: results.siteSettings.youtube,
      apple: results.siteSettings.apple_music,
      spotify: results.siteSettings.spotify,
      bandcamp: results.siteSettings.bandcamp
    }
    res.locals.socials = socials
    res.locals.tourDates = _.sortBy(results.tourDates, tourDate => (
      tourDate.metadata.date
    ))
    res.locals.title = results.siteSettings.band_name + ' | Tour Dates'

    res.render('tour.handlebars')
  })
})