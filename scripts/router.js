Darwin.Router.map(function () {
    this.resource('trees', { path: '/' }, function () {
        // additional child routes
        this.route('private');
        this.route('public');
        this.route('upload');
        this.route('create');
        this.route('edit');
        this.resource('tree', { path: '/:tree_id'});
    });
});


Darwin.TreeRoute = Ember.Route.extend({
    model: function(params) {
        return this.get('store').find('tree', params.tree_id);
    },

    renderTemplate: function() {
        this.render();
        this.render('tree', {
            into: 'trees',
            outlet: 'main'
        });
    }
});

Darwin.TreesRoute = Ember.Route.extend({
    model: function () {
        return this.store.find('tree');
    },

    renderTemplate: function() {
        this.render();
        this.render('trees/index', {
            into: 'trees',
            outlet: 'treelist'
        });
    }
});

Darwin.TreesIndexRoute = Ember.Route.extend({
    model: function () {
        return this.modelFor('trees');
    }
});

Darwin.TreesPrivateRoute = Ember.Route.extend({
    model: function(){
        return this.store.filter('tree', function (tree) {
            return !tree.get('isPublic');
        });
    },
    renderTemplate: function() {
        this.render('trees/index', {
            into: 'trees',
            outlet: 'treelist'
        });
    }
});

Darwin.TreesPublicRoute = Ember.Route.extend({
    model: function(){
        return this.store.filter('tree', function (tree) {
            return tree.get('isPublic');
        });
    },
    renderTemplate: function() {
        this.render('trees/index', {
            into: 'trees',
            outlet: 'treelist'
        });
    }
});

Darwin.UploadRoute = Ember.Route.extend({
    model: function () {
        return this.store.find('tree');
    },

    renderTemplate: function() {
        this.render('trees/upload', {
            into: 'trees',
            outlet: 'main'
        });
    }
});

Darwin.CreateRoute = Ember.Route.extend({
    model: function () {
        return this.store.find('tree');
    },

    renderTemplate: function() {
        this.render('trees/create', {
            into: 'trees',
            outlet: 'main'
        });
    }
});

Darwin.EditRoute = Ember.Route.extend({
    model: function () {
        return this.store.find('tree');
    },

    renderTemplate: function() {
        this.render('trees/edit', {
            into: 'trees',
            outlet: 'main'
        });
    }
});