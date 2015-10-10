
DropUpload = React.createClass({
	getInitialState: function () {
		return {
			files: []
		}
	},
	onChange(res){
		this.props.onChange(res);
	},
	onDrop: function (data) {

        if(data.file.type == "image/png" ||
            data.file.type == "image/jpg" ||
            data.file.type == "image/jpeg" ||
            data.file.type == "image/pjpeg"){
            var newFile = [{
                name:data.file.name,
                size: data.file.size,
                file:data.file,
                url:data.imageUrl,
                type:data.file.type
            }];

            console.log(data);

            this.setState({img_src: data.imageUrl});

            var images = newFile;
            var url = 'http://app.buildyourschool.com/process/';
            var requests = [];
            var promise;
            var self = this;
            _.each(images, function(img){

                if(!img.name || img.name.length == 0) return;

                var promise = BlueRequest
                    .post(url)
                    .field('name', img.name)
                    .field('size', img.size)
                    .attach('file', img.file, img.file.name)
                    .set('Accept', 'application/json')
                    .on('progress', function(e){

                        self.setState({uploadPercent : e.percent });
                        console.log('Percentage done: ', e.percent);
                    })
                    .promise()
                    .then(function(res){

                    	self.onChange(res.text)

                        self.setState({
                        	uploadPercent : 0,
                        	files : self.state.files.push(res),
                        });

                    })
                    .catch(function(err){
                        console.log(err.res.body.errors);
                    });
                requests.push(promise);
            });

        } else {
            alert("Sorry we don't support that file type!");
        }

	},
    render: function () {
        return (
            <Dropzone  onDrop={this.onDrop}>
                {this.props.img ?
                	<img src={this.props.img} />
                	:
                	<p>Drag an image in here.</p>
                }
            </Dropzone>
        );
    }
});