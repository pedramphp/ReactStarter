var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://luminous-heat-8155.firebaseio.com/';

var ListItem = React.createClass({
    getInitialState: function(){
        return {
            text: this.props.item.text,
            done: this.props.item.done,
            textChanged: false
        }
    },
    componentWillMount: function(){
        this.fb = new Firebase(rootUrl + 'items/' + this.props.item.id);
    },
    render: function(){
        return <div className="input-group">
            <span className="input-group-addon">
                <input type="checkbox"
                    checked={this.state.done}
                    onChange={this.handleCheckboxChange}/>
            </span>

            <input type="text"
                disabled={this.state.done}
                className="form-control"
                value={this.state.text}
                onChange={this.handleTextChange} />

            <span className="input-group-btn">
                {this.changesButtons()}
                <button className="btn btn-default" onClick={this.handleDeleteClick}>
                    Delete
                </button>
            </span>
        </div>
    },

    handleCheckboxChange: function(event){
        var update = {
            done: event.target.checked
        };

        this.setState(update);

        this.fb.update(update);
    },

    handleDeleteClick: function(event){
        this.fb.remove();
    },

    handleTextChange: function(event){
        this.setState({
            text: event.target.value,
            textChanged: true
        })
    },

    handleUndoClick: function(event){
        this.setState({
            text: this.props.item.text,
            textChanged: false
        });
    },

    handleSaveClick: function(){
        this.setState({
            textChanged: false
        });

        this.fb.update({
            text: this.state.text
        })
    },

    changesButtons: function(){
        if(!this.state.textChanged){
            return null;
        }

        return [<button className="btn btn-default" onClick={this.handleSaveClick}>
                    Save
                </button>,
                <button className="btn btn-default" onClick={this.handleUndoClick}>
                    Undo
                </button>];
    }
});

module.exports = ListItem;
