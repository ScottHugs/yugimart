require('dotenv').config()

const _ = require('lodash')
const db = require('./index')

const cardNames = yugioh_cards = [
    "Red-Eyes Black Dragon",
    "Exodia the Forbidden One",
    "Elemental HERO Neos",
    "Black Luster Soldier - Envoy of the Beginning",
    "Slifer the Sky Dragon",
    "Obelisk the Tormentor",
    "The Winged Dragon of Ra",
    "Dark Hole",
    "Mirror Force",
    "Pot of Greed",
    "Monster Reborn",
    "Raigeki",
    "Change of Heart",
    "Solemn Judgment",
    "Mystical Space Typhoon",
    "Harpie Lady",
    "Cyber Dragon",
    "Elemental HERO Flame Wingman",
    "Number 39: Utopia",
    "Stardust Dragon",
    "Black Rose Dragon",
    "Odd-Eyes Pendulum Dragon",
    "Dark Rebellion Xyz Dragon",
    "Toon World",
    "Sangan",
    "Tour Guide From the Underworld",
    "Ash Blossom & Joyous Spring",
    "Ghost Ogre & Snow Rabbit",
    "Evenly Matched",
    "Pot of Desires",
    "Infinite Impermanence",
    "Elemental HERO Stratos",
    "Thunder Dragon Colossus",
    "Sky Striker Ace - Raye",
    "Salamangreat Gazelle",
    "Orcust Knightmare",
    "Elder Entity Norden",
    "Linkuriboh",
    "Apollousa, Bow of the Goddess",
    "Knightmare Unicorn",
    "Borreload Dragon",
    "Saryuja Skull Dread",
    "El Shaddoll Construct",
    "Number 101: Silent Honor ARK",
    "Red-Eyes Flare Metal Dragon",
    "Decode Talker",
    "Firewall Dragon",
    "Dark Paladin",
    "Odd-Eyes Revolution Dragon",
    "Buster Blader, the Destruction Swordmaster",
    "Witch of the Black Forest",
    "Chaos Emperor Dragon - Envoy of the End",
    "Mermaid Archer",
    "The Legendary Fisherman",
    "Cyber Harpie Lady",
    "Elemental HERO Thunder Giant",
    "Dark Armed Dragon",
    "M-X-Saber Invoker",
    "Trishula, Dragon of the Ice Barrier",
    "Brionac, Dragon of the Ice Barrier",
    "Gagaga Cowboy",
    "Abyss Dweller",
    "Castel, the Skyblaster Musketeer",
    "Tornado Dragon",
    "Dante, Traveler of the Burning Abyss",
    "Number 11: Big Eye",
    "Crystal Wing Synchro Dragon",
    "Number 68: Sanaphond the Sky Prison",
    "Number 92: Heart-eartH Dragon",
    "D/D/D Duo-Dawn King Kali Yuga"
]
const rarities = ['C', 'SR', 'UR', 'PS', 'CR']
const conditions = ['PL','LP','GD','EX','NM','M']
const shippingOptions = ['standard', 'tracked', 'express']
const shippingPrices = [2, 4, 8]
const userNames = [
    'StarGazer',
    'QuantumCoder',
    'LunaExplorer',
    'BlazeRunner',
    'PixelPioneer',
    'FrostyPhoenix',
    'EchoJester',
    'NebulaNavigator',
    'EmberWhisper',
    'CelestialChaser',
    'TechSphinx',
    'SapphireNomad',
    'ZenithPilgrim',
    'CyberHarmony',
    'LunaVoyager',
    'QuantumQuasar',
    'NovaNomad',
    'EtherealScribe',
    'SolarFlareSeeker',
    'PixelPilgrim'
  ];

  

for (let i = 0; i < 10; i++) {

    let shippinIndex = _.random(2)

    let cardName = _.sample(cardNames)
    let set = `TES-${_.random(100, 999)}`
    let rarity = _.sample(rarities)
    let condition = _.sample(conditions)
    let language = 'ENG'
    let sellerUserName = _.sample(userNames)
    let price = `${_.random((150))}.00`
    let offers = Math.random() >= 0.5
    let img = 'https://fakeimg.pl/200x300'
    let shipping1 = shippingOptions[shippinIndex]
    let shipping1Price = shippingPrices[shippinIndex]
    let shipping2 = shippingOptions[2-shippinIndex]
    let shipping2Price = shippingPrices[2-shippinIndex]

    let sql = `
    INSERT INTO singles 
    (card_name, set, rarity, condition, language, seller_user_name, price, offers, img, shipping_1, shipping_1_price, shipping_2, shipping_2_price)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `

    db.query(sql, [cardName, set, rarity, condition, language, sellerUserName, price, offers, img, shipping1, shipping1Price, shipping2, shipping2Price], (err, result) => {
        if (err) {
            console.log(err)
        }
    })
    
}

console.log('entries added')