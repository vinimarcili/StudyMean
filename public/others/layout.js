db.locations.save({
    name: 'Garrafa',
    address: 'Rio, 987',
    rating: 4,
    facilities: [
        'H2O',
        'H2O com Gás'
    ],
    coords: [
        -46.5781567,
        -23.6176051
    ],
    openingTimes: [
        {
            days: 'Terça - Sexta',
            opening: '10:00',
            closing: '20:00',
            closed: false
        },{
            days: 'Sabado',
            opening: '8:00',
            closing: '20:00',
            closed: false
        },{
            days: 'Domingo',
            closed: true
        }
    ],
    reviews : [
        {
            "author" : "Gibão",
            "id" : ObjectId(),
            "rating" : 0,
            "timestamp" : new Date("Jan 13, 2017"),
            "reviewText" : "Não gostei, não tem alcool"
        },
        {
            "author" : "Vitão",
            "id" : ObjectId(),
            "rating" : 1,
            "timestamp" : new Date("Jan 07, 2017"),
            "reviewText" : "Não gostei, não tem Coca"
        }
    ]
})