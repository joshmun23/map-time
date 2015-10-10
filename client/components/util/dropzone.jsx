Dropzone = React.createClass({

    getInitialState: function() {
        return {
            isDragActive: false
        }
    },

    propTypes: {
        onDrop: React.PropTypes.func.isRequired,
        size: React.PropTypes.number,
        style: React.PropTypes.object
    },

    onDragLeave: function(e) {
        this.setState({
            isDragActive: false
        });
    },

    onDragOver: function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';

        this.setState({
            isDragActive: true
        });
    },

    onDrop: function(e) {
        e.preventDefault();

        this.setState({
            isDragActive: false
        });

        var files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }

        _.each(files, this._createPreview);
    },
    _createPreview: function(file){
        var self = this
            , newFile
            , reader = new FileReader();

        reader.onloadend = function(e){
            newFile = {file:file, imageUrl:e.target.result};
            if (self.props.onDrop) {
                self.props.onDrop(newFile);
            }
        };

        reader.readAsDataURL(file);
    },

    render: function() {

        var className = 'dropzone';
        if(this.state.isDragActive){
            className += ' active';
        }

        return (
            <div className={className}  onDragLeave={this.onDragLeave} onDragOver={this.onDragOver} onDrop={this.onDrop}>
                <input style={{opacity: '0' }} type='file' ref='fileInput' onChange={this.onDrop} />
            {this.props.children}
            </div>
        );
    }

});
