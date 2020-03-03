# AlertMoon
This is a personal project because I love cryptocurrencies and blockchain, some of my savings are there at the moment and while I'm a HODLER i do like to get price alerts.

Problem was when i tried several price alert websites i found that:
**Most sites...**
 - Trigger the alerts based on a set price you define, this is indeed useful but cryptocurrencies are highly volatile, i'm most interested on alerts when the price changes by x% percent in a given time.
 - Offer a plethora of alert channels (mail, sms, telegram, whatsapp, etc.) and that's cool, but this offers poor anonymity as you must give your personal details.
 - Have a trigger rule limit, you can only set X ammount of rules, if you want more rules you have to get a paid subscription.
 - Have a notification trigger limit, when the alert gets triggered X ammount of times, they ask you to get a paid subscription.

As I was already a few weeks deep in a VueJS course on Udemy, i decided this could be a cool first project that:

 - It shouldn't cost me a penny to maintain (besides the domain)
 - Must scale without too much maintenance
 - Must be entirely cloud based
 - Must be as anonymous as possible

## Technologies used
- VueJS
- VueFire
- Firebase Auth
- Firebase Cloud Messaging
- Firebase Cloud Functions
- Google Doc Sheets
- Google AppScript
- GEMINI & BITSTAMP API

## Why these technologies?
When i started this project i already knew VueJS would be my framework of choice, the next step was looking for how i would deliver the price alerts.

Mail, SMS, WhatsApp or Telegram bots were discarded immediately as these required the user to give personal information, the only thing i could find after several Google searches were Push notifications, where the user goes into the website and gives the permission to receive notifications.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
