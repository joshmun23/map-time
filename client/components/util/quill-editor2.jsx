
// var T = React.PropTypes;

// var defaultColors = [
// 	'rgb(  0,   0,   0)', 'rgb(230,   0,   0)', 'rgb(255, 153,   0)',
// 	'rgb(255, 255,   0)', 'rgb(  0, 138,   0)', 'rgb(  0, 102, 204)',
// 	'rgb(153,  51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)',
// 	'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)',
// 	'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)',
// 	'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)',
// 	'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)',
// 	'rgb(136, 136, 136)', 'rgb(161,   0,   0)', 'rgb(178, 107,   0)',
// 	'rgb(178, 178,   0)', 'rgb(  0,  97,   0)', 'rgb(  0,  71, 178)',
// 	'rgb(107,  36, 178)', 'rgb( 68,  68,  68)', 'rgb( 92,   0,   0)',
// 	'rgb(102,  61,   0)', 'rgb(102, 102,   0)', 'rgb(  0,  55,   0)',
// 	'rgb(  0,  41, 102)', 'rgb( 61,  20,  10)',
// ].map(function(color){ return { value: color } });

// var defaultItems = [

// 	{ label:'Formats', type:'group', items: [
// 		{ label:'Font', type:'font', items: [
// 			{ label:'Sans Serif',  value:'sans-serif' },
// 			{ label:'Serif',       value:'serif' },
// 			{ label:'Monospace',   value:'monospace' }
// 		]},
// 		{ type:'separator' },
// 		{ label:'Size', type:'size', items: [
// 			{ label:'Normal',  value:'10px' },
// 			{ label:'Smaller', value:'13px' },
// 			{ label:'Larger',  value:'18px' },
// 			{ label:'Huge',    value:'32px' }
// 		]},
// 		{ type:'separator' },
// 		{ label:'Alignment', type:'align', items: [
// 			{ label:'', value:'center' },
// 			{ label:'', value:'left' },
// 			{ label:'', value:'right' },
// 			{ label:'', value:'justify' }
// 		]}
// 	]},

// 	{ label:'Text', type:'group', items: [
// 		{ type:'bold', label:'Bold' },
// 		{ type:'italic', label:'Italic' },
// 		{ type:'strike', label:'Strike' },
// 		{ type:'underline', label:'Underline' },
// 		{ type:'separator' },
// 		{ type:'color', label:'Color', items:defaultColors },
// 		{ type:'background', label:'Background color', items:defaultColors },
// 		{ type:'separator' },
// 		{ type:'link', label:'Link' }
// 	]},

// 	{ label:'Blocks', type:'group', items: [
// 		{ type:'bullet', label:'Bullet' },
// 		{ type:'separator' },
// 		{ type:'list', label:'List' }
// 	]}

// ];

// QuillToolbar = React.createClass({

// 	displayName: 'Quill Toolbar',

// 	propTypes: {
// 		id:        T.string,
// 		className: T.string,
// 		items:     T.array
// 	},

// 	getDefaultProps: function(){
// 		return {
// 			items: defaultItems
// 		};
// 	},

// 	renderSeparator: function(key) {
// 		return React.DOM.span({
// 			key: key,
// 			className:'ql-format-separator'
// 		});
// 	},

// 	renderGroup: function(item, key) {
// 		return React.DOM.span({
// 			key: item.label || key,
// 			className:'ql-format-group' },
// 			item.items.map(this.renderItem)
// 		);
// 	},

// 	renderChoiceItem: function(item, key) {
// 		return React.DOM.option({
// 			key: item.label || item.value || key,
// 			value:item.value },
// 			item.label
// 		);
// 	},

// 	renderChoices: function(item, key) {
// 		return React.DOM.select({
// 			key: item.label || key,
// 			className: 'ql-'+item.type },
// 			item.items.map(this.renderChoiceItem)
// 		);
// 	},

// 	renderAction: function(item, key) {
// 		return React.DOM.span({
// 			key: item.label || item.value || key,
// 			className: 'ql-format-button ql-'+item.type,
// 			title: item.label }
// 		);
// 	},

// 	renderItem: function(item, key) {
// 		switch (item.type) {
// 			case 'separator':
// 				return this.renderSeparator(key);
// 			case 'group':
// 				return this.renderGroup(item, key);
// 			case 'font':
// 			case 'align':
// 			case 'size':
// 			case 'color':
// 			case 'background':
// 				return this.renderChoices(item, key);
// 			default:
// 				return this.renderAction(item, key);
// 		}
// 	},

// 	getClassName: function() {
// 		return 'quill-toolbar ' + (this.props.className||'');
// 	},

// 	render: function() {
// 		var children = this.props.items.map(this.renderItem);
// 		var html = children.map(React.renderToStaticMarkup).join('');
// 		return React.DOM.div({
// 			className: this.getClassName(),
// 			dangerouslySetInnerHTML: { __html:html }
// 		});
// 	}
// });

// //delete
// if (React.createFactory) {
// 	QuillToolbar = React.createFactory(QuillToolbar);
// }

// var T = React.PropTypes;

// QuillComponent = React.createClass({
// 	displayName: 'Quill',
// 	//mixin
// 	createEditor: function($el, config) {
// 		var editor = new Quill($el, config);
// 		this.hookEditor(editor);
// 		return editor;
// 	},

// 	hookEditor: function(editor) {
// 		editor.on('text-change', function(delta, source) {
// 			if (this.onEditorChange) {
// 				this.onEditorChange(editor.getHTML(), delta, source);
// 			}
// 		}.bind(this));

// 		editor.on('selection-change', function(range, source) {
// 			if (this.onEditorChangeSelection) {
// 				this.onEditorChangeSelection(range, source);
// 			}
// 		}.bind(this));
// 	},

// 	destroyEditor: function(editor) {
// 		editor.destroy();
// 	},

// 	setEditorReadOnly: function(editor, value) {
// 		value? editor.editor.disable()
// 		     : editor.editor.enable();
// 	},

// 	/*
// 	Replace the contents of the editor, but keep
// 	the previous selection hanging around so that
// 	the cursor won't move.
// 	*/
// 	setEditorContents: function(editor, value) {
// 		var sel = editor.getSelection();
// 		editor.setHTML(value);
// 		if (sel) this.setEditorSelection(editor, sel);
// 	},

// 	setEditorSelection: function(editor, range) {
// 		if (range) {
// 			// Validate bounds before applying.
// 			var length = editor.getLength();
// 			range.start = Math.max(0, Math.min(range.start, length-1));
// 			range.end = Math.max(range.start, Math.min(range.end, length-1));
// 		}
// 		editor.setSelection(range);
// 	},

// 	// ADDED
// 	propTypes: {
// 		id: T.string,
// 		className: T.string,
// 		style: T.object,
// 		value: T.string,
// 		defaultValue: T.string,
// 		readOnly: T.bool,
// 		modules: T.object,
// 		toolbar: T.array,
// 		formats: T.array,
// 		styles: T.object,
// 		theme: T.string,
// 		pollInterval: T.number,
// 		onKeyPress: T.func,
// 		onKeyDown: T.func,
// 		onKeyUp: T.func,
// 		onChange: T.func,
// 		onChangeSelection: T.func
// 	},

// 	/*
// 	Changing one of these props should cause a re-render.
// 	*/
// 	dirtyProps: [
// 		'id',
// 		'className',
// 		'modules',
// 		'toolbar',
// 		'formats',
// 		'styles',
// 		'theme',
// 		'pollInterval'
// 	],

// 	getDefaultProps: function() {
// 		return {
// 			className: '',
// 			theme: 'base',
// 			modules: {
// 				'link-tooltip': true
// 			}
// 		};
// 	},

// 	/*
// 	We consider the component to be controlled if
// 	whenever `value` is bein sent in props.
// 	*/
// 	isControlled: function() {
// 		return 'value' in this.props;
// 	},

// 	getInitialState: function() {
// 		return {
// 			value: this.isControlled()
// 				? this.props.value
// 				: this.props.defaultValue
// 		};
// 	},

// 	componentWillReceiveProps: function(nextProps) {
// 		var editor = this.state.editor;
// 		// Update only if we've been passed a new `value`.
// 		// This leaves components using `defaultValue` alone.
// 		if ('value' in nextProps) {
// 			// NOTE: Seeing that Quill is missing a way to prevent
// 			//       edits, we have to settle for a hybrid between
// 			//       controlled and uncontrolled mode. We can't prevent
// 			//       the change, but we'll still override content
// 			//       whenever `value` differs from current state.
// 			if (nextProps.value !== this.getEditorContents()) {
// 				this.setEditorContents(editor, nextProps.value);
// 			}
// 		}
// 		// We can update readOnly state in-place.
// 		if ('readOnly' in nextProps) {
// 			if (nextProps.readOnly !== this.props.readOnly) {
// 				this.setEditorReadOnly(editor, nextProps.readOnly);
// 			}
// 		}
// 	},

// 	componentDidMount: function() {
// 		var editor = this.createEditor(
// 			this.getEditorElement(),
// 			this.getEditorConfig());

// 		this.setCustomFormats(editor);

// 		// NOTE: Custom formats will be stripped when creating
// 		//       the editor, since they are not present there yet.
// 		//       Therefore, we re-set the contents from the props
// 		this.setState({ editor:editor }, function () {
// 			this.setEditorContents(editor, this.props.value);
// 		}.bind(this));
// 	},

// 	componentWillUnmount: function() {
// 		this.destroyEditor(this.state.editor);
// 		// NOTE: Don't set the state to null here
// 		//       as it would generate a loop.
// 	},

// 	shouldComponentUpdate: function(nextProps, nextState) {
// 		// Check if one of the changes should trigger a re-render.
// 		for (var i=0; i<this.dirtyProps.length; i++) {
// 			var prop = this.dirtyProps[i];
// 			if (nextProps[prop] !== this.props[prop]) {
// 				return true;
// 			}
// 		}
// 		// Never re-render otherwise.
// 		return false;
// 	},

// 	/*
// 	If for whatever reason we are rendering again,
// 	we should tear down the editor and bring it up
// 	again.
// 	*/
// 	componentWillUpdate: function() {
// 		this.componentWillUnmount();
// 	},

// 	componentDidUpdate: function() {
// 		this.componentDidMount();
// 	},

// 	setCustomFormats: function (editor) {
// 		if (!this.props.formats) {
// 			return;
// 		}

// 		for (var i = 0; i < this.props.formats.length; i++) {
// 			var format = this.props.formats[i];
// 			editor.addFormat(format.name || format, format);
// 		}
// 	},

// 	getEditorConfig: function() {
// 		var config = {
// 			readOnly:     this.props.readOnly,
// 			theme:        this.props.theme,
// 			// Let Quill set the defaults, if no formats supplied
// 			formats:      this.props.formats ? [] : undefined,
// 			styles:       this.props.styles,
// 			modules:      this.props.modules,
// 			pollInterval: this.props.pollInterval
// 		};
// 		// Unless we're redefining the toolbar,
// 		// attach to the default one as a ref.
// 		if (!config.modules.toolbar) {
// 			// Don't mutate the original modules
// 			// because it's shared between components.
// 			config.modules = JSON.parse(JSON.stringify(config.modules));
// 			config.modules.toolbar = {
// 				container: this.refs.toolbar.getDOMNode()
// 			};
// 		}
// 		return config;
// 	},

// 	getEditorElement: function() {
// 		return this.refs.editor.getDOMNode();
// 	},

// 	getEditorContents: function() {
// 		return this.state.value;
// 	},

// 	getEditorSelection: function() {
// 		return this.state.selection;
// 	},

// 	/*
// 	Renders either the specified contents, or a default
// 	configuration of toolbar and contents area.
// 	*/
// 	renderContents: function() {
// 		if (React.Children.count(this.props.children)) {
// 			// Clone children to own their refs.
// 			return React.Children.map(
// 				this.props.children,
// 				function(c) { return cloneElement(c, { ref: c.ref }) }
// 			);
// 		} else {
// 			return [
// 				// Quill modifies these elements in-place,
// 				// so we need to re-render them every time.
// 				QuillToolbar({
// 					key: 'toolbar-' + Math.random(),
// 					ref: 'toolbar',
// 					items: this.props.toolbar
// 				}),
// 				React.DOM.div({
// 					key: 'editor-' + Math.random(),
// 					ref: 'editor',
// 					className: 'quill-contents',
// 					dangerouslySetInnerHTML: { __html:this.getEditorContents() }
// 				})
// 			];
// 		}
// 	},

// 	render: function() {
// 		return React.DOM.div({
// 			id: this.props.id,
// 			style: this.props.style,
// 			className: 'quill ' + this.props.className,
// 			onKeyPress: this.props.onKeyPress,
// 			onKeyDown: this.props.onKeyDown,
// 			onKeyUp: this.props.onKeyUp,
// 			onChange: this.preventDefault },
// 			this.renderContents()
// 		);
// 	},

// 	onEditorChange: function(value, delta, source) {
// 		if (value !== this.getEditorContents()) {
// 			this.setState({ value: value });
// 			if (this.props.onChange) {
// 				this.props.onChange(value, delta, source);
// 			}
// 		}
// 	},

// 	onEditorChangeSelection: function(range, source) {
// 		var s = this.getEditorSelection() || {};
// 		var r = range || {};
// 		if (r.start !== s.start || r.end !== s.end) {
// 			this.setState({ selection: range });
// 			if (this.props.onChangeSelection) {
// 				this.props.onChangeSelection(range, source);
// 			}
// 		}
// 	},

// 	/*
// 	Stop change events from the toolbar from
// 	bubbling up outside.
// 	*/
// 	preventDefault: function(event) {
// 		event.preventDefault();
// 		event.stopPropagation();
// 	}

// });