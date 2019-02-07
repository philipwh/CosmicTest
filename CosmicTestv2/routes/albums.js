// routes/index.js

router.get('/photo-gallery/:slug', (req, res) => {
  const config = req.app.locals.cosmicConfig
  async.series({
    siteSettings(callback) {
      Cosmic.getObject(config, { slug: 'site-settings' }, (error, response) => {
        callback(null, response.object.metadata)
      })
    },
    album(callback) {
      Cosmic.getObject(config, { slug: req.params.slug }, (err, response) => {
        callback(null, response.object)
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
      res.locals.title = results.siteSettings.band_name + ' | ' + results.album.title
      res.locals.album = results.album
      res.locals.photos = results.album.metadata.photos
      res.render('album.handlebars')
  })
})
