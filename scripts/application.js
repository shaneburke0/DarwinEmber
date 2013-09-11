window.Darwin = Ember.Application.create({
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true
});

Darwin.ApplicationAdapter = DS.FixtureAdapter.extend();