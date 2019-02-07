// routes/index.js

router.get('/photo-gallery', (req, res) => {
  const config = req.app.locals.cosmicConfig
  async.series({
    siteSettings(callback) {
      Cosmic.getObject(config, { slug: 'site-settings' }, (error, response) => {
        callback(null, response.object.metadata)
      })
    },
    galleries(callback) {
      Cosmic.getObjectsByType(config, { type_slug: 'galleries' }, (error, response) => {
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
      res.locals.title = results.siteSettings.band_name + ' | Photo Gallery'
      res.locals.galleries = results.galleries
      res.render('gallery.handlebars')
  })
})
