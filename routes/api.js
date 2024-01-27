'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      if (req.body.text === '') {
        res.json({ error: 'No text to translate' });
        return
      }
      if (!req.body.text || !req.body.locale) {
        res.json({ error: 'Required field(s) missing' });
        return
      }
      if (req.body.locale !== 'american-to-british' & req.body.locale !== 'british-to-american') {
        res.json({ error: 'Invalid value for locale field' });
        return
      }
      if (req.body.locale === 'american-to-british') {
        res.body = {}
        res.body.text = req.body.text
        res.body.translation = translator.americanToBritishTranslate(req.body.text)
      }
      if (req.body.locale === 'british-to-american') {
        res.body = {}
        res.body.text = req.body.text
        res.body.translation = translator.britishToAmericanTranslate(req.body.text)
      }
      if (req.body.text === res.body.translation) {
        res.body.translation = 'Everything looks good to me!'
      }
        res.json(res.body)
    });
};
