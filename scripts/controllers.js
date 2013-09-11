Darwin.TreeController = Ember.ObjectController.extend({
    actions: {
        editTodo: function () {
            this.set('isEditing', true);
        },
        acceptChanges: function () {
            this.set('isEditing', false);

            if (Ember.isEmpty(this.get('model.title'))) {
                this.send('removeTree');
            } else {
                this.get('model').save();
            }
        },
        removeTree: function () {
            var todo = this.get('model');
            todo.deleteRecord();
            todo.save();
        }
    },

    isEditing: false,

    isCompleted: function(key, value){
        var model = this.get('model');

        if (value === undefined) {
            // property being used as a getter
            return model.get('isPublic');
        } else {
            // property being used as  setter
            model.set('isPublic', value);
            model.save();
            return value;
        }
    }.property('model.isPublic')
});

Darwin.TreesController = Ember.ArrayController.extend({
    actions: {
        clearCompleted: function () {
            var completed = this.filterProperty('isPublic', true);
            completed.invoke('deleteRecord');
            completed.invoke('save');
        }
    },

    remaining: function () {
        return this.filterProperty('isPublic', false).get('length');
    }.property('@each.isPublic'),

    inflection: function () {
        var remaining = this.get('remaining');
        return remaining === 1 ? 'item' : 'items';
    }.property('remaining'),

    hasCompleted: function () {
        return this.get('completed') > 0;
    }.property('completed'),

    completed: function () {
        return this.filterProperty('isPublic', true).get('length');
    }.property('@each.isPublic'),

    allAreDone: function (key, value) {
        if (value === undefined) {
            return !!this.get('length') && this.everyProperty('isPublic', true);
        } else {
            this.setEach('isPublic', value);
            this.invoke('save');
            return value;
        }
    }.property('@each.isPublic')
});

Darwin.TreesCreateController = Ember.ArrayController.extend({
    actions: {
        createTree: function () {
            // Get the todo title set by the "New Todo" text field
            var title = this.get('newTitle');
            if (!title.trim()) { return; }

            // Create the new Todo model
            var tree = this.store.createRecord('tree', {
                title: title,
                isPublic: false
            });

            // Clear the "New Todo" text field
            this.set('newTitle', '');

            // Save the new model
            tree.save();

            // Transition to index route.
            this.transitionTo('trees');
        }
    }
});

Darwin.EditTodoView = Ember.TextField.extend({
    didInsertElement: function () {
        this.$().focus();
    }
});
