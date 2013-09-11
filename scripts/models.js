Darwin.LifeEvent = DS.Model.extend({
    name: DS.attr('string'),
    type: DS.attr('string'),
    date: DS.attr('string'),
    location: DS.attr('string'),
    description: DS.attr('string')
});

Darwin.Tree = DS.Model.extend({
    title: DS.attr('string'),
    isPublic: DS.attr('boolean')     ,
    people: DS.hasMany('person', {async:true})
});

Darwin.Person = DS.Model.extend({
    name: DS.attr('string'),
    tree: DS.belongsTo('tree'),
    birth: DS.belongsTo('life-event')
});

Darwin.User = DS.Model.extend({
    name: DS.attr('string'),
    picture: DS.attr('string'),
    trees: DS.hasMany('tree', {async:true})
});

Darwin.User.FIXTURES = [
    {
        id: 1,
        name: 'PalmerHyde',
        picture: 'http://userdoc.ancestry.com/userdocstore/download.ashx?fileid=da6a19f2-49e6-4c62-ad37-e2cc51c8fb43&mac=8D07C1B43A3A8000000PPBaOmr_JEg=.60x80'
    }
];

Darwin.LifeEvent.FIXTURES = [
    {
        id: 1,
        type: 'B',
        date: '20th Aug 1976',
        location: 'London, England',
        description: 'It was a hot summer.'
    }
];

Darwin.Tree.FIXTURES = [
    {
        id: 1,
        title: 'Molloy Family Tree',
        isPublic: true,
        people: ["1", "2"]
    },
    {
        id: 2,
        title: 'Hanson Family Tree',
        isPublic: false,
        people: ["3", "4", "5"]
    },
    {
        id: 3,
        title: 'Palmer Family Tree',
        isPublic: false,
        people: ["6", "7", "8", "9"]
    }
];

Darwin.Person.FIXTURES = [
    {
        id: 1,
        name: "Liam Molloy",
        tree: "1",
        birth: "1"
    }  ,
    {
        id: 2,
        name: "James Molloy",
        tree: "1"
    },
    {
        id: 3,
        name: "Palmer Molloy",
        tree: "2"
    },
    {
        id: 4,
        name: "Kristi Hanson",
        tree: "2"
    },
    {
        id:  5,
        name: "Sue Hanson",
        tree: "2"
    } ,
    {
        id:  6,
        name: "Ernest Palmer",
        tree: "3"
    },
    {
        id:  7,
        name: "Doris Praide",
        tree: "3"
    },
    {
        id:  8,
        name: "Mandy Palmer",
        tree: "3"
    },
    {
        id:  9,
        name: "Gary Palmer",
        tree: "3"
    }
];