db.locations.save({
    name: 'Comida',
    address: 'Ali do lado, 456',
    rating: 4,
    facilities: [
        'Mim Acher',
        'Descubra',
        'Didico'
    ],
    coords: [
        -46.5781667,
        -23.6176151
    ],
    openingTimes: [
        {
            days: 'Segunda - Sexta',
            opening: '09:00',
            closing: '18:00',
            closed: false
        },{
            days: 'Sabado',
            opening: '9:00',
            closing: '22:00',
            closed: false
        },{
            days: 'Domingo',
            opening: '12:00',
            closing: '22: 00',
            closed: false
        }
    ],
    reviews : [
        {
            "author" : "Ave",
            "_id" : ObjectId(),
            "rating" : 5,
            "timestamp" : new Date("Jan 07, 2017"),
            "reviewText" : "Ué"
        },
        {
            "author" : "Tetinha",
            "_id" : ObjectId(),
            "rating" : 3,
            "timestamp" : new Date("Jan 07, 2017"),
            "reviewText" : "Comi pra caralho"
        }
    ]
})