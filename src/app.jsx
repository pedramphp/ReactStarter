var React = require('react');
var Firebase = require('firebase');
var ReactFire = require('reactfire');

var Header = require('./header');
var List = require('./list');

var rootUrl = 'https://luminous-heat-8155.firebaseio.com/';

var App = React.createClass({
    mixins: [ ReactFire ],
    getInitialState: function(){
        return {
            items: null,
            loaded: false
        }
    },
    componentWillMount: function(){ // only get's triggered once
        this.fb = new Firebase(rootUrl + 'items/');

        //bindAsObject given to us by reactfire
        this.bindAsObject(this.fb, 'items');
        // this.state.items ==> Object from firebase

        this.fb.on('value', this.handleDataLoaded);
    },
    render: function() {

        //console.log(this.state);
        //console.log(this.firebaseRefs.items);
        return <div className="row panel panel-default">
                <div className="col-md-8 col-md-offset-2">
                    <h2 className="text-center">
                        To-DO List
                    </h2>
                    <Header itemsStore={this.firebaseRefs.items} />
                    <hr />
                    <div className={"content" + (this.state.loaded ? " loaded": "")}>
                        <List items={this.state.items} />
                        {this.deleteButton()}
                    </div>
                </div>

        </div>
    },

    deleteButton: function(){
        if(!this.state.loaded){
            return;
        }

        return <div className="text-center clear-complete">
            <hr />
            <button onClick={this.handleDeleteClick} className="btn btn-default">
                Clear Complete
            </button>
        </div>
    },

    handleDeleteClick: function() {
        Object.keys(this.state.items).forEach(function(key) {
            if(this.state.items[key].done === true) {
                this.fb.child(key).remove();
            }
        }.bind(this));
    },

    handleDataLoaded: function() {
        this.setState({
            loaded: true
        });
    }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
