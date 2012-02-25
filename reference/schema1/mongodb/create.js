/* For readability only lets pre-define some ObjectIDs */
yoyodyne_account = new ObjectId();
yoyodyne_collection_propulsors = new ObjectId();
yoyodyne_collection_propulsors_active = new ObjectId();
yoyodyne_collection_propulsors_archived = new ObjectId();
yoyodyne_collection_personel = new ObjectId();
yoyodyne_collection_propulsors_criteria_model = new ObjectId();
yoyodyne_collection_propulsors_criteria_speed = new ObjectId();
yoyodyne_collection_propulsors_criteria_flux = new ObjectId();
yoyodyne_collection_personel_criteria_fullname = new ObjectId();
yoyodyne_collection_personel_criteria_loyalty = new ObjectId();
john_user = new ObjectId();

/* ACCOUNT(S) */

db.accounts.ensureIndex({ '_id' : 1, 'collections._id' : 1});

db.accounts.save({
    '_id' : yoyodyne_account,
    'name' : 'Yoyodyne Propulsion Systems',
    'shortname' : 'yoyodyne',
    'collection_shortnames': {
        'propulsors': yoyodyne_collection_propulsors,
        'propulsors_active': yoyodyne_collection_propulsors_active,
        'propulsors_archived': yoyodyne_collection_propulsors_archived,
        'personel': yoyodyne_collection_personel,
    },
    'collections' : [
        {
            '_id' : yoyodyne_collection_propulsors,
            'name' : 'Propulsors Division',
            'shortname' : 'propulsors',
            'path' : [yoyodyne_collection_propulsors],
        },
        {
            '_id' : yoyodyne_collection_propulsors_active,
            'name' : 'Active',
            'shortname' : 'propulsors_active',
            'path' : [yoyodyne_collection_propulsors, yoyodyne_collection_propulsors_active],
            'criteria_shortnames': {
                'model': yoyodyne_collection_propulsors_criteria_model,
                'speed': yoyodyne_collection_propulsors_criteria_speed,
                'flux': yoyodyne_collection_propulsors_criteria_flux,
            },
            'criteria' : [
                {
                    '_id' : yoyodyne_collection_propulsors_criteria_model,
                    'label' : 'Model',
                    'shortname': 'model',
                    'type' : 'str',
                    'description' : 'Model',
                },
                {
                    '_id' : yoyodyne_collection_propulsors_criteria_speed,
                    'label' : 'Speed',
                    'shortname': 'speed',
                    'type' : 'int',
                    'description' : 'Speed',
                },
                {
                    '_id' : yoyodyne_collection_propulsors_criteria_flux,
                    'label' : 'Flux',
                    'shortname': 'flux',
                    'type' : 'int',
                    'description' : 'Flux',
                },
            ],
        },
        {
            '_id' : yoyodyne_collection_propulsors_archived,
            'name' : 'Archived',
            'shortname' : 'propulsors_archived',
            'path' : [yoyodyne_collection_propulsors, yoyodyne_collection_propulsors_archived],
            'criteria_shortnames': {
                'model': yoyodyne_collection_propulsors_criteria_model,
                'speed': yoyodyne_collection_propulsors_criteria_speed,
                'flux': yoyodyne_collection_propulsors_criteria_flux,
            },
            'criteria' : [
                {
                    '_id' : yoyodyne_collection_propulsors_criteria_model,
                    'label' : 'Model',
                    'shortname': 'model',
                    'type' : 'str',
                },
                {
                    '_id' : yoyodyne_collection_propulsors_criteria_speed,
                    'label' : 'Speed',
                    'shortname': 'speed',
                    'type' : 'int',
                },
                {
                    '_id' : yoyodyne_collection_propulsors_criteria_flux,
                    'label' : 'Flux',
                    'shortname': 'flux',
                    'type' : 'int',
                },
            ],
        },
        {
            '_id' : yoyodyne_collection_personel,
            'name' : 'Personel Files',
            'shortname' : 'personel',
            'path' : [yoyodyne_collection_personel],
            'criteria_shortnames': {
                'fullname': yoyodyne_collection_personel_criteria_fullname,
                'loyalty': yoyodyne_collection_personel_criteria_loyalty,
            },
            'criteria' : [
                {
                    '_id' : yoyodyne_collection_personel_criteria_fullname,
                    'label' : 'Full Name',
                    'shortname': 'fullname',
                    'type' : 'str',
                },
                {
                    '_id' : yoyodyne_collection_personel_criteria_loyalty,
                    'label' : 'Loyalty',
                    'shortname': 'loyalty',
                    'type' : 'int',
                },
            ],
        },
    ],
    'paths': [
        [yoyodyne_collection_propulsors],
        [yoyodyne_collection_propulsors, yoyodyne_collection_propulsors_active],
        [yoyodyne_collection_propulsors, yoyodyne_collection_propulsors_archived],
        [yoyodyne_collection_personel],
    ],
});

/* USER(S) */

/* Keep this information in memory.  indexOnly is fun. */
db.users.ensureIndex({ 'username' : 1, 'password' : 1, '_id' : 1});

db.users.save({
    '_id': john_user,
    'username': 'john',
    'firstname': 'john',
    'lastname': 'john',
    'password': '$2a$12$xcNqZUe7xO3oOrCnngzKROta1fBCXJovX9ih.YouaTUhOXYyppBYi',
    'nickname': 'john',
    'accounts': [
        {
            '_id': yoyodyne_account,
            'active': true,
        },
    ],
});

