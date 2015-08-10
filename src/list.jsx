var React = require('react');
var ListItem = require('./list-item');

var List = React.createClass({
    render: function (){
        return <div>
            {this.renderList()}
        </div>
    },

    renderList: function(){
        if(!this.props.items || Object.keys(this.props.items).length === 0){
            return <h4>
            Add a To-Do to get started
            </h4>
        }

        var items = this.props.items;
        var item;
        return Object.keys(items).map(function(key){
            item = items[key];
            item.id = key;
            return <ListItem item={item} key={key} />
        });
    }
});

module.exports = List;
